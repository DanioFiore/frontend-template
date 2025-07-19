'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
    label: string
    href: string
    isActive?: boolean
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[]
    className?: string
    showHome?: boolean
}

export function Breadcrumb({ items = [], className = '', showHome = true }: BreadcrumbProps) {
    const pathname = usePathname()
    
    // Auto-generate breadcrumbs from pathname if no items provided
    const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbsFromPath(pathname)
    
    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1', className)}>
        <ol className="flex items-center space-x-1">
            {showHome && (
            <li>
                <Link
                href="/"
                className="flex items-center text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
                </Link>
            </li>
            )}
            
            {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
                {(showHome || index > 0) && (
                <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-600 mx-1" />
                )}
                
                <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                >
                {item.isActive || index === breadcrumbItems.length - 1 ? (
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                    {item.label}
                    </span>
                ) : (
                    <Link
                    href={item.href}
                    className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                    >
                    {item.label}
                    </Link>
                )}
                </motion.div>
            </li>
            ))}
        </ol>
        </nav>
    )
    }

    function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split('/').filter(Boolean)
    const items: BreadcrumbItem[] = []
    
    segments.forEach((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
        
        items.push({
        label,
        href,
        isActive: index === segments.length - 1
        })
    })
    
    return items
}
