# Frontend Template

A comprehensive, reusable frontend template built with Next.js 15, TypeScript, and Tailwind CSS. This template provides a solid foundation for building modern web applications with seamless backend integration.

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the template
git clone <your-repo-url> my-app
cd my-app

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### 2. Configure Your App

Update `/config/app.config.ts` with your project details:

```typescript
export const APP_CONFIG = {
  name: 'Your App Name',
  tagline: 'Your App Tagline',
  description: 'A brief description of your application',
  url: 'https://your-domain.com',
  apiUrl: 'http://localhost:3001/api', // Your backend API URL
  // ... more configuration options
}
```

### 3. Set Up Navigation

Configure your navigation in `/config/navigation.config.ts`:

```typescript
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]
```

## 🏗️ Architecture

### Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   └── ui/                # Low-level UI components
├── config/                # Application configuration
│   ├── app.config.ts      # Main app configuration
│   └── navigation.config.ts # Navigation configuration
├── lib/                   # Utility libraries
│   ├── api/               # API client and services
│   ├── constants.ts       # Application constants
│   └── utils.ts          # Utility functions
├── hooks/                 # Custom React hooks
├── public/               # Static assets
└── docs/                # Component documentation
```

### Key Features

- ✅ **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- ✅ **Complete API Integration**: Ready-to-use backend integration layer
- ✅ **Authentication Ready**: Built-in auth hooks and services
- ✅ **Data Fetching**: Optimized React hooks with loading states
- ✅ **Error Handling**: Comprehensive error boundaries and API error handling
- ✅ **Dark/Light Mode**: Seamless theme switching with system preference
- ✅ **Responsive Design**: Mobile-first approach with consistent breakpoints
- ✅ **Smooth Animations**: Powered by Motion (Framer Motion)
- ✅ **SEO Optimized**: Built-in metadata and OpenGraph support
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Component Documentation**: Comprehensive docs for all components

## 🔧 Tech Stack

### Core Technologies

- **Framework**: Next.js 15 with App Router
- **React**: Version 19 with modern hooks and patterns
- **TypeScript**: Full type safety and IntelliSense
- **Styling**: Tailwind CSS v4 with custom design system
- **Animations**: Motion (Framer Motion) for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Theme**: next-themes for dark/light mode support

### Backend Integration

- **HTTP Client**: Custom API client with retry logic and error handling
- **Data Fetching**: React hooks for queries and mutations
- **Authentication**: JWT and session-based auth support
- **File Upload**: Multi-file upload with progress tracking
- **WebSocket**: Real-time features support
- **Caching**: Built-in request caching and invalidation

## 🎨 Design System

### Color Palette

Based on Tailwind's zinc palette with full dark mode support:

```css
/* Light mode */
--background: white
--foreground: zinc-950
--muted: zinc-100
--border: zinc-200

/* Dark mode */
--background: zinc-950
--foreground: zinc-50
--muted: zinc-800
--border: zinc-800
```

### Typography

Uses Geist font family for optimal readability:

- **Sans**: Geist for UI elements
- **Mono**: Geist Mono for code and data

### Responsive Breakpoints

```typescript
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X large devices
```

## 🔌 Backend Integration

### API Client Setup

The template includes a complete API client in `/lib/api/` that handles:

- ✅ Automatic retry logic with exponential backoff
- ✅ Request/response interceptors
- ✅ Authentication token management
- ✅ Request timeout handling
- ✅ Error formatting and reporting
- ✅ Request caching and invalidation

### Using API Services

```typescript
import { api } from '@/lib/api/services'

// Fetch data
const users = await api.user.getUsers(1, 10)
const projects = await api.project.getProjects()

// Create data
const newUser = await api.user.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secure123'
})

// Upload files
const upload = await api.file.uploadFile(file, 'avatars')
```

### Using React Hooks

```typescript
import { useUsers, useCreateUser } from '@/lib/api/hooks'

function UserList() {
  const { data: users, loading, error, refetch } = useUsers()
  const createUser = useCreateUser()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### Supported Backend Technologies

- ✅ **Node.js** with Express
- ✅ **Python** with FastAPI or Django
- ✅ **PHP** with Laravel
- ✅ **.NET Core** Web API
- ✅ **Ruby on Rails**
- ✅ **GraphQL** APIs
- ✅ Any **REST API** following standard HTTP conventions

## 📚 Component Library

### Navigation Components

- **Navbar**: Responsive navigation with mobile menu
- **MobileNavigation**: Full-screen mobile overlay
- **Breadcrumb**: Auto-generating breadcrumb navigation
- **ScrollIndicator**: Visual scroll progress indicator

### UI Components

- **AnimatedBackground**: Smooth animated background for tabs
- **Spotlight**: Mouse-following spotlight effect
- **Magnetic**: Magnetic attraction micro-interactions
- **TextEffect**: Various text animation effects
- **Search**: Comprehensive search with suggestions
- **NotificationCenter**: Complete notification system
- **ContextMenu**: Right-click context menus
- **MorphingDialog**: Advanced dialog with animations

### Form Components

- Coming soon: Form validation, input components, and more

## 🔐 Authentication

### JWT Authentication

```typescript
import { useAuth } from '@/lib/api/hooks'

function LoginForm() {
  const { login, loading, error } = useAuth()

  const handleSubmit = async (credentials) => {
    await login(credentials)
    // Redirect or update UI
  }

  return (
    // Your login form
  )
}
```

### Session-Based Authentication

The template supports both JWT and session-based authentication. Configure your preferred method in the API client.

## 🎯 Customization

### 1. Branding

Update your brand colors and metadata:

```typescript
// config/app.config.ts
export const APP_CONFIG = {
  name: 'Your Brand',
  tagline: 'Your Tagline',
  // ... other settings
}
```

### 2. Styling

Customize the design system:

```css
/* app/globals.css */
:root {
  --color-primary: 59 130 246; /* Blue */
  --color-secondary: 139 92 246; /* Purple */
  /* Add your custom colors */
}
```

### 3. Navigation

Add or modify navigation items:

```typescript
// config/navigation.config.ts
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'analytics', label: 'Analytics', href: '/analytics' },
  // Add your routes
]
```

### 4. API Integration

Connect to your backend:

1. Update `apiUrl` in app configuration
2. Modify API service interfaces as needed
3. Update authentication logic if required

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npm i -g vercel
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms

- **Netlify**: Works out of the box
- **Railway**: Node.js hosting
- **DigitalOcean**: App Platform
- **AWS**: Amplify or EC2
- **Google Cloud**: Cloud Run

### Environment Variables

Set these in your deployment platform:

```env
NEXT_PUBLIC_API_URL=https://your-api.com/api
NEXT_PUBLIC_SITE_URL=https://your-site.com
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript checks
```

### Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Code formatting (configure in your editor)

## 📖 Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Component Documentation](./docs/components/)
- [Backend Integration Guide](./docs/backend-integration.md)
- [API Reference](./docs/api-reference.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 Check the [documentation](./docs/)
- 🐛 [Report bugs](https://github.com/your-repo/issues)
- 💡 [Request features](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)

---

**Happy coding! 🚀**

## Contact & Connect

- **Website**: [inkeisoft.com](https://inkeisoft.com)
- **GitHub**: [@DanioFiore](https://github.com/DanioFiore)
- **LinkedIn**: [Danio Fiore](https://linkedin.com/in/danio-fiore/?locale=en_US)
- **Email**: [daniofioredev@gmail.com](mailto:daniofioredev@gmail.com)

Template used: [Nim](https://github.com/ibelick/nim)
