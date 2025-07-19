/**
 * API Services
 * 
 * This file contains all the API service functions for different entities.
 * Add your specific API endpoints and methods here.
 */

import { apiClient, ApiResponse, PaginatedResponse } from './client'

// ===== USER SERVICE =====

export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role: string
    created_at: string
    updated_at: string
}

export interface CreateUserData {
    name: string
    email: string
    password: string
    role?: string
}

export interface UpdateUserData {
    name?: string
    email?: string
    avatar?: string
}

export interface LoginData {
    email: string
    password: string
}

export interface AuthResponse {
    user: User
    token: string
    expires_in: number
}

export const userService = {
  // Authentication
    async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
        return apiClient.post('/auth/login', data)
    },

    async logout(): Promise<ApiResponse> {
        return apiClient.post('/auth/logout')
    },

    async register(data: CreateUserData): Promise<ApiResponse<AuthResponse>> {
        return apiClient.post('/auth/register', data)
    },

    async refreshToken(): Promise<ApiResponse<AuthResponse>> {
        return apiClient.post('/auth/refresh')
    },

    // User CRUD
    async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
        return apiClient.get(`/users?page=${page}&limit=${limit}`)
    },

    async getUser(id: string): Promise<ApiResponse<User>> {
        return apiClient.get(`/users/${id}`)
    },

    async getCurrentUser(): Promise<ApiResponse<User>> {
        return apiClient.get('/auth/me')
    },

    async createUser(data: CreateUserData): Promise<ApiResponse<User>> {
        return apiClient.post('/users', data)
    },

    async updateUser(id: string, data: UpdateUserData): Promise<ApiResponse<User>> {
        return apiClient.patch(`/users/${id}`, data)
    },

    async deleteUser(id: string): Promise<ApiResponse> {
        return apiClient.delete(`/users/${id}`)
    },

    async uploadAvatar(id: string, file: File): Promise<ApiResponse<{ avatar_url: string }>> {
        const formData = new FormData()
        formData.append('avatar', file)
        return apiClient.upload(`/users/${id}/avatar`, formData)
    },
}

// ===== PROJECT SERVICE =====

export interface Project {
    id: string
    name: string
    description?: string
    status: 'active' | 'inactive' | 'completed'
    created_at: string
    updated_at: string
    owner_id: string
    owner?: User
}

export interface CreateProjectData {
    name: string
    description?: string
    status?: 'active' | 'inactive'
}

export interface UpdateProjectData {
    name?: string
    description?: string
    status?: 'active' | 'inactive' | 'completed'
}

export const projectService = {
    async getProjects(page = 1, limit = 10, status?: string): Promise<PaginatedResponse<Project>> {
        const statusParam = status ? `&status=${status}` : ''
        return apiClient.get(`/projects?page=${page}&limit=${limit}${statusParam}`)
    },

    async getProject(id: string): Promise<ApiResponse<Project>> {
        return apiClient.get(`/projects/${id}`)
    },

    async createProject(data: CreateProjectData): Promise<ApiResponse<Project>> {
        return apiClient.post('/projects', data)
    },

    async updateProject(id: string, data: UpdateProjectData): Promise<ApiResponse<Project>> {
        return apiClient.patch(`/projects/${id}`, data)
    },

    async deleteProject(id: string): Promise<ApiResponse> {
        return apiClient.delete(`/projects/${id}`)
    },

    async getUserProjects(userId: string): Promise<ApiResponse<Project[]>> {
        return apiClient.get(`/users/${userId}/projects`)
    },
}

// ===== CONTACT SERVICE =====

export interface ContactMessage {
    id: string
    name: string
    email: string
    subject?: string
    message: string
    status: 'unread' | 'read' | 'replied'
    created_at: string
}

export interface CreateContactData {
    name: string
    email: string
    subject?: string
    message: string
}

