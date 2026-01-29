import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const demoUsers: User[] = [
    {
      id: 'user-1',
      name: 'Anna Andersson',
      email: 'anna@solhojden.se',
      role: 'admin',
      associationId: 'assoc-1',
      avatar: 'https://i.pravatar.cc/150?img=1',
      phone: '+46 70 123 45 67',
      apartment: 'Lgh 1201',
      joinedDate: '2020-01-15'
    },
    {
      id: 'user-2',
      name: 'Erik Eriksson',
      email: 'erik@parkgatan.se',
      role: 'board',
      associationId: 'assoc-2',
      avatar: 'https://i.pravatar.cc/150?img=2',
      phone: '+46 70 234 56 78',
      apartment: 'Lgh 304',
      joinedDate: '2019-03-22'
    },
    {
      id: 'user-3',
      name: 'Maria Svensson',
      email: 'maria@sjoutsikten.se',
      role: 'board',
      associationId: 'assoc-3',
      avatar: 'https://i.pravatar.cc/150?img=3',
      phone: '+46 70 345 67 89',
      apartment: 'Lgh 805',
      joinedDate: '2021-06-10'
    },
    {
      id: 'user-4',
      name: 'Johan Johansson',
      email: 'johan@centrumhuset.se',
      role: 'member',
      associationId: 'assoc-4',
      avatar: 'https://i.pravatar.cc/150?img=4',
      phone: '+46 70 456 78 90',
      apartment: 'Lgh 201',
      joinedDate: '2022-01-05'
    }
  ]

  const login = (email: string, password: string): boolean => {
    // Demo credentials - any password works for demo emails
    const demoCredentials = [
      { email: 'anna@solhojden.se', password: 'solhojden123' },
      { email: 'erik@parkgatan.se', password: 'parkgatan123' },
      { email: 'maria@sjoutsikten.se', password: 'sjoutsikten123' },
      { email: 'johan@centrumhuset.se', password: 'centrumhuset123' },
      { email: 'demo@example.com', password: 'demo123' } // Generic demo
    ]

    const validCredential = demoCredentials.find(cred => 
      cred.email === email && cred.password === password
    )

    if (validCredential) {
      const loggedInUser = demoUsers.find(u => u.email === email) || demoUsers[0]
      user.value = loggedInUser
      isAuthenticated.value = true
      localStorage.setItem('grannskapet_auth', 'true')
      localStorage.setItem('grannskapet_user', JSON.stringify(loggedInUser))
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
