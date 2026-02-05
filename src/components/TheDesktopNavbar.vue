<template>
  <nav class="navbar bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm hidden lg:block">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <RouterLink to="/dashboard" class="flex items-center gap-2 hidden">
            <img alt="Hyresgästföreningen" class="hidden sm:block h-8 w-auto object-contain" src="https://hyresgaestfoereningen-lokalt.vercel.app/HGF_logo_RGB_POS.png">
            <img alt="Hyresgästföreningen" class="sm:hidden h-8 w-auto object-contain" src="https://hyresgaestfoereningen-lokalt.vercel.app/logo_mobil.png">
            <span class="text-xl font-bold text-gray-400 hidden sm:block">Grannskapet</span>
          </RouterLink>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <svg class="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>

          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span class="text-white font-bold text-sm">{{ user?.name?.charAt(0).toUpperCase() || 'U' }}</span>
              </div>
              <span class="hidden md:block text-sm font-medium text-navy">{{ user?.name }}</span>
              <svg class="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition name="dropdown">
              <div v-if="showUserMenu" class="user-menu">
                <div class="px-4 py-3 border-b border-gray-200">
                  <p class="text-sm font-medium text-navy">{{ user?.name }}</p>
                  <p class="text-xs text-textGray">{{ user?.email }}</p>
                </div>
                <RouterLink to="/settings" class="menu-item" @click="showUserMenu = false">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Inställningar
                </RouterLink>
                <button @click="handleLogout" class="menu-item w-full text-left text-accent-600 hover:bg-accent-50">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logga ut
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = () => {
  logout()
  showUserMenu.value = false
}
</script>

<style scoped>
.user-menu {
  @apply absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2;
}

.menu-item {
  @apply flex items-center gap-3 px-4 py-2 text-sm text-navy hover:bg-gray-50 transition-colors;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
