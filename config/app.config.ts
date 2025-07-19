/**
 * Main Application Configuration
 * 
 * This file contains all the main configuration settings for the application.
 * Customize these values to adapt the template for your specific project.
 */

export const APP_CONFIG = {
    // Basic App Information
    name: 'Your App Name',
    tagline: 'Your App Tagline',
    description: 'A brief description of your application',
    version: '1.0.0',
    
    // URLs and Links
    url: 'https://your-domain.com',
    apiUrl: 'http://localhost:3001/api', // Configure this in your environment
    
    // Company/Organization Info
    company: {
        name: 'Your Company',
        email: 'contact@yourcompany.com',
        phone: '+1 (555) 123-4567',
        address: 'Your Address',
        website: 'https://your-domain.com',
    },
    
    // Social Links (add/remove as needed)
    social: {
        github: '',
        linkedin: '',
        twitter: '',
        instagram: '',
        youtube: '',
    },
    
    // SEO Configuration
    seo: {
        title: 'Your App Name',
        description: 'A brief description of your application',
        keywords: ['keyword1', 'keyword2', 'keyword3'],
        author: 'Your Name',
        image: '/images/og-image.png',
        twitterCard: 'summary_large_image',
        locale: 'en_US',
        type: 'website',
    },
    
    // Feature Flags
    features: {
        darkMode: true,
        animations: true,
        blog: false,
        search: false,
        notifications: false,
        analytics: false,
        cookieConsent: false,
    },
    
    // Navigation Configuration
    navigation: {
        showLogo: true,
        showSearch: false,
        showNotifications: false,
        showThemeToggle: true,
        maxNavigationItems: 5,
    },
    
    // Layout Settings
    layout: {
        maxWidth: 'screen-sm', // Tailwind max-width class
        padding: 4, // Tailwind padding value
        headerHeight: 16, // Tailwind height value
        footerEnabled: true,
    },
    
    // API Configuration
    api: {
        timeout: 30000, // 30 seconds
        retryAttempts: 3,
        retryDelay: 1000, // 1 second
    },
    
    // Performance Settings
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        prefetching: true,
        caching: true,
    },
} as const

// Environment-specific configurations
export const getEnvironmentConfig = () => {
    if (typeof window !== 'undefined') {
        // Client-side environment detection
        return {
        isDevelopment: window.location.hostname === 'localhost',
        isProduction: window.location.hostname !== 'localhost',
        isTest: false,
        showDebugInfo: window.location.hostname === 'localhost',
        enableConsoleLogging: window.location.hostname === 'localhost',
        apiUrl: window.location.hostname === 'localhost' 
            ? 'http://localhost:3001/api' 
            : APP_CONFIG.apiUrl,
        }
    }
    
    // Server-side environment detection
    return {
        isDevelopment: true,
        isProduction: false,
        isTest: false,
        showDebugInfo: true,
        enableConsoleLogging: true,
        apiUrl: 'http://localhost:3001/api',
    }
}

// Type definitions for configuration
export type AppConfig = typeof APP_CONFIG
export type EnvironmentConfig = ReturnType<typeof getEnvironmentConfig>
