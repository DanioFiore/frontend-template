# Navigation Components Documentation

This document provides comprehensive documentation for all navigation-related components in the frontend template.

## 🧭 Navbar Component

**Location**: `/app/navbar.tsx`

The main navigation bar component that appears at the top of every page.

### Features

- ✅ Responsive design with mobile hamburger menu
- ✅ Smooth scroll-based backdrop blur effect
- ✅ Active link highlighting
- ✅ Theme toggle integration
- ✅ Animated background for navigation items
- ✅ Magnetic effect on interactive elements

### Usage

```tsx
import { Navbar } from '@/app/navbar'

export default function Layout() {
    return (
        <>
        <Navbar />
        {/* Your page content */}
        </>
    )
}
```

### Configuration

Configure the navbar in `/config/navigation.config.ts`:

```typescript
export const NAVBAR_CONFIG = {
    height: 16, // Tailwind height value (h-16)
    backgroundColor: 'bg-white/80 dark:bg-zinc-950/80',
    borderColor: 'border-zinc-200 dark:border-zinc-800',
    blurAmount: 'backdrop-blur-sm',
    sticky: true,
    showBorder: true,
}
```

### Props

The Navbar component doesn't accept props directly. Configuration is handled through the config files.

### Customization

1. **Colors**: Update `NAVBAR_CONFIG` in navigation config
2. **Navigation Items**: Modify `NAV_ITEMS` array
3. **Animations**: Adjust `ANIMATION_CONFIG`

---

## 📱 Mobile Navigation Component

**Location**: `/components/ui/mobile-navigation.tsx`

A full-screen mobile navigation overlay with smooth animations.

### Features

- ✅ Full-screen overlay design
- ✅ Smooth slide-in animations
- ✅ Nested navigation support
- ✅ Social links integration
- ✅ Auto-close on navigation
- ✅ Keyboard navigation support

### Props

```typescript
interface MobileNavigationProps {
    isOpen: boolean
    onClose: () => void
    items?: readonly NavItem[]
    className?: string
}
```

### Usage

```tsx
import { MobileNavigation } from '@/components/ui/mobile-navigation'

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <MobileNavigation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={customNavItems} // Optional: use custom nav items
        />
    )
}
```

### Customization

```typescript
export const MOBILE_MENU_CONFIG = {
    width: 320, // Width in pixels
    backgroundColor: 'bg-white/95 dark:bg-zinc-950/95',
    showSocialLinks: true,
    showCloseButton: true,
    closeOnNavigation: true,
}
```

---

## 🔘 Nav Button Component

**Location**: `/components/ui/nav-button.tsx`

A reusable button component for navigation items with hover effects.

### Features

- ✅ Consistent styling across all nav items
- ✅ Active state indication
- ✅ Hover animations
- ✅ Icon support
- ✅ Accessibility features

### Props

```typescript
interface NavButtonProps {
    icon?: LucideIcon
    label: string
    isActive?: boolean
    onClick?: () => void
    className?: string
}
```

### Usage

```tsx
import { NavButton } from '@/components/ui/nav-button'
import { Home } from 'lucide-react'

function NavigationMenu() {
    return (
        <NavButton
        icon={Home}
        label="Home"
        isActive={pathname === '/'}
        onClick={() => router.push('/')}
        />
    )
}
```

### Styling

The component uses consistent styling that adapts to light/dark themes:

```css
/* Active state */
text-zinc-900 dark:text-zinc-100

/* Inactive state */
text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100
```

---

## 🎨 Logo Component

**Location**: `/components/ui/logo.tsx`

The application logo component with customizable appearance.

### Features

- ✅ Text and icon logo support
- ✅ Hover scale animation
- ✅ Configurable styling
- ✅ Link functionality

### Props

```typescript
interface LogoProps {
    showIcon?: boolean
    showText?: boolean
    href?: string
    className?: string
}
```

### Usage

```tsx
import { Logo } from '@/components/ui/logo'

function Header() {
    return (
        <Logo
        showIcon={true}
        showText={true}
        href="/"
        className="custom-logo-styles"
        />
    )
}
```

### Configuration

