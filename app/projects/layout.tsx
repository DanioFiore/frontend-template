import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects | Danio Fiore - Software Developer',
    description: 'Explore the projects and work of Danio Fiore. From backend APIs to full-stack applications.',
    keywords: ['about', 'danio fiore', 'software developer', 'inkeisoft', 'software engineering', 'minimalistic', 'minimal software development', 'clean code', 'php', 'vue.js', 'javascript', 'laravel', 'python', 'fastapi', 'mysql', 'sql', 'postgresql', 'web development','tech startup', 'modern development', 'user experience', 'performance optimization'],
    openGraph: {
        title: 'Projects | Danio Fiore - Software Developer',
        description: 'Explore the projects and work of Danio Fiore. From backend APIs to full-stack applications.',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Danio Fiore - Software Developer',
        description: 'Explore the projects and work of Danio Fiore. From backend APIs to full-stack applications.',
    },
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