export const contactService = {
    async getMessages(page = 1, limit = 10, status?: string): Promise<PaginatedResponse<ContactMessage>> {
        const statusParam = status ? `&status=${status}` : ''
        return apiClient.get(`/contact?page=${page}&limit=${limit}${statusParam}`)
    },

    async getMessage(id: string): Promise<ApiResponse<ContactMessage>> {
        return apiClient.get(`/contact/${id}`)
    },

    async createMessage(data: CreateContactData): Promise<ApiResponse<ContactMessage>> {
        return apiClient.post('/contact', data)
    },

    async markAsRead(id: string): Promise<ApiResponse> {
        return apiClient.patch(`/contact/${id}`, { status: 'read' })
    },

    async deleteMessage(id: string): Promise<ApiResponse> {
        return apiClient.delete(`/contact/${id}`)
    },
}

// ===== BLOG SERVICE (if enabled) =====

export interface BlogPost {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string
    featured_image?: string
    status: 'draft' | 'published' | 'archived'
    published_at?: string
    created_at: string
    updated_at: string
    author_id: string
    author?: User
    tags?: string[]
}

export interface CreateBlogPostData {
  title: string
  content: string
  excerpt?: string
  featured_image?: string
  status?: 'draft' | 'published'
  tags?: string[]
}

export interface UpdateBlogPostData {
    title?: string
    content?: string
    excerpt?: string
    featured_image?: string
    status?: 'draft' | 'published' | 'archived'
    tags?: string[]
}

export const blogService = {
    async getPosts(page = 1, limit = 10, status?: string): Promise<PaginatedResponse<BlogPost>> {
        const statusParam = status ? `&status=${status}` : ''
        return apiClient.get(`/blog/posts?page=${page}&limit=${limit}${statusParam}`)
    },

    async getPost(slug: string): Promise<ApiResponse<BlogPost>> {
        return apiClient.get(`/blog/posts/${slug}`)
    },

    async createPost(data: CreateBlogPostData): Promise<ApiResponse<BlogPost>> {
        return apiClient.post('/blog/posts', data)
    },

    async updatePost(id: string, data: UpdateBlogPostData): Promise<ApiResponse<BlogPost>> {
        return apiClient.patch(`/blog/posts/${id}`, data)
    },

    async deletePost(id: string): Promise<ApiResponse> {
        return apiClient.delete(`/blog/posts/${id}`)
    },

    async uploadFeaturedImage(postId: string, file: File): Promise<ApiResponse<{ image_url: string }>> {
        const formData = new FormData()
        formData.append('featured_image', file)
        return apiClient.upload(`/blog/posts/${postId}/featured-image`, formData)
    },
}

// ===== ANALYTICS SERVICE (if enabled) =====

export interface AnalyticsData {
    page_views: number
    unique_visitors: number
    bounce_rate: number
    avg_session_duration: number
    top_pages: Array<{
        path: string
        views: number
    }>
    traffic_sources: Array<{
        source: string
        visitors: number
    }>
}

export const analyticsService = {
    async getAnalytics(
        startDate: string,
        endDate: string
    ): Promise<ApiResponse<AnalyticsData>> {
        return apiClient.get(`/analytics?start_date=${startDate}&end_date=${endDate}`)
    },

    async trackPageView(page: string): Promise<ApiResponse> {
        return apiClient.post('/analytics/page-view', { page })
    },

    async trackEvent(event: string, data?: Record<string, any>): Promise<ApiResponse> {
        return apiClient.post('/analytics/event', { event, data })
    },
}

// ===== FILE UPLOAD SERVICE =====

export interface UploadResponse {
    url: string
    filename: string
    size: number
    type: string
}

export const fileService = {
    async uploadFile(file: File, folder = 'uploads'): Promise<ApiResponse<UploadResponse>> {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)
        return apiClient.upload('/files/upload', formData)
    },

    async uploadMultipleFiles(
        files: FileList | File[],
        folder = 'uploads'
    ): Promise<ApiResponse<UploadResponse[]>> {
        const formData = new FormData()
        Array.from(files).forEach((file, index) => {
        formData.append(`files[${index}]`, file)
        })
        formData.append('folder', folder)
        return apiClient.upload('/files/upload-multiple', formData)
    },

    async deleteFile(filename: string): Promise<ApiResponse> {
        return apiClient.delete(`/files/${filename}`)
    },
}

// Export all services
export const api = {
    user: userService,
    project: projectService,
    contact: contactService,
    blog: blogService,
    analytics: analyticsService,
    file: fileService,
}
