# UI Components Documentation

This document provides comprehensive documentation for all UI components in the frontend template.

## 🎨 Animated Background Component

**Location**: `/components/ui/animated-background.tsx`

A smooth animated background that follows active elements, perfect for navigation tabs and selection interfaces.

### Features

- ✅ Smooth spring-based animations
- ✅ Customizable transition timing
- ✅ Hover state support
- ✅ Keyboard navigation compatible
- ✅ TypeScript support

### Props

```typescript
interface AnimatedBackgroundProps {
    children: React.ReactNode
    defaultValue?: string
    className?: string
    transition?: any
    enableHover?: boolean
    onValueChange?: (value: string) => void
}
```

### Usage

```tsx
import { AnimatedBackground } from '@/components/ui/animated-background'

function TabNavigation() {
    return (
        <AnimatedBackground
        defaultValue="tab1"
        className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
        enableHover
        >
        <button data-id="tab1">Tab 1</button>
        <button data-id="tab2">Tab 2</button>
        <button data-id="tab3">Tab 3</button>
        </AnimatedBackground>
    )
}
```

---

## 🔮 Spotlight Component

**Location**: `/components/ui/spotlight.tsx`

Creates a spotlight effect that follows the mouse cursor, adding an elegant interactive element.

### Features

- ✅ Mouse-following spotlight effect
- ✅ Customizable colors and blur
- ✅ Responsive design
- ✅ Performance optimized

### Props

```typescript
interface SpotlightProps {
    className?: string
    fill?: string
    size?: number
}
```

### Usage

```tsx
import { Spotlight } from '@/components/ui/spotlight'

function HeroSection() {
    return (
        <div className="relative">
        <Spotlight
            className="absolute inset-0"
            fill="rgba(59, 130, 246, 0.1)"
            size={300}
        />
        {/* Your content */}
        </div>
    )
}
```

---

## 🧲 Magnetic Component

**Location**: `/components/ui/magnetic.tsx`

Adds magnetic attraction effect to elements, creating engaging micro-interactions.

### Features

- ✅ Smooth magnetic attraction
- ✅ Configurable intensity and range
- ✅ Spring-based animations
- ✅ Touch device compatible

### Props

```typescript
interface MagneticProps {
    children: React.ReactNode
    intensity?: number
    range?: number
    className?: string
}
```

### Usage

```tsx
import { Magnetic } from '@/components/ui/magnetic'

function InteractiveButton() {
    return (
        <Magnetic intensity={0.6} range={100}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Hover me!
        </button>
        </Magnetic>
    )
}
```

---

## ✨ Text Effect Component

**Location**: `/components/ui/text-effect.tsx`

Provides various text animation effects for enhanced typography.

### Features

- ✅ Multiple animation presets (fade, slide, scale)
- ✅ Character-by-character animations
- ✅ Customizable timing and delays
- ✅ Accessibility-friendly

### Props

```typescript
interface TextEffectProps {
    children: string
    per?: 'word' | 'char'
    as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
    preset?: 'fade' | 'slide' | 'scale'
    delay?: number
    className?: string
}
```

### Usage

```tsx
import { TextEffect } from '@/components/ui/text-effect'

function AnimatedHeading() {
    return (
        <TextEffect
        as="h1"
        preset="fade"
        per="char"
        delay={0.1}
        className="text-4xl font-bold"
        >
        Welcome to our app
        </TextEffect>
    )
}
```

### Available Presets

- **fade**: Characters fade in with opacity
- **slide**: Characters slide in from bottom
- **scale**: Characters scale up from zero

---

## 🔄 Text Loop Component

**Location**: `/components/ui/text-loop.tsx`

Cycles through multiple text strings with smooth transitions.

### Features

- ✅ Automatic text cycling
- ✅ Smooth fade transitions
- ✅ Configurable timing
- ✅ Pause on hover option

### Props

```typescript
interface TextLoopProps {
  children: React.ReactNode[]
  className?: string
  interval?: number
  pauseOnHover?: boolean
}
```

### Usage

```tsx
import { TextLoop } from '@/components/ui/text-loop'

function RotatingText() {
    return (
        <TextLoop interval={3000} pauseOnHover>
        <span>First message</span>
        <span>Second message</span>
        <span>Third message</span>
        </TextLoop>
    )
}
```

