import {
    Home,
    User,
    Briefcase,
    BookOpen,
    Mail,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Youtube,
    Sun,
    Moon,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronDown,
    ExternalLink,
    Settings,
    Search,
    Bell,
    Star,
    Heart,
    Share,
    Download,
    Upload,
    Edit,
    Trash2,
    Plus,
    Minus,
    Check,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowDown,
    Eye,
    EyeOff,
    MapPin,
    Calendar,
    Clock,
    Phone,
    Globe,
    Zap,
    Code,
    Database,
    Server,
    Cloud,
    Smartphone,
    Laptop,
    Monitor,
    Wifi,
    WifiOff,
    Volume2,
    VolumeX,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Repeat,
    Shuffle,
    Mic,
    MicOff,
    Camera,
    Video,
    VideoOff,
    Image,
    File,
    FileText,
    Folder,
    FolderOpen,
    Save,
    Undo,
    Redo,
    RefreshCw,
    RotateCcw,
    RotateCw,
    Maximize,
    Minimize,
    Circle,
    Square,
    Triangle,
    Bookmark,
    Tag,
    Filter,
    Grid,
    List,
    Layers,
    Layout,
    Sidebar,
    MoreHorizontal,
    MoreVertical,
    Shield,
    Lock,
    Unlock,
    Key,
    Activity,
    TrendingUp,
    TrendingDown,
    BarChart,
    LineChart,
    PieChart,
    Package,
    Box,
    Gift,
    ShoppingCart,
    CreditCard,
    DollarSign,
    Percent,
    Calculator,
    Target,
    Flag,
    Award,
    Trophy,
    Medal,
    Crown,
    Gem,
    Compass,
    Navigation,
    Map,
    Route,
    Car,
    Bike,
    Plane,
    Train,
    Ship,
    Truck,
    Bus,
    Rocket,
    Anchor,
    Fuel,
    Battery,
    Plug,
    Power,
    Cpu,
    HardDrive,
    Gamepad2,
    Headphones,
    Speaker,
    Radio,
    Bluetooth,
    Usb,
    Inbox,
    Send,
    Forward,
    Reply,
    ReplyAll,
    Paperclip,
    Link,
    Unlink,
    Scissors,
    Copy,
    Palette,
    Paintbrush,
    Droplets,
    Thermometer,
    Wind,
    CloudRain,
    CloudSnow,
    Umbrella,
    Snowflake,
    Flame,
    Mountain,
    Trees,
    Waves,
    Sunrise,
    Sunset,
    Rainbow,
    Lightbulb,
    Flashlight,
    Zap as Lightning,
    Flame as Fire,
    Droplets as Water,
    Wind as Air,
    Mountain as Earth,
} from 'lucide-react'

// Navigation items configuration
export const NAV_ITEMS = [
    { id: 'home', label: 'Home', href: '/', icon: Home },
] as const

// Social links configuration
export const SOCIAL_LINKS = [
    { id: 'github', label: 'GitHub', href: 'https://github.com/DanioFiore', icon: Github },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/danio-fiore/?locale=en_US', icon: Linkedin },
] as const

// Company information
export const COMPANY_INFO = {
    name: 'Inkeisoft',
    tagline: 'In Case Of Software',
    description: 'Minimal Software development',
    email: 'daniofioredev@gmail.com',
    phone: '+39 340 959 7469',
    address: 'Via Giustino Fortunato, 2 B/2, 70125 Bari, Italy',
    website: 'https://www.inkeisoft.com',
} as const

// Animation variants
export const ANIMATION_VARIANTS = {
    fadeIn: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' }
    },
    slideIn: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, ease: 'easeOut' }
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4, ease: 'easeOut' }
    },
    stagger: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
} as const

// Theme configuration
export const THEME_CONFIG = {
    colors: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        accent: '#8b5cf6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#06b6d4',
    },
    fonts: {
        sans: 'var(--font-geist)',
        mono: 'var(--font-geist-mono)',
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    }
    } as const

    // Navbar configuration
    export const NAVBAR_CONFIG = {
    height: 64,
    blurAmount: 'backdrop-blur-sm',
    borderColor: 'border-zinc-200 dark:border-zinc-800',
    backgroundColor: 'bg-white/80 dark:bg-zinc-950/80',
    textColor: 'text-zinc-900 dark:text-zinc-100',
    mutedTextColor: 'text-zinc-600 dark:text-zinc-400',
    hoverColor: 'hover:text-zinc-900 dark:hover:text-zinc-100',
    activeColor: 'bg-zinc-100 dark:bg-zinc-800',
    transition: 'transition-all duration-300',
    } as const

    // Mobile menu configuration
    export const MOBILE_MENU_CONFIG = {
    width: 256,
    backgroundColor: 'bg-white/95 dark:bg-zinc-950/95',
    borderColor: 'border-zinc-200 dark:border-zinc-800',
    blurAmount: 'backdrop-blur-sm',
    itemPadding: 'px-3 py-2',
    itemSpacing: 'space-y-2',
    iconSize: 'h-4 w-4',
    transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
    }
} as const

