'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Magnetic } from '@/components/ui/magnetic'
import { TextEffect } from '@/components/ui/text-effect'
import { Logo } from '@/components/ui/logo'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import {
    NAV_ITEMS,
    SOCIAL_LINKS,
    NAVBAR_CONFIG,
    MOBILE_MENU_CONFIG,
} from '@/lib/navbar-config'
import { 
    Sun, 
    Moon, 
    Menu, 
    X,
} from 'lucide-react'

// Theme toggle component
function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
        <div className="h-9 w-9 rounded-md border border-zinc-200 dark:border-zinc-800" />
        )
    }

    const handleThemeToggle = () => {
        // Use resolvedTheme to get the actual current theme (light/dark)
        // regardless of whether the user has selected 'system', 'light', or 'dark'
        if (resolvedTheme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return (
        <Magnetic>
        <motion.button
            onClick={handleThemeToggle}
            className={cn(
            'relative h-9 w-9 rounded-md border transition-colors',
            NAVBAR_CONFIG.borderColor,
            'bg-white/80 backdrop-blur-sm hover:bg-zinc-100 dark:bg-zinc-900/80 dark:hover:bg-zinc-800'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <AnimatePresence mode="wait">
            {resolvedTheme === 'dark' ? (
                <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
                >
                <Sun className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                </motion.div>
            ) : (
                <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
                >
                <Moon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                </motion.div>
            )}
            </AnimatePresence>
        </motion.button>
        </Magnetic>
    )
    }

    // Mobile menu component
    function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname()

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
            
            {/* Menu */}
            <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={cn(
                'fixed right-0 top-0 z-50 h-full backdrop-blur-sm border-l',
                `w-${MOBILE_MENU_CONFIG.width / 4}`,
                MOBILE_MENU_CONFIG.backgroundColor,
                MOBILE_MENU_CONFIG.borderColor
                )}
            >
                <div className="flex h-full flex-col">
                {/* Header */}
                <div className={cn(
                    'flex items-center justify-between p-4 border-b',
                    NAVBAR_CONFIG.borderColor
                )}>
                    <TextEffect
                    as="h3"
                    preset="fade"
                    className="font-semibold text-zinc-900 dark:text-zinc-100"
                    >
                    Menu
                    </TextEffect>
                    <button
                    onClick={onClose}
                    className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                    <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        
                        return (
                        <li key={item.id}>
                            <Link
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                            )}
                            >
                            <Icon className="h-4 w-4" />
                            {item.label}
                            </Link>
                        </li>
                        )
                    })}
                    </ul>
                </nav>

                {/* Social Links */}
                <div className={cn(
                    'border-t p-4',
                    NAVBAR_CONFIG.borderColor
                )}>
                    <p className="mb-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Follow me
                    </p>
                    <div className="flex gap-2">
                    {SOCIAL_LINKS.map((link) => {
                        const Icon = link.icon
                        return (
                        <a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                        >
                            <Icon className="h-4 w-4" />
                        </a>
                        )
                    })}
                    </div>
                </div>
                </div>
            </motion.div>
            </>
        )}
        </AnimatePresence>
    )
}

// Main navbar component
export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
        {/* Scroll Progress Indicator */}
        <ScrollIndicator />
        
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
            'fixed top-0 z-30 w-full transition-all duration-300',
            isScrolled
                ? `${NAVBAR_CONFIG.backgroundColor} ${NAVBAR_CONFIG.blurAmount} border-b ${NAVBAR_CONFIG.borderColor}`
                : 'bg-transparent'
            )}
        >
            <div className="mx-auto max-w-screen-sm px-4 py-2">
            <div className={`flex items-center justify-between h-${NAVBAR_CONFIG.height / 4}`}>
                {/* Logo */}
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                >
                <Logo />
                </motion.div>

                {/* Desktop Navigation */}
                <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden md:flex items-center gap-1"
                >
                <AnimatedBackground
                    defaultValue={NAV_ITEMS.find(item => item.href === pathname)?.id}
                    className="rounded-md bg-zinc-100 dark:bg-zinc-800"
                    transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.3,
                    }}
                    enableHover
                >
                    {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        data-id={item.id}
                        className="relative px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        {item.label}
                    </Link>
                    ))}
                </AnimatedBackground>
                </motion.div>

                {/* Actions */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
                >
                <ThemeToggle />
                
                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <Menu className="h-5 w-5" />
                </button>
                </motion.div>
            </div>
            </div>
        </motion.nav>

        {/* Mobile Menu */}
        <MobileMenu 
            isOpen={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)} 
        />
        </>
    )
}