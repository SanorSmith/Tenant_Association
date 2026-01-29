import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const demoUser: User = {
    id: 'user-1',
    name: 'Anna Andersson',
    email: 'anna.andersson@example.com',
    role: 'admin',
    associationId: 'assoc-1',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+46 70 123 45 67',
    apartment: 'Lgh 1201',
    joinedDate: '2020-01-15'
  }

  const login = (email: string, password: string): boolean => {
    if (email && password) {
      user.value = demoUser
      isAuthenticated.value = true
      localStorage.setItem('grannskapet_auth', 'true')
      localStorage.setItem('grannskapet_user', JSON.stringify(demoUser))
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('grannskapet_auth')
    localStorage.removeItem('grannskapet_user')
  }

  const initAuth = () => {
    const authStatus = localStorage.getItem('grannskapet_auth')
    const savedUser = localStorage.getItem('grannskapet_user')
    
    if (authStatus === 'true' && savedUser) {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
  }

  const isAdmin = computed(() => user.value?.role === 'admin')
  const isBoard = computed(() => user.value?.role === 'board' || user.value?.role === 'admin')

  return {
    user,
    isAuthenticated,
    isAdmin,
    isBoard,
    login,
    logout,
    initAuth
  }
})
