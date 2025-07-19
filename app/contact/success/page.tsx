'use client'
import { motion } from 'motion/react'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { TextEffect } from '@/components/ui/text-effect'
import { Magnetic } from '@/components/ui/magnetic'

export default function ContactSuccess() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8 max-w-md mx-auto px-4"
        >
            <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto"
            >
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </motion.div>

            <div className="space-y-4">
            <TextEffect
                as="h1"
                preset="fade"
                className="text-3xl font-bold text-zinc-900 dark:text-zinc-100"
            >
                Message Sent!
            </TextEffect>
            <TextEffect
                as="p"
                preset="fade"
                delay={0.2}
                className="text-lg text-zinc-600 dark:text-zinc-400"
            >
                Thank you for reaching out. I'll get back to you within 24 hours.
            </TextEffect>
            </div>

            <div className="space-y-4">
            <Magnetic>
                <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
                </Link>
            </Magnetic>

            <div className="text-sm text-zinc-500 dark:text-zinc-400">
                or{' '}
                <a
                href="mailto:daniofioredev@gmail.com"
                className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 underline"
                >
                send me a direct email
                </a>
            </div>
            </div>
        </motion.div>
        </div>
    )
}
