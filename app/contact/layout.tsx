import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact - Inkeisoft',
    description: 'Get in touch with Inkeisoft for your software development needs. Available worldwide for remote work.',
    keywords: ['about', 'danio fiore', 'software developer', 'inkeisoft', 'software engineering', 'minimalistic', 'minimal software development', 'clean code', 'php', 'vue.js', 'javascript', 'laravel', 'python', 'fastapi', 'mysql', 'sql', 'postgresql', 'web development','tech startup', 'modern development', 'user experience', 'performance optimization'],
    openGraph: {
        title: 'Contact - Inkeisoft',
        description: 'Get in touch with Inkeisoft for your software development needs. Available worldwide for remote work.',
        type: 'website',
        url: 'https://www.inkeisoft.com/contact',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact - Inkeisoft',
        description: 'Get in touch with Inkeisoft for your software development needs. Available worldwide for remote work.',
    },
}

export default function ContactLayout({
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