---

## 🔄 Text Morph Component

**Location**: `/components/ui/text-morph.tsx`

Morphs between different text strings with letter-by-letter transformation.

### Features

- ✅ Smooth character morphing
- ✅ Multiple text support
- ✅ Configurable speed
- ✅ Random character effects

### Props

```typescript
interface TextMorphProps {
    children: string[]
    className?: string
    speed?: number
}
```

### Usage

```tsx
import { TextMorph } from '@/components/ui/text-morph'

function MorphingTitle() {
    return (
        <TextMorph
        speed={50}
        className="text-2xl font-bold"
        >
        {['Developer', 'Designer', 'Creator']}
        </TextMorph>
    )
}
```

---

## 🔍 Search Component

**Location**: `/components/ui/search.tsx`

A comprehensive search interface with suggestions and keyboard navigation.

### Features

- ✅ Real-time search suggestions
- ✅ Keyboard navigation (arrow keys, enter, escape)
- ✅ Customizable result rendering
- ✅ Loading states
- ✅ No results handling

### Props

```typescript
interface SearchProps {
    placeholder?: string
    onSearch: (query: string) => Promise<SearchResult[]>
    onSelect: (result: SearchResult) => void
    className?: string
    showIcon?: boolean
}

interface SearchResult {
    id: string
    title: string
    description?: string
    url: string
    category?: string
}
```

### Usage

```tsx
import { Search } from '@/components/ui/search'

function SearchBar() {
    const handleSearch = async (query: string) => {
        const response = await api.search(query)
        return response.data
    }

    const handleSelect = (result: SearchResult) => {
        router.push(result.url)
    }

    return (
        <Search
        placeholder="Search..."
        onSearch={handleSearch}
        onSelect={handleSelect}
        showIcon={true}
        />
    )
}
```

---

## 🔔 Notification Center Component

**Location**: `/components/ui/notification-center.tsx`

A complete notification system with different notification types and actions.

### Features

- ✅ Multiple notification types (success, error, warning, info)
- ✅ Mark as read/unread functionality
- ✅ Bulk actions (mark all as read, clear all)
- ✅ Unread count badge
- ✅ Smooth animations

### Props

```typescript
interface NotificationCenterProps {
    notifications: Notification[]
    onMarkAsRead: (id: string) => void
    onMarkAllAsRead: () => void
    onClearAll: () => void
    className?: string
}

interface Notification {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: string
    read: boolean
    action?: {
        label: string
        onClick: () => void
    }
}
```

### Usage

```tsx
import { NotificationCenter } from '@/components/ui/notification-center'

function Header() {
    const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications()

    return (
        <NotificationCenter
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onClearAll={clearAll}
        />
    )
}
```

---

## 📋 Context Menu Component

**Location**: `/components/ui/context-menu.tsx`

A customizable context menu with keyboard navigation and nested menus.

### Features

- ✅ Right-click context menu
- ✅ Keyboard shortcuts display
- ✅ Disabled/destructive actions
- ✅ Custom triggers
- ✅ Position alignment

### Props

```typescript
interface ContextMenuProps {
    items: ContextMenuItem[]
    trigger?: React.ReactNode
    className?: string
    align?: 'start' | 'center' | 'end'
}

interface ContextMenuItem {
    id: string
    label: string
    icon?: LucideIcon
    shortcut?: string
    disabled?: boolean
    destructive?: boolean
    onClick: () => void
}
```

### Usage

```tsx
import { ContextMenu } from '@/components/ui/context-menu'
import { Edit, Delete, Copy } from 'lucide-react'

function FileItem() {
    const menuItems = [
        {
            id: 'edit',
            label: 'Edit',
            icon: Edit,
            shortcut: 'Cmd+E',
            onClick: () => editFile()
        },
        {
            id: 'copy',
            label: 'Copy',
            icon: Copy,
            shortcut: 'Cmd+C',
            onClick: () => copyFile()
        },
        {
            id: 'delete',
            label: 'Delete',
            icon: Delete,
            shortcut: 'Del',
            destructive: true,
            onClick: () => deleteFile()
        }
    ]

    return (
        <ContextMenu items={menuItems} align="end">
            <div className="p-4 border rounded">
                File item
            </div>
        </ContextMenu>
    )
}
```

