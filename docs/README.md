# Frontend Template Documentation

A comprehensive, reusable frontend template built with Next.js 15, TypeScript, and Tailwind CSS. This template provides a solid foundation for building modern web applications with backend integration.

## 🚀 Quick Start

### 1. Configuration

Before you start, configure your application in `/config/app.config.ts`:

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

### 2. Navigation Setup

Configure your navigation in `/config/navigation.config.ts`:

```typescript
export const NAV_ITEMS: NavItem[] = [
    {
        id: 'home',
        label: 'Home',
        href: '/',
        description: 'Go to homepage'
    },
    // Add more navigation items
]
```

### 3. Backend Integration

The template includes a complete API client setup in `/lib/api/`:

- `client.ts` - HTTP client with retry logic and error handling
- `services.ts` - API service functions for different entities
- `hooks.ts` - React hooks for data fetching and mutations

## 📁 Project Structure

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

## 🎨 Styling

The template uses Tailwind CSS v4 with a custom design system. All components follow consistent styling patterns:

- **Color Scheme**: Zinc-based palette with dark mode support
- **Typography**: Geist font family for optimal readability
- **Animations**: Powered by Motion (Framer Motion)
- **Responsive**: Mobile-first design approach

## 🔧 Features

- ✅ **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- ✅ **API Integration**: Complete backend integration layer
- ✅ **Authentication**: Ready-to-use auth hooks and services
- ✅ **Data Fetching**: Optimized React hooks with loading states
- ✅ **Error Handling**: Comprehensive error boundaries and API error handling
- ✅ **Dark/Light Mode**: Seamless theme switching
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Animations**: Smooth micro-interactions
- ✅ **SEO Optimized**: Built-in metadata and OpenGraph support
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Component Documentation**: Comprehensive docs for all components

## 🚀 Backend Integration

### API Client Configuration

The API client automatically handles:
- Request/response interceptors
- Authentication token management
- Retry logic with exponential backoff
- Request timeout handling
- Error formatting and reporting

### Using API Services

```typescript
import { api } from '@/lib/api/services'

// Fetch users
const users = await api.user.getUsers(1, 10)

// Create a project
const project = await api.project.createProject({
    name: 'My Project',
    description: 'Project description'
})

// Upload a file
const upload = await api.file.uploadFile(file, 'projects')
```

### Using React Hooks

```typescript
import { useUsers, useCreateProject } from '@/lib/api/hooks'

function MyComponent() {
    const { data: users, loading, error } = useUsers()
    const createProject = useCreateProject()

    const handleCreate = async () => {
        await createProject.mutate({
        name: 'New Project',
        description: 'Description'
        })
    }

    return (
        // Your component JSX
    )
}
```

## 🎯 Customization Guide

### 1. Branding

Update your brand colors and styling in:
- `/config/app.config.ts` - App metadata and configuration
- `/app/globals.css` - Global styles and CSS variables

### 2. Components

All UI components are located in `/components/ui/` and are fully documented. Each component includes:
- TypeScript interfaces
- Usage examples
- Customization options
- Accessibility features

### 3. Navigation

The navigation system is highly configurable:
- Add/remove navigation items
- Configure social links
- Customize mobile menu behavior
- Set up nested navigation

### 4. API Integration

To connect your backend:
1. Update the `apiUrl` in `/config/app.config.ts`
2. Modify API service interfaces in `/lib/api/services.ts`
3. Update authentication logic in `/lib/api/client.ts`

## 📚 Component Documentation

Detailed documentation for all components is available in the `/docs/components/` directory:

- [Navigation Components](./components/navigation.md)
- [UI Components](./components/ui.md)
- [Form Components](./components/forms.md)
- [Animation Components](./components/animations.md)

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Deployment

The template is ready for deployment on:
- Vercel (recommended)
- Netlify
- Any Node.js hosting provider

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add documentation for new components
5. Submit a pull request

## 📄 License

This template is open source and available under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the component documentation
2. Review the configuration guides
3. Create an issue in the repository

---

**Happy coding! 🎉**
