import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const SESSION_TIMEOUT = 10 * 60 * 1000 // 10 minutes in milliseconds
const STORAGE_KEY = 'grannskapet_auth'
const SESSION_KEY = 'grannskapet_session'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface SessionData {
  user: User
  loginTime: number
  lastActivity: number
}

const user = ref<User | null>(null)
const sessionTimeout = ref<NodeJS.Timeout | null>(null)

export function useAuth() {
  const router = useRouter()

  // Initialize auth state from localStorage
  const initAuth = () => {
    const storedSession = localStorage.getItem(SESSION_KEY)
    const isAuthenticated = localStorage.getItem(STORAGE_KEY) === 'true'

    if (isAuthenticated && storedSession) {
      try {
        const sessionData: SessionData = JSON.parse(storedSession)
        const now = Date.now()

        // Check if session is still valid (not expired)
        if (now - sessionData.lastActivity < SESSION_TIMEOUT) {
          user.value = sessionData.user
          startSessionTimer()
          updateLastActivity()
          return true
        } else {
          // Session expired, clean up
          logout()
          return false
        }
      } catch (error) {
        console.error('Error parsing session data:', error)
        logout()
        return false
      }
    }
    return false
  }

  // Login function
  const login = (userData: User) => {
    const now = Date.now()
    const sessionData: SessionData = {
      user: userData,
      loginTime: now,
      lastActivity: now
    }

    user.value = userData
    localStorage.setItem(STORAGE_KEY, 'true')
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
    
    startSessionTimer()
    updateLastActivity()
  }

  // Logout function
  const logout = () => {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(SESSION_KEY)
    
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
      sessionTimeout.value = null
    }

    router.push('/login')
  }

  // Update last activity time
  const updateLastActivity = () => {
    const storedSession = localStorage.getItem(SESSION_KEY)
    if (storedSession) {
      try {
        const sessionData: SessionData = JSON.parse(storedSession)
        sessionData.lastActivity = Date.now()
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
      } catch (error) {
        console.error('Error updating session activity:', error)
      }
    }
  }

  // Start session timeout timer
  const startSessionTimer = () => {
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
    }

    sessionTimeout.value = setTimeout(() => {
      console.log('Session expired due to inactivity')
      logout()
    }, SESSION_TIMEOUT)
  }

  // Reset session timer (call this on user activity)
  const resetSessionTimer = () => {
    updateLastActivity()
    startSessionTimer()
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => {
    return user.value !== null && localStorage.getItem(STORAGE_KEY) === 'true'
  })

  // Get remaining session time
  const remainingSessionTime = computed(() => {
    const storedSession = localStorage.getItem(SESSION_KEY)
    if (storedSession) {
      try {
        const sessionData: SessionData = JSON.parse(storedSession)
        const elapsed = Date.now() - sessionData.lastActivity
        return Math.max(0, SESSION_TIMEOUT - elapsed)
      } catch (error) {
        return 0
      }
    }
    return 0
  })

  // Format remaining time for display
  const formatRemainingTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return {
    user,
    isAuthenticated,
    remainingSessionTime,
    initAuth,
    login,
    logout,
    resetSessionTimer,
    formatRemainingTime
  }
}
