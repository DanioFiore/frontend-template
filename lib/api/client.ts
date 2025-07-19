/**
 * API Client Configuration and Base Service
 * 
 * This file provides a centralized API client for communicating with your backend.
 * Configure your API endpoints, authentication, and error handling here.
 */

import { APP_CONFIG, getEnvironmentConfig } from '@/config/app.config'

// API Response Types
export interface ApiResponse<T = any> {
    data: T
    message?: string
    success: boolean
    errors?: string[]
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
    pagination: {
        current_page: number
        per_page: number
        total: number
        total_pages: number
        has_next: boolean
        has_prev: boolean
    }
}

// API Error Types
export class ApiError extends Error {
    public status: number
    public errors: string[]

    constructor(message: string, status: number = 500, errors: string[] = []) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.errors = errors
    }
}

// Request Configuration
interface RequestConfig extends RequestInit {
    timeout?: number
    retries?: number
}

/**
 * API Client Class
 * 
 * Handles all HTTP requests to your backend API.
 * Includes automatic retry logic, timeout handling, and error formatting.
 */
class ApiClient {
    private baseUrl: string
    private defaultTimeout: number
    private defaultRetries: number

    constructor() {
        const env = getEnvironmentConfig()
        this.baseUrl = env.apiUrl
        this.defaultTimeout = APP_CONFIG.api.timeout
        this.defaultRetries = APP_CONFIG.api.retryAttempts
    }

    /**
     * Set the base URL for API requests
     */
    setBaseUrl(url: string) {
        this.baseUrl = url
    }

    /**
     * Get current base URL
     */
    getBaseUrl(): string {
        return this.baseUrl
    }

    /**
     * Make a request with timeout and retry logic
     */
    private async makeRequest<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<T> {
        const {
            timeout = this.defaultTimeout,
            retries = this.defaultRetries,
            ...requestConfig
        } = config

        const url = `${this.baseUrl}${endpoint}`
        
        // Default headers
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(requestConfig.headers as Record<string, string>),
        }

        // Add authorization header if token exists
        const token = this.getAuthToken()
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const requestOptions: RequestInit = {
            ...requestConfig,
            headers,
        }

        // Retry logic
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), timeout)

                const response = await fetch(url, {
                ...requestOptions,
                signal: controller.signal,
                })

                clearTimeout(timeoutId)

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    throw new ApiError(
                        errorData.message || `HTTP ${response.status}`,
                        response.status,
                        errorData.errors || []
                    )
                }

                const data = await response.json()
                return data
                } catch (error: any) {
                if (attempt === retries) {
                    if (error instanceof ApiError) {
                        throw error
                    }
                    
                    if (error?.name === 'AbortError') {
                        throw new ApiError('Request timeout', 408)
                    }
                    
                    throw new ApiError(
                        error?.message || 'Network error',
                        0
                    )
                }        // Wait before retrying
                await new Promise(resolve => 
                    setTimeout(resolve, APP_CONFIG.api.retryDelay * (attempt + 1))
                )
            }
        }

        throw new ApiError('Max retries exceeded', 0)
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.makeRequest<T>(endpoint, {
            method: 'GET',
            ...config,
        })
    }

    /**
     * POST request
     */
    async post<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.makeRequest<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        })
    }

    /**
     * PUT request
     */
    async put<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.makeRequest<T>(endpoint, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
        ...config,
        })
    }

    /**
     * PATCH request
     */
    async patch<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.makeRequest<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        })
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.makeRequest<T>(endpoint, {
            method: 'DELETE',
            ...config,
        })
    }

    /**
     * Upload files (multipart/form-data)
     */
    async upload<T>(
        endpoint: string,
        formData: FormData,
        config?: RequestConfig
    ): Promise<T> {
        const { headers, ...rest } = config || {}
        
        return this.makeRequest<T>(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
            // Don't set Content-Type for FormData - let browser set it
            ...headers,
        },
        ...rest,
        })
    }

    /**
     * Get authentication token from storage
     * Customize this based on your authentication strategy
     */
    private getAuthToken(): string | null {
        if (typeof window === 'undefined') return null
        
        // Examples of common storage methods:
        // return localStorage.getItem('auth_token')
        // return sessionStorage.getItem('access_token')
        // return getCookie('jwt_token')
        
        return null
    }

    /**
     * Set authentication token
     * Customize this based on your authentication strategy
     */
    setAuthToken(token: string) {
        if (typeof window === 'undefined') return
        
        // Examples of common storage methods:
        // localStorage.setItem('auth_token', token)
        // sessionStorage.setItem('access_token', token)
        // setCookie('jwt_token', token)
    }

    /**
     * Remove authentication token
     */
    removeAuthToken() {
        if (typeof window === 'undefined') return
        
        // Examples of common storage methods:
        // localStorage.removeItem('auth_token')
        // sessionStorage.removeItem('access_token')
        // removeCookie('jwt_token')
    }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()

// Export the class for testing or custom instances
export { ApiClient }
