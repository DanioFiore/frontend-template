'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { TextEffect } from '@/components/ui/text-effect'

interface LogoProps {
    showTagline?: boolean
    className?: string
}

export function Logo({ showTagline = true, className = '' }: LogoProps) {
    return (
        <Link href="/" className={`group flex items-center gap-2 ${className}`}>
        <motion.div
            className="font-bold text-xl text-zinc-900 dark:text-zinc-100"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            Inkeisoft
        </motion.div>
        {showTagline && (
            <TextEffect
            as="div"
            preset="fade"
            className="text-xs text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                In Case Of Software
            </TextEffect>
        )}
        </Link>
    )
}
