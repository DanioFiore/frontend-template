'use client'
import { useState, useEffect } from 'react'

export function useNavbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
        }

        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && mobileMenuOpen) {
            setMobileMenuOpen(false)
        }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('keydown', handleKeyDown)
        }
    }, [mobileMenuOpen])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden'
        } else {
        document.body.style.overflow = 'unset'
        }

        return () => {
        document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    return {
        isScrolled,
        mobileMenuOpen,
        setMobileMenuOpen,
    }
}
