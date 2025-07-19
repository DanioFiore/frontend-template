'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Bell, X, Check, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Notification {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    description?: string
    timestamp: Date
    read: boolean
    action?: {
        label: string
        onClick: () => void
    }
}

interface NotificationCenterProps {
    notifications: Notification[]
    onMarkAsRead: (id: string) => void
    onMarkAllAsRead: () => void
    onClearAll: () => void
    className?: string
}

const notificationIcons = {
    success: Check,
    error: X,
    warning: AlertCircle,
    info: Info,
}

const notificationColors = {
    success: 'text-green-500 dark:text-green-400',
    error: 'text-red-500 dark:text-red-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    info: 'text-blue-500 dark:text-blue-400',
}

export function NotificationCenter({
    notifications,
    onMarkAsRead,
    onMarkAllAsRead,
    onClearAll,
    className = ''
}: NotificationCenterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const unreadCount = notifications.filter(n => !n.read).length

    const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
        return date.toLocaleDateString()
    }

    return (
        <div className={cn('relative', className)}>
        {/* Notification bell */}
        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            
            {/* Unread count badge */}
            {unreadCount > 0 && (
            <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium"
            >
                {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
            )}
        </motion.button>

        {/* Notification dropdown */}
        <AnimatePresence>
            {isOpen && (
            <>
                {/* Backdrop */}
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
                />

                {/* Notification panel */}
                <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="absolute right-0 top-12 z-50 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                {/* Header */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Notifications
                    </h3>
                    {notifications.length > 0 && (
                        <div className="flex items-center gap-2">
                        <button
                            onClick={onMarkAllAsRead}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            Mark all read
                        </button>
                        <button
                            onClick={onClearAll}
                            className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                        >
                            Clear all
                        </button>
                        </div>
                    )}
                    </div>
                </div>

                {/* Notifications list */}
                <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                        <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No notifications yet</p>
                    </div>
                    ) : (
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {notifications.map((notification) => {
                        const Icon = notificationIcons[notification.type]
                        const iconColor = notificationColors[notification.type]
                        
                        return (
                            <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={cn(
                                'p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors',
                                !notification.read && 'bg-blue-50/50 dark:bg-blue-900/10'
                            )}
                            >
                            <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className={cn('mt-0.5', iconColor)}>
                                <Icon className="h-4 w-4" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                    {notification.title}
                                    </h4>
                                    {!notification.read && (
                                    <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                                    )}
                                </div>
                                
                                {notification.description && (
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                                    {notification.description}
                                    </p>
                                )}
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {formatTime(notification.timestamp)}
                                    </span>
                                    
                                    <div className="flex items-center gap-1">
                                    {notification.action && (
                                        <button
                                        onClick={notification.action.onClick}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        >
                                        {notification.action.label}
                                        </button>
                                    )}
                                    
                                    {!notification.read && (
                                        <button
                                        onClick={() => onMarkAsRead(notification.id)}
                                        className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors ml-2"
                                        >
                                        Mark read
                                        </button>
                                    )}
                                    </div>
                                </div>
                                </div>
                            </div>
                            </motion.div>
                        )
                        })}
                    </div>
                    )}
                </div>
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </div>
    )
}
