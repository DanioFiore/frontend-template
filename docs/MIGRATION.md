# Migration Guide: From Portfolio to Reusable Template

This guide will help you migrate from the original Inkeisoft portfolio to the new reusable frontend template structure.

## 🔄 What Changed

### 1. Configuration Centralization
- **Before**: Hardcoded values scattered throughout components
- **After**: Centralized configuration in `/config/` directory

### 2. API Integration Layer
- **Before**: No backend integration
- **After**: Complete API client with React hooks

### 3. Component Organization
- **Before**: Components mixed with application logic
- **After**: Reusable components with clear documentation

### 4. Navigation System
- **Before**: Static navigation configuration
- **After**: Dynamic, configurable navigation system

## 📁 File Structure Changes

### Old Structure → New Structure

```
Old:                          New:
├── lib/navbar-config.ts  →  ├── config/
├── app/data.ts           →  │   ├── app.config.ts
├── components/ui/        →  │   └── navigation.config.ts
└── lib/constants.ts      →  ├── lib/api/
                              │   ├── client.ts
                              │   ├── services.ts
                              │   └── hooks.ts
                              └── docs/
```

## 🛠️ Migration Steps

### Step 1: Update Configuration Files

**Old `lib/navbar-config.ts`** → **New `config/app.config.ts` + `config/navigation.config.ts`**

**Before:**
```typescript
// lib/navbar-config.ts
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
  // ...
]

export const COMPANY_INFO = {
  name: 'Inkeisoft',
  // ...
}
```

**After:**
```typescript
// config/app.config.ts
export const APP_CONFIG = {
  name: 'Your App Name',
  company: {
    name: 'Your Company',
    email: 'contact@yourcompany.com',
    // ...
  },
  // ...
}

// config/navigation.config.ts
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  // ...
]
```

### Step 2: Migrate Static Data

**Old `app/data.ts`** → **New API Services**

**Before:**
```typescript
// app/data.ts
export const SELECTED_PROJECTS: Project[] = [
  {
    name: 'Know Yourself AI',
    description: '...',
    // ...
  }
]
```

**After:**
```typescript
// lib/api/services.ts - API Integration
export const projectService = {
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return apiClient.get('/projects')
  },
  // ...
}

// Or for static data, move to config/
// config/app.config.ts
export const STATIC_DATA = {
  projects: [
    {
      name: 'Know Yourself AI',
      description: '...',
      // ...
    }
  ]
}
```

### Step 3: Update Component Imports

**Before:**
```typescript
import { NAV_ITEMS } from '@/lib/navbar-config'
import { COMPANY_INFO } from '@/lib/navbar-config'
```

**After:**
```typescript
import { NAV_ITEMS } from '@/config/navigation.config'
import { APP_CONFIG } from '@/config/app.config'
```

### Step 4: Update Layout File

**Before:**
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Inkeisoft',
  description: 'Inkeisoft is an idea of minimal Software Development',
}
```

**After:**
```typescript
// app/layout.tsx
import { APP_CONFIG } from '@/config/app.config'

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.seo.title,
    template: `%s | ${APP_CONFIG.name}`
  },
  description: APP_CONFIG.seo.description,
  // ...
}
```

## 🔧 Component Migration

### Update Navbar Component

**Before:**
```typescript
// app/navbar.tsx
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/navbar-config'
```

**After:**
```typescript
// app/navbar.tsx
import { NAV_ITEMS, SOCIAL_LINKS } from '@/config/navigation.config'
```

### Update Footer Component

**Before:**
```typescript
// app/footer.tsx
// Hardcoded copyright text
<span>© 2025 Inkeisoft</span>
```

**After:**
```typescript
// app/footer.tsx
import { APP_CONFIG } from '@/config/app.config'

<span>© {new Date().getFullYear()} {APP_CONFIG.company.name}</span>
```

## 🔌 Adding API Integration

### Step 1: Configure API URL

```typescript
// config/app.config.ts
export const APP_CONFIG = {
  apiUrl: 'http://localhost:3001/api', // Your backend URL
  // ...
}
```

### Step 2: Replace Static Data with API Calls

**Before:**
```typescript
// app/projects/page.tsx
import { SELECTED_PROJECTS } from '@/app/data'

