# Backend Integration Guide

This comprehensive guide explains how to connect your frontend template to various backend technologies and APIs.

## 🔗 Quick Setup

### 1. Configure Your API URL

In `/config/app.config.ts`, set your backend URL:

```typescript
export const APP_CONFIG = {
  // ... other config
  apiUrl: 'http://localhost:3001/api', // Your backend API URL
  
  // API Configuration
  api: {
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },
}
```

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Authentication (if using JWT)
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret

# Database (for direct connections)
DATABASE_URL=postgresql://user:password@localhost:5432/database

# External Services
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 🏗️ Backend Technologies

### Node.js with Express

**Example Backend Structure:**

```javascript
// server.js
const express = require('express')
const cors = require('cors')
const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/projects', require('./routes/projects'))

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    errors: err.errors || []
  })
})

app.listen(3001, () => {
  console.log('Backend server running on port 3001')
})
```

**Frontend Integration:**

```typescript
// No changes needed - just update your API URL in config
const response = await api.user.getUsers()
```

### Python with FastAPI

**Example Backend:**

```python
# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    id: str
    name: str
    email: str
    role: str

class CreateUserRequest(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "user"

@app.get("/api/users", response_model=List[User])
async def get_users(page: int = 1, limit: int = 10):
    # Your logic here
    return users

@app.post("/api/users", response_model=User)
async def create_user(user_data: CreateUserRequest):
    # Your logic here
    return new_user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
```

**Frontend Integration:**

```typescript
// The API client automatically handles FastAPI's response format
const users = await api.user.getUsers()
const newUser = await api.user.createUser({
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
})
```

### PHP with Laravel

**Example Backend Routes:**

```php
// routes/api.php
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProjectController;

Route::middleware('cors')->group(function () {
    // Authentication routes
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('projects', ProjectController::class);
    });
});
```

**Controller Example:**

```php
// app/Http/Controllers/API/UserController.php
class UserController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 10);
        
        $users = User::paginate($limit, ['*'], 'page', $page);
        
        return response()->json([
            'success' => true,
            'data' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'total_pages' => $users->lastPage(),
                'has_next' => $users->hasMorePages(),
                'has_prev' => $users->currentPage() > 1,
            ]
        ]);
    }
    
    public function store(Request $request)
    {
        $user = User::create($request->validated());
        
        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User created successfully'
        ], 201);
    }
}
```

### .NET Core Web API

**Example Controller:**

```csharp
// Controllers/UsersController.cs
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<User>>>> GetUsers(
        int page = 1, 
        int limit = 10)
    {
        var users = await _userService.GetUsersAsync(page, limit);
        
        return Ok(new ApiResponse<List<User>>
        {
            Success = true,
            Data = users.Data,
            Pagination = users.Pagination
        });
    }
    
    [HttpPost]
    public async Task<ActionResult<ApiResponse<User>>> CreateUser(CreateUserRequest request)
    {
        var user = await _userService.CreateUserAsync(request);
        
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new ApiResponse<User>
        {
            Success = true,
            Data = user,
            Message = "User created successfully"
        });
    }
}

// Models/ApiResponse.cs
public class ApiResponse<T>
{
    public T Data { get; set; }
    public string Message { get; set; }
    public bool Success { get; set; }
    public List<string> Errors { get; set; } = new();
    public PaginationInfo Pagination { get; set; }
}
```

## 🔐 Authentication Integration

### JWT Authentication

**Backend Setup (Node.js):**

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    })
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid token.'
    })
  }
}

// routes/auth.js
router.post('/login', async (req, res) => {
  // Validate credentials
  const user = await User.findOne({ email: req.body.email })
  
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    res.json({
      success: true,
      data: {
        user: user,
        token: token,
        expires_in: 86400 // 24 hours in seconds
      }
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    })
  }
})
```

**Frontend Authentication Hook:**

```typescript
// lib/api/auth.ts
import { apiClient } from './client'

export const authService = {
  login: async (credentials: LoginData) => {
    const response = await apiClient.post('/auth/login', credentials)
    
    if (response.success) {
      // Store token
      localStorage.setItem('auth_token', response.data.token)
      
      // Set token in API client
      apiClient.setAuthToken(response.data.token)
    }
    
    return response
  },
  
  logout: async () => {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      // Always clear token
      localStorage.removeItem('auth_token')
      apiClient.removeAuthToken()
    }
  },
  
  initializeAuth: () => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      apiClient.setAuthToken(token)
    }
  }
}

// Call this when your app starts
authService.initializeAuth()
```

### Session-Based Authentication

**Backend Setup:**

```javascript
// With express-session
const session = require('express-session')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

// Login route
router.post('/login', async (req, res) => {
  // Validate user
  if (validUser) {
    req.session.userId = user.id
    res.json({
      success: true,
      data: { user }
    })
  }
})
```

**Frontend Configuration:**

```typescript
// Update API client to send cookies
class ApiClient {
  constructor() {
    // Include credentials for session cookies
    this.defaultConfig = {
      credentials: 'include' as RequestCredentials
    }
  }
  
  private async makeRequest<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const requestOptions: RequestInit = {
      ...this.defaultConfig,
      ...config,
    }
    
