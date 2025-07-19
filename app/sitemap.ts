import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'
import { SELECTED_PROJECTS } from '@/app/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date()
    
    // Static routes
    const staticRoutes = [
        {
            url: WEBSITE_URL,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 1,
        },
        {
            url: `${WEBSITE_URL}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${WEBSITE_URL}/projects`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${WEBSITE_URL}/contact`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.7,
        },
    ]

    // Dynamic project routes
    const projectRoutes = SELECTED_PROJECTS.map(project => ({
        url: `${WEBSITE_URL}/projects/${project.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Blog routes
    const blogRoutes = [
        {
            url: `${WEBSITE_URL}/blog/exploring-the-intersection-of-design-ai-and-design-engineering`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
        {
            url: `${WEBSITE_URL}/blog/example-mdx-metadata`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
    ]

    return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
