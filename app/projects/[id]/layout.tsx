import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Project Documentation - Inkeisoft',
    description: 'Detailed documentation for Inkeisoft projects.',
    keywords: ['project documentation', 'software documentation', 'technical docs', 'inkeisoft', 'developer documentation', 'API documentation', 'code documentation', 'project management', 'software development', 'technical specifications', 'user guides', 'development workflow', 'project resources'],
    openGraph: {
        title: 'Project Documentation - Inkeisoft',
        description: 'Detailed documentation for Inkeisoft projects.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Project Documentation - Inkeisoft',
        description: 'Detailed documentation for Inkeisoft projects.',
    },
}

export default function ProjectDocLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-16">
                {children}
            </div>
        </div>
    )
}