// Logo configuration
export const LOGO_CONFIG = {
    fontSize: 'text-xl',
    fontWeight: 'font-bold',
    color: 'text-zinc-900 dark:text-zinc-100',
    taglineColor: 'text-zinc-600 dark:text-zinc-400',
    taglineSize: 'text-xs',
    hoverScale: 1.05,
    transition: 'transition-all duration-300',
} as const

// Button configuration
export const BUTTON_CONFIG = {
    primary: {
        backgroundColor: 'bg-zinc-900 dark:bg-zinc-100',
        textColor: 'text-white dark:text-zinc-900',
        hoverBackgroundColor: 'hover:bg-zinc-800 dark:hover:bg-zinc-200',
        borderRadius: 'rounded-md',
        padding: 'px-4 py-2',
        fontSize: 'text-sm',
        fontWeight: 'font-medium',
        transition: 'transition-colors duration-200',
    },
    secondary: {
        backgroundColor: 'bg-transparent',
        textColor: 'text-zinc-600 dark:text-zinc-400',
        hoverBackgroundColor: 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
        hoverTextColor: 'hover:text-zinc-900 dark:hover:text-zinc-100',
        borderRadius: 'rounded-md',
        padding: 'px-3 py-2',
        fontSize: 'text-sm',
        fontWeight: 'font-medium',
        transition: 'transition-colors duration-200',
    },
    icon: {
        size: 'h-9 w-9',
        backgroundColor: 'bg-white/80 dark:bg-zinc-900/80',
        borderColor: 'border-zinc-200 dark:border-zinc-800',
        hoverBackgroundColor: 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
        borderRadius: 'rounded-md',
        transition: 'transition-colors duration-200',
    }
} as const

// Scroll configuration
export const SCROLL_CONFIG = {
    threshold: 10,
    indicatorHeight: 4,
    indicatorColor: 'from-blue-500 to-purple-600',
    progressSpring: {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    }
} as const

// Tooltip configuration
export const TOOLTIP_CONFIG = {
    backgroundColor: 'bg-zinc-900 dark:bg-zinc-100',
    textColor: 'text-white dark:text-zinc-900',
    fontSize: 'text-xs',
    padding: 'px-2 py-1',
    borderRadius: 'rounded-md',
    offset: 8,
    transition: {
        initial: { opacity: 0, y: 10, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.8 },
    }
} as const

// Magnetic effect configuration
export const MAGNETIC_CONFIG = {
    intensity: 0.6,
    range: 100,
    springOptions: {
        stiffness: 26.7,
        damping: 4.1,
        mass: 0.2,
    }
} as const

// Text effect configuration
export const TEXT_EFFECT_CONFIG = {
    fadePreset: 'fade',
    slidePreset: 'slide',
    scalePreset: 'scale',
    defaultDelay: 0.1,
    defaultDuration: 0.6,
    defaultEasing: 'easeOut',
} as const

// Accessibility configuration
export const ACCESSIBILITY_CONFIG = {
    skipToContent: 'Skip to content',
    navigationLandmark: 'Main navigation',
    mobileMenuButton: 'Open mobile menu',
    closeMenuButton: 'Close menu',
    themeToggleButton: 'Toggle theme',
    socialLinkPrefix: 'Visit our',
    externalLinkSuffix: '(opens in new tab)',
} as const

// SEO configuration
export const SEO_CONFIG = {
    title: 'Inkeisoft - In Case Of Software',
    description: 'Minimal Software development',
    keywords: ['about', 'danio fiore', 'software developer', 'inkeisoft', 'software engineering', 'minimalistic', 'minimal software development', 'clean code', 'php', 'vue.js', 'javascript', 'laravel', 'python', 'fastapi', 'mysql', 'sql', 'postgresql', 'web development','tech startup', 'modern development', 'user experience', 'performance optimization'],
    author: 'Inkeisoft',
    siteUrl: 'https://www.inkeisoft.com',
    image: '/public/inkeisoft-logo.png',
    twitterCard: 'summary_large_image',
    locale: 'en_US',
    type: 'website',
} as const

// Performance configuration
export const PERFORMANCE_CONFIG = {
    lazyLoading: true,
    imageOptimization: true,
    codesplitting: true,
    prefetching: true,
    caching: true,
    compression: true,
    minification: true,
    bundleAnalysis: true,
} as const

// Feature flags
export const FEATURE_FLAGS = {
    darkMode: true,
    animations: true,
    mobileMenu: true,
    scrollIndicator: true,
    magneticEffect: true,
    textEffects: true,
    tooltips: true,
    socialLinks: true,
    searchFunction: false,
    notifications: false,
    analytics: false,
    cookieConsent: false,
} as const

// Environment configuration
export const ENV_CONFIG = {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://inkeisoft.com',
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
} as const

// Type definitions
export type NavItem = typeof NAV_ITEMS[number]
export type SocialLink = typeof SOCIAL_LINKS[number]
export type ThemeColor = keyof typeof THEME_CONFIG.colors
export type Breakpoint = keyof typeof THEME_CONFIG.breakpoints
export type AnimationVariant = keyof typeof ANIMATION_VARIANTS
export type FeatureFlag = keyof typeof FEATURE_FLAGS
