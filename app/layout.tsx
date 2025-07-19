import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '../components/ui/header'
import { Footer } from '../components/ui/footer'
import { Navbar } from '../components/ui/navbar'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#ffffff',
}

export const metadata: Metadata = {
    metadataBase: new URL('https://www.inkeisoft.com/'),
    alternates: {
        canonical: '/'
    },
    title: {
        default: 'Inkeisoft',
        template: '%s | Inkeisoft'
    },
    description:  'Inkeisoft is an idea of minimal Software Development',
};

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
