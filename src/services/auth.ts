import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

// Types
interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  name: string
}

interface AuthResponse {
  user: User
  token: string
}

interface DecodedToken {
  sub: string
  email: string
  exp: number
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Service class
class AuthService {
  private static instance: AuthService
  private token: string | null = null
  private tokenExpirationTimer: NodeJS.Timeout | null = null

  private constructor() {
    // Initialize token from localStorage
    this.token = localStorage.getItem('token')
    if (this.token) {
      this.setAuthHeader(this.token)
      this.setupTokenRefresh()
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  // Set auth header for all future requests
  private setAuthHeader(token: string | null) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }

  // Setup automatic token refresh
  private setupTokenRefresh() {
    if (!this.token) return

    try {
      const decoded = jwtDecode<DecodedToken>(this.token)
      const expiresIn = decoded.exp * 1000 - Date.now() - 60000 // Refresh 1 minute before expiration

      if (expiresIn <= 0) {
        this.logout()
        return
      }

      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer)
      }

      this.tokenExpirationTimer = setTimeout(() => {
        this.refreshToken()
      }, expiresIn)
    } catch (error) {
      console.error('Error setting up token refresh:', error)
      this.logout()
    }
  }

  // Login user
  public async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials)
      this.handleAuthResponse(data)
      return data.user
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Register new user
  public async register(userData: RegisterData): Promise<User> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', userData)
      this.handleAuthResponse(data)
      return data.user
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Refresh token
  public async refreshToken(): Promise<void> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/refresh')
      this.handleAuthResponse(data)
    } catch (error) {
      this.logout()
      throw this.handleError(error)
    }
  }

  // Logout user
  public logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.token = null
    this.setAuthHeader(null)
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
      this.tokenExpirationTimer = null
    }
  }

  // Get current user
  public async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await api.get<User>('/auth/me')
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        this.logout()
      }
      return null
    }
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    return !!this.token && !this.isTokenExpired()
  }

  // Check if token is expired
  private isTokenExpired(): boolean {
    if (!this.token) return true
    try {
      const decoded = jwtDecode<DecodedToken>(this.token)
      return decoded.exp * 1000 < Date.now()
    } catch {
      return true
    }
  }

  // Handle successful auth response
  private handleAuthResponse(response: AuthResponse): void {
    const { token, user } = response
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.token = token
    this.setAuthHeader(token)
    this.setupTokenRefresh()
  }

  // Error handler
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message
      return new Error(message)
    }
    return new Error('An unexpected error occurred')
  }

  // Reset password request
  public async requestPasswordReset(email: string): Promise<void> {
    try {
      await api.post('/auth/reset-password-request', { email })
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Reset password with token
  public async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post('/auth/reset-password', { token, newPassword })
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Update user profile
  public async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const { data } = await api.patch<User>('/auth/profile', userData)
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Change password
  public async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      })
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get API instance for other services
  public getApiInstance() {
    return api
  }
}

// Export singleton instance
export const authService = AuthService.getInstance()
export type { User, LoginCredentials, RegisterData }

