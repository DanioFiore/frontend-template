# Navbar Component

A responsive navigation component with animated theme toggle, mobile menu, and scroll indicators.

## Features

- **Responsive Design**: Adapts to desktop and mobile viewports
- **Theme Toggle**: Animated light/dark mode switcher
- **Mobile Menu**: Slide-out navigation for mobile devices
- **Scroll Indicators**: Visual feedback for page scroll position
- **Animated Transitions**: Smooth motion effects using Framer Motion
- **Configuration-Driven**: Uses centralized navigation configuration

## Usage

```tsx
import { Navbar } from '@/components/ui/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
```

## Configuration

The navbar component uses configuration from `/config/navigation.config.ts`:

```typescript
// Configure navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
  { id: 'about', label: 'About', href: '/about', icon: User },
  // ... more items
]

// Configure social links
export const SOCIAL_LINKS = [
  { id: 'github', href: 'https://github.com/username', icon: Github },
  // ... more links
]
```

## Components

### ThemeToggle

Animated theme switcher with sun/moon icons:

- Uses `next-themes` for theme management
- Smooth rotation animations
- Magnetic hover effect
- Accessible with proper ARIA labels

### MobileMenu

Slide-out navigation menu for mobile devices:

- Backdrop overlay with blur effect
- Spring-based slide animations
- Navigation links with active states
- Social links section
- Auto-close on navigation

### Main Navbar

Fixed-position navigation bar:

- Translucent background with backdrop blur
- Animated logo and navigation items
- Scroll-based styling changes
- Responsive layout with mobile menu trigger

## Styling

The component uses Tailwind CSS classes and follows the design system:

- **Colors**: Zinc color palette for neutral tones
- **Animation**: Framer Motion for smooth transitions
- **Typography**: Consistent font weights and sizes
- **Spacing**: Standardized padding and margins

## Dependencies

- `motion/react` - Animation library (newer version of framer-motion)
- `next-themes` - Theme management
- `next/navigation` - Routing hooks
- `lucide-react` - Icon components
- Custom UI components from `/components/ui/`

## Accessibility

- Proper ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for mobile menu
- Screen reader friendly markup

## Browser Support

- Modern browsers with CSS backdrop-filter support
- Graceful degradation for older browsers
- Mobile Safari optimizations
