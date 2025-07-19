'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
    id: string
    title: string
    description?: string
    href: string
    type: 'page' | 'post' | 'project'
}

interface SearchProps {
    placeholder?: string
    onSearch?: (query: string) => SearchResult[]
    className?: string
}

export function SearchBox({ 
    placeholder = 'Search...', 
    onSearch, 
    className = '' 
}: SearchProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === '/' && !isOpen) {
            e.preventDefault()
            setIsOpen(true)
        }
        if (e.key === 'Escape' && isOpen) {
            setIsOpen(false)
            setQuery('')
            setResults([])
        }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
        inputRef.current.focus()
        }
    }, [isOpen])

    // Handle search
    useEffect(() => {
        if (!query.trim() || !onSearch) {
        setResults([])
        return
        }

        setIsLoading(true)
        
        // Debounce search
        const timeoutId = setTimeout(() => {
        const searchResults = onSearch(query)
        setResults(searchResults)
        setIsLoading(false)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query, onSearch])

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
        }

        if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div ref={containerRef} className={cn('relative', className)}>
        {/* Search trigger button */}
        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded">
            /
            </kbd>
        </motion.button>

        {/* Search modal */}
        <AnimatePresence>
            {isOpen && (
            <>
                {/* Backdrop */}
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
                />

                {/* Search modal */}
                <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg mx-4"
                >
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    {/* Search input */}
                    <div className="flex items-center gap-3 p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <Search className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none"
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                    >
                        <X className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </button>
                    </div>

                    {/* Search results */}
                    <div className="max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-zinc-500 dark:text-zinc-400">
                        Searching...
                        </div>
                    ) : results.length > 0 ? (
                        <div className="p-2">
                        {results.map((result) => (
                            <motion.a
                            key={result.id}
                            href={result.href}
                            onClick={() => setIsOpen(false)}
                            className="block p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            >
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {result.title}
                                </h3>
                                {result.description && (
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                                    {result.description}
                                    </p>
                                )}
                                </div>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                {result.type}
                                </span>
                            </div>
                            </motion.a>
                        ))}
                        </div>
                    ) : query.trim() ? (
                        <div className="p-4 text-center text-zinc-500 dark:text-zinc-400">
                        No results found for "{query}"
                        </div>
                    ) : (
                        <div className="p-4 text-center text-zinc-500 dark:text-zinc-400">
                        Start typing to search...
                        </div>
                    )}
                    </div>

                    {/* Search footer */}
                    <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center justify-between">
                        <span>Search by typing</span>
                        <div className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">↵</kbd>
                        <span>to select</span>
                        <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">esc</kbd>
                        <span>to close</span>
                        </div>
                    </div>
                    </div>
                </div>
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </div>
    )
}