---

## 🎭 Morphing Dialog Component

**Location**: `/components/ui/morphing-dialog.tsx`

An advanced dialog component with morphing animations and flexible content.

### Features

- ✅ Smooth morphing animations
- ✅ Backdrop blur effect
- ✅ Keyboard navigation (ESC to close)
- ✅ Focus management
- ✅ Portal rendering

### Props

```typescript
interface MorphingDialogProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
    children: React.ReactNode
    className?: string
    showCloseButton?: boolean
}
```

### Usage

```tsx
import { MorphingDialog } from '@/components/ui/morphing-dialog'

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        <button onClick={() => setIsOpen(true)}>
            Open Dialog
        </button>
        
        <MorphingDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Dialog Title"
            description="Dialog description"
            showCloseButton={true}
        >
            <div className="p-6">
            <p>Dialog content goes here</p>
            <button onClick={() => setIsOpen(false)}>
                Close
            </button>
            </div>
        </MorphingDialog>
        </>
    )
}
```

---

## 🎨 Design System

### Color Palette

All components use a consistent color system based on Tailwind's zinc palette:

```css
/* Light mode */
--background: white
--foreground: zinc-950
--muted: zinc-100
--muted-foreground: zinc-500
--border: zinc-200

/* Dark mode */
--background: zinc-950
--foreground: zinc-50
--muted: zinc-800
--muted-foreground: zinc-400
--border: zinc-800
```

### Typography Scale

```css
--font-xs: 0.75rem
--font-sm: 0.875rem
--font-base: 1rem
--font-lg: 1.125rem
--font-xl: 1.25rem
--font-2xl: 1.5rem
--font-3xl: 1.875rem
--font-4xl: 2.25rem
```

### Spacing System

Components use consistent spacing based on Tailwind's spacing scale:

```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
```

### Animation Timing

```css
--duration-fast: 150ms
--duration-normal: 200ms
--duration-slow: 300ms
--duration-slower: 500ms

--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 🛠️ Customization Examples

### Custom Theme Colors

```tsx
// Create a custom variant
const customButton = cn(
  'px-4 py-2 rounded-md font-medium',
  'bg-purple-500 hover:bg-purple-600',
  'text-white dark:text-purple-100',
  'transition-colors duration-200'
)
```

### Custom Animation Variants

```tsx
const customVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300
        }
    }
}
```

### Component Composition

```tsx
function CustomCard() {
    return (
        <Magnetic intensity={0.3}>
        <div className="relative p-6 bg-white rounded-lg shadow-lg">
            <Spotlight className="absolute inset-0" />
            <TextEffect preset="fade" per="char">
            Card content
            </TextEffect>
        </div>
        </Magnetic>
    )
}
```

---

## ♿ Accessibility Features

All UI components include:

- **Keyboard Navigation**: Full keyboard support with logical tab order
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Visible focus indicators and focus trapping where appropriate
- **High Contrast**: Compatible with high contrast mode
- **Reduced Motion**: Respects user's motion preferences

### ARIA Labels

```tsx
// Example: Proper ARIA usage
<button
  aria-label="Close dialog"
  aria-describedby="dialog-description"
  onClick={onClose}
>
  <X className="h-4 w-4" />
</button>
```

---

## 📱 Responsive Design

Components are built mobile-first with responsive breakpoints:

```typescript
const breakpoints = {
    sm: '640px',   // Small devices
    md: '768px',   // Medium devices
    lg: '1024px',  // Large devices
    xl: '1280px',  // Extra large devices
    '2xl': '1536px' // 2X large devices
}
```

### Responsive Utilities

```tsx
// Example: Responsive component sizing
<div className="p-4 md:p-6 lg:p-8">
    <h2 className="text-lg md:text-xl lg:text-2xl">
        Responsive heading
    </h2>
</div>
```

---

This documentation covers all UI components. Each component is designed to be composable, accessible, and performant. For more specific implementation details, check the component source files.
