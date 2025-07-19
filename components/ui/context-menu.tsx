'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MoreVertical, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContextMenuItem {
    id: string
    label: string
    icon?: LucideIcon
    onClick: () => void
    disabled?: boolean
    destructive?: boolean
    shortcut?: string
}

interface ContextMenuProps {
    items: ContextMenuItem[]
    trigger?: React.ReactNode
    className?: string
    align?: 'start' | 'center' | 'end'
}

export function ContextMenu({
    items,
    trigger,
    className = '',
    align = 'end'
}: ContextMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            triggerRef.current &&
            !triggerRef.current.contains(event.target as Node)
        ) {
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

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) return

        switch (event.key) {
            case 'Escape':
            setIsOpen(false)
            break
            case 'ArrowDown':
            event.preventDefault()
            // Focus next item
            break
            case 'ArrowUp':
            event.preventDefault()
            // Focus previous item
            break
            case 'Enter':
            case ' ':
            event.preventDefault()
            // Trigger focused item
            break
        }
        }

        if (isOpen) {
        document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
        document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    const handleItemClick = (item: ContextMenuItem) => {
        if (!item.disabled) {
        item.onClick()
        setIsOpen(false)
        }
    }

    const alignmentClasses = {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0'
    }

    return (
        <div className={cn('relative', className)}>
        {/* Trigger */}
        <button
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-haspopup="true"
            aria-expanded={isOpen}
        >
            {trigger || <MoreVertical className="h-4 w-4" />}
        </button>

        {/* Menu */}
        <AnimatePresence>
            {isOpen && (
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: 'spring', duration: 0.2 }}
                className={cn(
                'absolute top-full mt-1 z-50 min-w-[12rem] bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-800 py-1',
                alignmentClasses[align]
                )}
            >
                {items.map((item) => {
                const Icon = item.icon
                
                return (
                    <motion.button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
                        item.disabled
                        ? 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                        : item.destructive
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    )}
                    whileHover={!item.disabled ? { scale: 1.02 } : {}}
                    whileTap={!item.disabled ? { scale: 0.98 } : {}}
                    >
                    {Icon && (
                        <Icon className="h-4 w-4 flex-shrink-0" />
                    )}
                    
                    <span className="flex-1">{item.label}</span>
                    
                    {item.shortcut && (
                        <kbd className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                        {item.shortcut}
                        </kbd>
                    )}
                    </motion.button>
                )
                })}
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    )
}
