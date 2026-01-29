import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'board' | 'member'
}

const isAuthenticated = ref(false)
const currentUser = ref<User | null>(null)

export function useAuth() {
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      // Demo authentication - any email/password works
      if (email && password) {
        // Determine role based on email for demo
        let role: 'admin' | 'board' | 'member' = 'member'
        if (email.includes('admin')) {
          role = 'admin'
        } else if (email.includes('board') || email.includes('styrelse')) {
          role = 'board'
        }

        const user: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email: email,
          role: role,
        }

        isAuthenticated.value = true
        currentUser.value = user
        
        localStorage.setItem('grannskapet_auth', 'true')
        localStorage.setItem('grannskapet_user', JSON.stringify(user))
        
        router.push('/dashboard')
        return { success: true, user }
      }
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
    localStorage.removeItem('grannskapet_auth')
    localStorage.removeItem('grannskapet_user')
    router.push('/login')
  }

  const checkAuth = () => {
    const authStatus = localStorage.getItem('grannskapet_auth')
    const userData = localStorage.getItem('grannskapet_user')
    
    if (authStatus === 'true' && userData) {
      isAuthenticated.value = true
      currentUser.value = JSON.parse(userData)
      return true
    }
    return false
  }

  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const isBoard = computed(() => currentUser.value?.role === 'board' || currentUser.value?.role === 'admin')
  const isMember = computed(() => currentUser.value !== null)

  // Initialize auth state
  checkAuth()

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    currentUser: computed(() => currentUser.value),
    isAdmin,
    isBoard,
    isMember,
    login,
    logout,
    checkAuth,
  }
}
