'use client'
import { motion } from 'motion/react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialLinkProps {
    icon: LucideIcon
    label: string
    href: string
    className?: string
    showLabel?: boolean
}

export function SocialLink({ 
    icon: Icon, 
    label, 
    href, 
    className = '',
    showLabel = false
}: SocialLinkProps) {
    return (
        <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
            'group relative flex items-center gap-2 rounded-md p-2 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
            className
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={label}
        >
        <Icon className="h-4 w-4" />
        {showLabel && (
            <span className="text-sm font-medium">{label}</span>
        )}
        
        {/* Tooltip */}
        {!showLabel && (
            <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-zinc-900 px-2 py-1 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
            {label}
            <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-l-2 border-r-2 border-t-2 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
            </motion.div>
        )}
        </motion.a>
    )
}