export default function ProjectsPage() {
  return (
    <div>
      {SELECTED_PROJECTS.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

**After:**
```typescript
// app/projects/page.tsx
import { useProjects } from '@/lib/api/hooks'

export default function ProjectsPage() {
  const { data: projects, loading, error } = useProjects()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {projects?.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

### Step 3: Add Authentication (Optional)

```typescript
// app/login/page.tsx
import { useAuth } from '@/lib/api/hooks'

export default function LoginPage() {
  const { login, loading } = useAuth()

  const handleLogin = async (credentials) => {
    await login(credentials)
    // Handle success/error
  }

  // Your login form
}
```

## 🎨 Styling Migration

### Update Theme Configuration

**Before:**
```css
/* app/globals.css */
/* Custom color values scattered */
```

**After:**
```css
/* app/globals.css */
:root {
  --color-primary: 59 130 246;
  --color-secondary: 139 92 246;
  /* Centralized color system */
}
```

## 📚 Documentation

### Add Component Documentation

For each custom component you create, add documentation:

```markdown
# Your Component

## Usage

\`\`\`tsx
import { YourComponent } from '@/components/ui/your-component'

<YourComponent prop="value" />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop | string | - | Description |
```

## 🔄 Step-by-Step Migration Checklist

### Phase 1: Configuration (1-2 hours)
- [ ] Create `/config/app.config.ts`
- [ ] Create `/config/navigation.config.ts`
- [ ] Move company info from navbar-config
- [ ] Update environment variables
- [ ] Test configuration loading

### Phase 2: Component Updates (2-3 hours)
- [ ] Update all components importing from navbar-config
- [ ] Update layout.tsx metadata
- [ ] Update footer with dynamic data
- [ ] Test all navigation functionality

### Phase 3: API Integration (3-4 hours)
- [ ] Set up API client configuration
- [ ] Create API services for your data
- [ ] Replace static data with API calls
- [ ] Add error handling and loading states
- [ ] Test API integration

### Phase 4: Documentation (1-2 hours)
- [ ] Document your custom components
- [ ] Update README with your project details
- [ ] Add deployment instructions
- [ ] Test documentation completeness

### Phase 5: Testing & Deployment (1-2 hours)
- [ ] Run build process
- [ ] Test all functionality
- [ ] Deploy to your preferred platform
- [ ] Verify production deployment

## 🐛 Common Issues & Solutions

### Issue: Import Errors After Migration

**Problem:**
```
Module not found: Can't resolve '@/lib/navbar-config'
```

**Solution:**
Update all imports to use the new config structure:
```typescript
// Old
import { NAV_ITEMS } from '@/lib/navbar-config'

// New  
import { NAV_ITEMS } from '@/config/navigation.config'
```

### Issue: TypeScript Errors

**Problem:**
```
Property 'name' does not exist on type...
```

**Solution:**
Check that your config structure matches the expected interfaces:
```typescript
// Make sure APP_CONFIG follows the AppConfig interface
export const APP_CONFIG: AppConfig = {
  // ...
}
```

### Issue: API Calls Not Working

**Problem:**
```
Network error or CORS issues
```

**Solution:**
1. Check your API URL in config
2. Ensure your backend allows CORS
3. Verify your backend is running
4. Check network tab in browser dev tools

### Issue: Styling Inconsistencies

**Problem:**
Components look different after migration

**Solution:**
1. Check that Tailwind classes are applied correctly
2. Verify custom CSS variables are defined
3. Test both light and dark themes
4. Check responsive breakpoints

## 📈 Performance Considerations

### Before Deployment

1. **Bundle Analysis**
   ```bash
   npm run build
   # Check bundle size and unused code
   ```

2. **Image Optimization**
   - Move images to `/public/` directory
   - Use Next.js Image component
   - Optimize image formats (WebP, AVIF)

3. **Code Splitting**
   - Use dynamic imports for large components
   - Implement lazy loading where appropriate

4. **API Optimization**
   - Implement request caching
   - Add request debouncing for search
   - Use pagination for large datasets

## 🚀 Next Steps

After migration:

1. **Customize for Your Project**
   - Update branding and colors
   - Add your specific components
   - Configure your specific API endpoints

2. **Add Advanced Features**
   - Real-time updates with WebSockets
   - File upload functionality
   - Advanced authentication

3. **Optimize for Production**
   - Set up monitoring and analytics
   - Implement error tracking
   - Configure CDN for static assets

4. **Documentation**
   - Document your custom components
   - Create API documentation
   - Write deployment guides

## 💡 Tips for Success

1. **Take It Step by Step**: Don't try to migrate everything at once
2. **Test Frequently**: Test after each phase to catch issues early
3. **Keep Backups**: Create git branches or backups before major changes
4. **Use TypeScript**: Let TypeScript guide you to find missing configurations
5. **Read the Docs**: Refer to the component documentation for examples

---

**Need Help?** If you encounter issues during migration, check the documentation or create an issue in the repository.
