'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/navbar-config'
import { TextEffect } from '@/components/ui/text-effect'

interface MobileNavItem {
    id: string
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    children?: MobileNavItem[]
}

interface MobileNavigationProps {
    isOpen: boolean
    onClose: () => void
    items?: readonly MobileNavItem[]
    className?: string
}

export function MobileNavigation({
    isOpen,
    onClose,
    items = NAV_ITEMS,
    className = ''
}: MobileNavigationProps) {
    const pathname = usePathname()
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    // Close on route change
    useEffect(() => {
        onClose()
    }, [pathname, onClose])

    // Handle expand/collapse
    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev =>
        prev.includes(itemId)
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
        )
    }

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = 'hidden'
        } else {
        document.body.style.overflow = 'unset'
        }

        return () => {
        document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const renderNavItem = (item: MobileNavItem, level = 0) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        const isExpanded = expandedItems.includes(item.id)
        const hasChildren = item.children && item.children.length > 0

        return (
        <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: level * 0.1 }}
            className={cn(
            'border-b border-zinc-200 dark:border-zinc-800 last:border-b-0',
            level > 0 && 'ml-6 border-l border-zinc-200 dark:border-zinc-800'
            )}
        >
            {hasChildren ? (
            <button
                onClick={() => toggleExpanded(item.id)}
                className={cn(
                'w-full flex items-center justify-between p-4 text-left transition-colors',
                isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                )}
            >
                <div className="flex items-center gap-3">
                {Icon && <Icon className="h-5 w-5" />}
                <span className="font-medium">{item.label}</span>
                </div>
                <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                >
                <ChevronRight className="h-4 w-4" />
                </motion.div>
            </button>
            ) : (
            <Link
                href={item.href}
                className={cn(
                'flex items-center gap-3 p-4 transition-colors',
                isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                )}
            >
                {Icon && <Icon className="h-5 w-5" />}
                <span className="font-medium">{item.label}</span>
            </Link>
            )}

            {/* Submenu */}
            <AnimatePresence>
            {hasChildren && isExpanded && (
                <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                >
                {item.children!.map(child => renderNavItem(child, level + 1))}
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
        )
    }

    return (
        <AnimatePresence>
        {isOpen && (
            <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Navigation panel */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={cn(
                'fixed right-0 top-0 z-50 h-full w-80 bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-xl',
                className
                )}
            >
                <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <TextEffect
                    as="h2"
                    preset="fade"
                    className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
                    >
                    Navigation
                    </TextEffect>
                </div>

                {/* Navigation items */}
                <nav className="flex-1 overflow-y-auto">
                    <div className="py-2">
                    {items.map(item => renderNavItem(item))}
                    </div>
                </nav>

                {/* Footer with social links */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="mb-3">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                        Follow us
                    </p>
                    <div className="flex gap-3">
                        {SOCIAL_LINKS.map(link => {
                        const Icon = link.icon
                        return (
                            <motion.a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            >
                            <Icon className="h-5 w-5" />
                            </motion.a>
                        )
                        })}
                    </div>
                    </div>

                    <div className="text-xs text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <p>© 2024 Inkeisoft. All rights reserved.</p>
                    </div>
                </div>
                </div>
            </motion.div>
            </>
        )}
        </AnimatePresence>
    )
}
