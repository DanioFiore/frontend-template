import type { MetadataRoute } from 'next'
import { APP_CONFIG } from '@/config/app.config'

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date()
    
    // Static routes
    const staticRoutes = [
        {
            url: APP_CONFIG.url,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 1,
        }
    ]

    return [...staticRoutes]
}
