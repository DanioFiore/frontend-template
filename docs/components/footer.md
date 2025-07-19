# Footer Component

A minimal footer component with animated text loops and theme switcher.

## Features

- **Dynamic Copyright**: Automatically updates with current year
- **Text Loop Animation**: Rotating text displays for brand messaging
- **Multi-Theme Switcher**: Light, dark, and system theme options
- **Configuration-Driven**: Uses centralized app configuration
- **Minimal Design**: Clean, unobtrusive footer styling

## Usage

```tsx
import { Footer } from '@/components/ui/footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

## Configuration

The footer component uses configuration from `/config/app.config.ts`:

```typescript
export const APP_CONFIG = {
  name: 'Your App Name',
  tagline: 'Your App Tagline',
  // ... other config
}
```

## Components

### TextLoop

Animated text rotation component that cycles through:
- Copyright notice with dynamic year
- App tagline from configuration

```tsx
<TextLoop className="text-xs text-zinc-500">
  <span>© {new Date().getFullYear()} {APP_CONFIG.name}</span>
  <span>{APP_CONFIG.tagline}</span>
</TextLoop>
```

### ThemeSwitch

Comprehensive theme selector with three options:

- **Light Mode**: Sun icon
- **Dark Mode**: Moon icon  
- **System Mode**: Monitor icon (follows OS preference)

Features:
- Animated background indicator
- Smooth transitions between themes
- Accessible button design
- Icon-based visual feedback

## Styling

The footer follows the minimal design principles:

```css
/* Base styling */
.footer {
  @apply mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800;
}

/* Content layout */
.footer-content {
  @apply flex items-center justify-between;
}

/* Text styling */
.footer-text {
  @apply text-xs text-zinc-500;
}

/* Theme switcher */
.theme-switch {
  @apply text-xs text-zinc-400;
}
```

## Theme Options

The component supports three theme modes:

| Theme | Icon | Behavior |
|-------|------|----------|
| Light | ☀️ Sun | Forces light mode |
| Dark | 🌙 Moon | Forces dark mode |
| System | 🖥️ Monitor | Follows OS setting |

## Animation Details

### Text Loop
- Smooth fade transitions between text items
- Configurable timing and easing
- Responsive to reduced motion preferences

### Theme Switcher
- Spring-based background animation
- Icon-specific hover states
- Smooth color transitions

## Integration

The footer integrates with:

- **App Configuration**: Pulls app name and tagline
- **Theme System**: Manages global theme state
- **Design System**: Follows consistent styling patterns

## Customization

### Changing Text Content

Update the configuration file:

```typescript
// config/app.config.ts
export const APP_CONFIG = {
  name: 'My Amazing App',
  tagline: 'Building the future',
}
```

### Adding More Text Items

Extend the TextLoop component:

```tsx
<TextLoop className="text-xs text-zinc-500">
  <span>© {new Date().getFullYear()} {APP_CONFIG.name}</span>
  <span>{APP_CONFIG.tagline}</span>
  <span>Made with ❤️</span>
  <span>Built with Next.js</span>
</TextLoop>
```

### Custom Theme Options

Modify the THEMES_OPTIONS array:

```typescript
const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  // Add custom theme option
  {
    label: 'Auto',
    id: 'auto',
    icon: <SparklesIcon className="h-4 w-4" />,
  },
]
```

## Dependencies

- `next-themes` - Theme management
- `lucide-react` - Icon components
- `@/components/ui/animated-background` - Background animations
- `@/components/ui/text-loop` - Text rotation component
- `@/config/app.config` - App configuration

## Browser Support

- All modern browsers
- Graceful fallback for older browsers
- Reduced motion support for accessibility
