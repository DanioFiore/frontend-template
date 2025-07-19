'use client'
import { motion } from 'motion/react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavButtonProps {
    icon?: LucideIcon
    label: string
    isActive?: boolean
    onClick?: () => void
    className?: string
}

export function NavButton({ 
    icon: Icon, 
    label, 
    isActive = false, 
    onClick, 
    className = '' 
}: NavButtonProps) {
    return (
        <motion.button
        onClick={onClick}
        className={cn(
            'relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive
            ? 'text-zinc-900 dark:text-zinc-100'
            : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
            className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{label}</span>
        </motion.button>
    )
}