```typescript
export const LOGO_CONFIG = {
    showIcon: false, // Set to true if you have a logo icon
    showText: true,
    text: 'Your App Name',
    fontSize: 'text-xl',
    fontWeight: 'font-bold',
    color: 'text-zinc-900 dark:text-zinc-100',
    hoverScale: 1.05,
}
```

---

## 📋 Breadcrumb Component

**Location**: `/components/ui/breadcrumb.tsx`

Provides navigation breadcrumbs for nested page structures.

### Features

- ✅ Auto-generation from URL path
- ✅ Custom breadcrumb items
- ✅ Home icon integration
- ✅ Animated item appearance
- ✅ Accessible navigation

### Props

```typescript
interface BreadcrumbProps {
    items?: BreadcrumbItem[]
    className?: string
    showHome?: boolean
}

interface BreadcrumbItem {
    label: string
    href: string
    isActive?: boolean
}
```

### Usage

```tsx
import { Breadcrumb } from '@/components/ui/breadcrumb'

// Auto-generated breadcrumbs
function Page() {
    return <Breadcrumb showHome={true} />
}

// Custom breadcrumbs
function CustomPage() {
    const items = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Projects', href: '/dashboard/projects' },
        { label: 'Project Name', href: '/dashboard/projects/123', isActive: true }
    ]

    return <Breadcrumb items={items} />
}
```

---

## 📊 Scroll Indicator Component

**Location**: `/components/ui/scroll-indicator.tsx`

A visual indicator showing page scroll progress.

### Features

- ✅ Smooth gradient progress bar
- ✅ Responsive to page scroll
- ✅ Customizable colors and height
- ✅ Fixed positioning

### Usage

```tsx
import { ScrollIndicator } from '@/components/ui/scroll-indicator'

function Layout() {
    return (
        <>
        <ScrollIndicator />
        {/* Your page content */}
        </>
    )
}
```

### Configuration

```typescript
export const SCROLL_CONFIG = {
    threshold: 10,
    indicatorHeight: 4,
    indicatorColor: 'from-blue-500 to-purple-600',
}
```

---

## 🎯 Best Practices

### 1. Navigation Structure

```typescript
// Good: Clear hierarchy
const NAV_ITEMS = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { 
        id: 'resources', 
        label: 'Resources', 
        href: '/resources',
        children: [
        { id: 'docs', label: 'Documentation', href: '/docs' },
        { id: 'guides', label: 'Guides', href: '/guides' }
        ]
    }
]
```

### 2. Accessibility

All navigation components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### 3. Performance

- Navigation items are memoized to prevent unnecessary re-renders
- Animations use CSS transforms for optimal performance
- Icons are tree-shaken to reduce bundle size

### 4. Responsive Design

```typescript
// Mobile-first breakpoints
const breakpoints = {
    sm: '640px',
    md: '768px',   // Navigation switches to desktop view
    lg: '1024px',
    xl: '1280px',
}
```

---

## 🔧 Troubleshooting

### Common Issues

1. **Navigation not updating**: Ensure you're using the correct `pathname` from `usePathname()`
2. **Mobile menu not closing**: Check that `onClose` prop is properly connected
3. **Icons not displaying**: Verify lucide-react imports and icon names
4. **Styling conflicts**: Check Tailwind class order and specificity

### Debug Mode

Enable debug logging in development:

```typescript
const env = getEnvironmentConfig()
if (env.showDebugInfo) {
    console.log('Navigation state:', { pathname, isOpen, activeItem })
}
```

---

## 📝 Examples

### Custom Navigation Item with Badge

```tsx
function CustomNavItem() {
    return (
        <Link href="/notifications" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
        </Link>
    )
}
```

### Multi-level Dropdown

```tsx
const navItemsWithDropdown = [
    {
        id: 'products',
        label: 'Products',
        href: '/products',
        children: [
        {
            id: 'web-apps',
            label: 'Web Applications',
            href: '/products/web-apps',
            children: [
            { id: 'dashboard', label: 'Dashboard', href: '/products/web-apps/dashboard' },
            { id: 'analytics', label: 'Analytics', href: '/products/web-apps/analytics' }
            ]
        }
        ]
    }
]
```

---

This documentation covers all navigation components. For questions or suggestions, please refer to the main README or create an issue.
