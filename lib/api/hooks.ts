/**
 * API Hooks
 * 
 * React hooks for data fetching and state management.
 * These hooks provide a clean interface for API calls with loading states and error handling.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { api, User, Project, ContactMessage, BlogPost } from './services'
import { ApiError } from './client'

// Generic hook types
export interface UseApiState<T> {
    data: T | null
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export interface UseApiListState<T> {
    data: T[]
    loading: boolean
    error: string | null
    hasMore: boolean
    loadMore: () => Promise<void>
    refetch: () => Promise<void>
}

// ===== GENERIC HOOKS =====

/**
 * Generic hook for API calls
 */
export function useApi<T>(
    apiCall: () => Promise<{ data: T; success: boolean; message?: string }>,
    dependencies: any[] = []
): UseApiState<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await apiCall()
            if (response.success) {
                setData(response.data)
            } else {
                setError(response.message || 'Unknown error occurred')
            }
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message)
            } else {
                setError('Network error occurred')
            }
        } finally {
            setLoading(false)
        }
    }, dependencies)

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, loading, error, refetch: fetchData }
}

/**
 * Generic hook for paginated API calls
 */
export function usePaginatedApi<T>(
    apiCall: (page: number, limit: number) => Promise<any>,
    limit = 10,
    dependencies: any[] = []
): UseApiListState<T> {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchData = useCallback(async (pageNum = 1, append = false) => {
        try {
            setLoading(true)
            if (!append) setError(null)
            
            const response = await apiCall(pageNum, limit)
            
            if (response.success) {
                const newData = response.data
                const pagination = response.pagination
                
                if (append) {
                    setData((prev: T[]) => [...prev, ...newData])
                } else {
                    setData(newData)
                }
                
                setHasMore(pagination?.has_next || false)
                setPage(pageNum)
            } else {
                setError(response.message || 'Unknown error occurred')
            }
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message)
            } else {
                setError('Network error occurred')
            }
        } finally {
            setLoading(false)
        }
    }, [apiCall, limit, ...dependencies])

    const loadMore = useCallback(async () => {
        if (hasMore && !loading) {
            await fetchData(page + 1, true)
        }
    }, [fetchData, page, hasMore, loading])

    const refetch = useCallback(async () => {
        setPage(1)
        await fetchData(1, false)
    }, [fetchData])

    useEffect(() => {
        fetchData(1, false)
    }, [fetchData])

    return { data, loading, error, hasMore, loadMore, refetch }
}

// ===== USER HOOKS =====

export function useCurrentUser(): UseApiState<User> {
    return useApi(() => api.user.getCurrentUser())
}

export function useUser(id: string): UseApiState<User> {
    return useApi(() => api.user.getUser(id), [id])
}

export function useUsers(limit = 10) {
    return usePaginatedApi<User>((page, pageLimit) => 
        api.user.getUsers(page, pageLimit), limit
    )
}

// ===== PROJECT HOOKS =====

export function useProject(id: string): UseApiState<Project> {
    return useApi(() => api.project.getProject(id), [id])
}

export function useProjects(limit = 10, status?: string) {
    return usePaginatedApi<Project>((page, pageLimit) => 
        api.project.getProjects(page, pageLimit, status), limit, [status]
    )
}

export function useUserProjects(userId: string): UseApiState<Project[]> {
    return useApi(() => api.project.getUserProjects(userId), [userId])
}

// ===== CONTACT HOOKS =====

export function useContactMessage(id: string): UseApiState<ContactMessage> {
    return useApi(() => api.contact.getMessage(id), [id])
}

export function useContactMessages(limit = 10, status?: string) {
    return usePaginatedApi<ContactMessage>((page, pageLimit) => 
        api.contact.getMessages(page, pageLimit, status), limit, [status]
    )
}

// ===== BLOG HOOKS =====

export function useBlogPost(slug: string): UseApiState<BlogPost> {
    return useApi(() => api.blog.getPost(slug), [slug])
}

export function useBlogPosts(limit = 10, status?: string) {
    return usePaginatedApi<BlogPost>((page, pageLimit) => 
        api.blog.getPosts(page, pageLimit, status), limit, [status]
    )
}

// ===== MUTATION HOOKS =====

export interface UseMutationOptions<TData, TVariables> {
    onSuccess?: (data: TData) => void
    onError?: (error: ApiError | Error) => void
    onSettled?: () => void
}

export interface UseMutationResult<TData, TVariables> {
    mutate: (variables: TVariables) => Promise<void>
    data: TData | null
    loading: boolean
    error: string | null
    reset: () => void
}

export function useMutation<TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<{ data: TData; success: boolean; message?: string }>,
    options?: UseMutationOptions<TData, TVariables>
): UseMutationResult<TData, TVariables> {
    const [data, setData] = useState<TData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const mutate = useCallback(async (variables: TVariables) => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await mutationFn(variables)
            
            if (response.success) {
                setData(response.data)
                options?.onSuccess?.(response.data)
            } else {
                const errorMsg = response.message || 'Mutation failed'
                setError(errorMsg)
                options?.onError?.(new Error(errorMsg))
            }
        } catch (err) {
            const errorMsg = err instanceof ApiError ? err.message : 'Network error occurred'
            setError(errorMsg)
            options?.onError?.(err as Error)
        } finally {
            setLoading(false)
            options?.onSettled?.()
        }
    }, [mutationFn, options])

    const reset = useCallback(() => {
        setData(null)
        setError(null)
        setLoading(false)
    }, [])

    return { mutate, data, loading, error, reset }
}

// ===== SPECIFIC MUTATION HOOKS =====

export function useLogin() {
  return useMutation(api.user.login)
}

export function useRegister() {
    return useMutation(api.user.register)
}

export function useCreateProject() {
    return useMutation(api.project.createProject)
}

export function useUpdateProject() {
    return useMutation(({ id, data }: { id: string; data: any }) => 
        api.project.updateProject(id, data)
    )
}

export function useDeleteProject() {
    return useMutation(({ id }: { id: string }) => 
        api.project.deleteProject(id)
    )
}

export function useCreateContact() {
    return useMutation(api.contact.createMessage)
}

export function useCreateBlogPost() {
    return useMutation(api.blog.createPost)
}

export function useUpdateBlogPost() {
    return useMutation(({ id, data }: { id: string; data: any }) => 
        api.blog.updatePost(id, data)
    )
}

export function useFileUpload() {
    return useMutation(({ file, folder }: { file: File; folder?: string }) => 
        api.file.uploadFile(file, folder)
    )
}

// ===== AUTHENTICATION HOOK =====

export function useAuth() {
    const { data: user, loading, error, refetch } = useCurrentUser()
    const loginMutation = useLogin()
    const registerMutation = useRegister()
    
    const login = useCallback(async (credentials: { email: string; password: string }) => {
        await loginMutation.mutate(credentials)
        if (loginMutation.data) {
            // Store token if login successful
            // This depends on your authentication strategy
            await refetch()
        }
    }, [loginMutation, refetch])

    const logout = useCallback(async () => {
        try {
            await api.user.logout()
            // Clear stored token
            // This depends on your authentication strategy
            await refetch()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }, [refetch])

    const register = useCallback(async (userData: any) => {
        await registerMutation.mutate(userData)
        if (registerMutation.data) {
        // Store token if registration successful
        // This depends on your authentication strategy
        await refetch()
        }
    }, [registerMutation, refetch])

    return {
        user,
        loading: loading || loginMutation.loading || registerMutation.loading,
        error: error || loginMutation.error || registerMutation.error,
        login,
        logout,
        register,
        refetch,
    }
}
