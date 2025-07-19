/**
 * Navigation Configuration
 * 
 * Configure your application's navigation structure here.
 * Add, remove, or modify navigation items as needed for your project.
 */

// Navigation item interface
export interface NavItem {
    id: string
    label: string
    href: string
    icon?: any // Use LucideIcon when importing in components
    description?: string
    isExternal?: boolean
    children?: NavItem[]
}

// Social link interface
export interface SocialLink {
    id: string
    label: string
    href: string
    icon?: any // Use LucideIcon when importing in components
}

/**
 * Main Navigation Items
 * 
 * Customize these navigation items for your application.
 * You can add nested items using the children property.
 * 
 * Note: Import and assign icons from lucide-react in your components
 */
export const NAV_ITEMS: NavItem[] = [
    {
        id: 'home',
        label: 'Home',
        href: '/',
        description: 'Go to homepage'
    },
    {
        id: 'about',
        label: 'About',
        href: '/about',
        description: 'Learn more about us'
    },
    {
        id: 'projects',
        label: 'Projects',
        href: '/projects',
        description: 'View our projects'
    },
    {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
        description: 'Get in touch'
    },
    // Example of navigation with children
    // {
    //   id: 'resources',
    //   label: 'Resources',
    //   href: '/resources',
    //   description: 'Helpful resources',
    //   children: [
    //     {
    //       id: 'docs',
    //       label: 'Documentation',
    //       href: '/resources/docs',
    //       description: 'API documentation'
    //     },
    //     {
    //       id: 'guides',
    //       label: 'Guides',
    //       href: '/resources/guides',
    //       description: 'Step-by-step guides'
    //     }
    //   ]
    // }
]

/**
 * Social Links
 * 
 * Add your social media links here.
 * Remove or comment out any platforms you don't use.
 * 
 * Note: Import and assign icons from lucide-react in your components
 */
export const SOCIAL_LINKS: SocialLink[] = [
    {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/yourusername'
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/yourusername'
    },
    // Add more social links as needed
    // {
    //   id: 'twitter',
    //   label: 'Twitter',
    //   href: 'https://twitter.com/yourusername'
    // },
    // {
    //   id: 'instagram',
    //   label: 'Instagram',
    //   href: 'https://instagram.com/yourusername'
    // },
]

/**
 * Footer Navigation
 * 
 * Links to display in the footer area.
 */
export const FOOTER_LINKS: NavItem[] = [
    {
        id: 'privacy',
        label: 'Privacy Policy',
        href: '/privacy'
    },
    {
        id: 'terms',
        label: 'Terms of Service',
        href: '/terms'
    },
    {
        id: 'help',
        label: 'Help',
        href: '/help'
    }
]

/**
 * Navbar Configuration
 * 
 * Visual and behavioral settings for the navigation bar.
 */
export const NAVBAR_CONFIG = {
    height: 16, // Tailwind height value (h-16)
    backgroundColor: 'bg-white/80 dark:bg-zinc-950/80',
    borderColor: 'border-zinc-200 dark:border-zinc-800',
    textColor: 'text-zinc-900 dark:text-zinc-100',
    mutedTextColor: 'text-zinc-600 dark:text-zinc-400',
    hoverColor: 'hover:text-zinc-900 dark:hover:text-zinc-100',
    activeColor: 'bg-zinc-100 dark:bg-zinc-800',
    blurAmount: 'backdrop-blur-sm',
    transition: 'transition-all duration-300',
    sticky: true,
    showBorder: true,
}

/**
 * Mobile Menu Configuration
 */
export const MOBILE_MENU_CONFIG = {
    width: 320, // Width in pixels
    backgroundColor: 'bg-white/95 dark:bg-zinc-950/95',
    borderColor: 'border-zinc-200 dark:border-zinc-800',
    blurAmount: 'backdrop-blur-sm',
    itemPadding: 'px-3 py-2',
    itemSpacing: 'space-y-1',
    iconSize: 'h-5 w-5',
    showSocialLinks: true,
    showCloseButton: true,
    closeOnNavigation: true,
}

/**
 * Logo Configuration
 */
export const LOGO_CONFIG = {
    showIcon: false, // Set to true if you have a logo icon
    showText: true,
    text: 'Your App Name',
    fontSize: 'text-xl',
    fontWeight: 'font-bold',
    color: 'text-zinc-900 dark:text-zinc-100',
    hoverScale: 1.05,
    transition: 'transition-all duration-300',
}

/**
 * Animation Configuration
 */
export const ANIMATION_CONFIG = {
    // Navbar animations
    navbar: {
        initial: { y: -100 },
        animate: { y: 0 },
        transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    
    // Navigation item animations
    navItem: {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
        transition: { type: 'spring', damping: 15, stiffness: 300 }
    },
    
    // Mobile menu animations
    mobileMenu: {
        backdrop: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
        },
        panel: {
            initial: { x: '100%' },
            animate: { x: 0 },
            exit: { x: '100%' },
            transition: { type: 'spring', damping: 25, stiffness: 300 }
        }
    }
}

// Utility functions for navigation
export const getActiveNavItem = (pathname: string): NavItem | null => {
    for (const item of NAV_ITEMS) {
        if (item.href === pathname) return item
            if (item.children) {
            for (const child of item.children) {
                if (child.href === pathname) return child
            }
        }
    }
    return null
}

export const isNavItemActive = (item: NavItem, pathname: string): boolean => {
    if (item.href === pathname) return true
    if (item.children) {
        return item.children.some(child => child.href === pathname)
    }
    return false
}
