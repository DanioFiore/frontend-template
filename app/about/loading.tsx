"use client"

import { motion } from 'motion/react'

export default function AboutLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
            className="w-16 h-16 border-4 border-zinc-200 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
            className="text-zinc-600 dark:text-zinc-400 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            >
            Loading about page...
            </motion.p>
        </motion.div>
        </div>
    )
}
