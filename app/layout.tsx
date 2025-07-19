import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { ThemeProvider } from 'next-themes'
import { APP_CONFIG } from '@/config/app.config'

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#ffffff',
}

export const metadata: Metadata = {
    metadataBase: new URL(APP_CONFIG.url),
    alternates: {
        canonical: '/'
    },
    title: {
        default: APP_CONFIG.seo.title,
        template: `%s | ${APP_CONFIG.name}`
    },
    description: APP_CONFIG.seo.description,
    keywords: APP_CONFIG.seo.keywords,
    authors: [{ name: APP_CONFIG.seo.author }],
    openGraph: {
        type: APP_CONFIG.seo.type as 'website',
        locale: APP_CONFIG.seo.locale,
        url: APP_CONFIG.url,
        siteName: APP_CONFIG.name,
        title: APP_CONFIG.seo.title,
        description: APP_CONFIG.seo.description,
        images: [APP_CONFIG.seo.image],
    },
    twitter: {
        card: APP_CONFIG.seo.twitterCard as 'summary_large_image',
        title: APP_CONFIG.seo.title,
        description: APP_CONFIG.seo.description,
        images: [APP_CONFIG.seo.image],
    },
}

const geist = Geist({
    variable: '--font-geist',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
        >
            <ThemeProvider
            enableSystem={true}
            attribute="class"
            storageKey="theme"
            defaultTheme="system"
            disableTransitionOnChange={false}
            enableColorScheme={true}
            >
            <Navbar />
            <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
                <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
                {/* <Header /> */}
                {children}
                <Footer />
                </div>
            </div>
            </ThemeProvider>
        </body>
        </html>
    )
}