    // Rest of implementation
  }
}
```

## 🗄️ Database Integration Patterns

### RESTful API Pattern

**Backend Endpoints:**

```
GET    /api/users          - Get all users (paginated)
GET    /api/users/:id      - Get specific user
POST   /api/users          - Create new user
PUT    /api/users/:id      - Update user (full update)
PATCH  /api/users/:id      - Update user (partial update)
DELETE /api/users/:id      - Delete user

GET    /api/users/:id/projects - Get user's projects
POST   /api/users/:id/avatar   - Upload user avatar
```

**Frontend Service:**

```typescript
// This pattern is already implemented in /lib/api/services.ts
export const userService = {
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    return apiClient.get(`/users?page=${page}&limit=${limit}`)
  },
  
  async getUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.get(`/users/${id}`)
  },
  
  async createUser(data: CreateUserData): Promise<ApiResponse<User>> {
    return apiClient.post('/users', data)
  },
  
  // ... other methods
}
```

### GraphQL Integration

**Backend (Apollo Server):**

```javascript
// schema.js
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    projects: [Project!]!
  }
  
  type Query {
    users(page: Int, limit: Int): UserConnection!
    user(id: ID!): User
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
  }
`
```

**Frontend GraphQL Client:**

```typescript
// lib/api/graphql.ts
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: `${APP_CONFIG.apiUrl}/graphql`,
  cache: new InMemoryCache(),
})

export const GET_USERS = gql`
  query GetUsers($page: Int, $limit: Int) {
    users(page: $page, limit: $limit) {
      data {
        id
        name
        email
      }
      pagination {
        currentPage
        totalPages
        hasNext
      }
    }
  }
`

export const graphqlService = {
  async getUsers(page = 1, limit = 10) {
    const { data } = await client.query({
      query: GET_USERS,
      variables: { page, limit }
    })
    return data.users
  }
}
```

## 📤 File Upload Integration

### Backend File Handling

**Express with Multer:**

```javascript
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    })
  }
  
  res.json({
    success: true,
    data: {
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      type: req.file.mimetype
    }
  })
})
```

**Frontend Usage:**

```typescript
// Already implemented in the template
import { useFileUpload } from '@/lib/api/hooks'

function UploadComponent() {
  const upload = useFileUpload()
  
  const handleFileUpload = async (file: File) => {
    await upload.mutate({ file, folder: 'avatars' })
    
    if (upload.data) {
      console.log('Upload successful:', upload.data.url)
    }
  }
  
  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) handleFileUpload(file)
      }}
    />
  )
}
```

## 🔄 Real-time Features

### WebSocket Integration

**Backend (Socket.io):**

```javascript
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId)
  })
  
  socket.on('send-message', (data) => {
    socket.to(data.roomId).emit('new-message', data)
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})
```

**Frontend Integration:**

```typescript
// lib/websocket.ts
import { io, Socket } from 'socket.io-client'
import { APP_CONFIG } from '@/config/app.config'

class WebSocketService {
  private socket: Socket | null = null
  
  connect() {
    this.socket = io(APP_CONFIG.apiUrl.replace('/api', ''))
    
    this.socket.on('connect', () => {
      console.log('Connected to server')
    })
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })
    
    return this.socket
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }
  
  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data)
    }
  }
  
  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }
}

export const websocketService = new WebSocketService()

// React hook for WebSocket
export function useWebSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)
  
  useEffect(() => {
    const newSocket = websocketService.connect()
    setSocket(newSocket)
    
    return () => {
      websocketService.disconnect()
    }
  }, [])
  
  return socket
}
```

## 📊 Error Handling

### Global Error Handling

**Backend Error Middleware:**

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message
  
  // Log error
  console.error(err)
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = { message, status: 404 }
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = { message, status: 400 }
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = { message, status: 400, errors: message }
  }
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Server Error',
    errors: error.errors || []
  })
}

module.exports = errorHandler
```

**Frontend Error Boundary:**

```typescript
// components/ErrorBoundary.tsx
'use client'
import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<
  Props,
  { hasError: boolean; error: Error | null }
> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultErrorFallback
      return <Fallback error={this.state.error!} reset={() => this.setState({ hasError: false, error: null })} />
    }
    
    return this.props.children
  }
}

function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}
```

## 🚀 Performance Optimization

### API Response Caching

```typescript
// lib/api/cache.ts
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private ttl = 5 * 60 * 1000 // 5 minutes
  
  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }
  
  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() })
  }
  
  clear() {
    this.cache.clear()
  }
}

export const apiCache = new ApiCache()

// Use in API client
class ApiClient {
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const cacheKey = `GET:${endpoint}`
    const cached = apiCache.get(cacheKey)
    
    if (cached && !config?.bypassCache) {
      return cached
    }
    
    const response = await this.makeRequest<T>(endpoint, { method: 'GET', ...config })
    apiCache.set(cacheKey, response)
    
    return response
  }
}
```

### Request Debouncing

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

// Usage in search
function SearchComponent() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  
  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery)
    }
  }, [debouncedQuery])
}
```

This guide covers the most common backend integration scenarios. The template's API client is designed to work with any REST API that follows standard HTTP conventions and returns JSON responses in the expected format.
