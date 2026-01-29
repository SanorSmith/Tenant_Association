<template>
  <aside :class="sidebarClasses">
    <div class="sidebar-content h-full flex flex-col">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">G</span>
            </div>
            <div v-if="!collapsed">
              <h2 class="text-lg font-bold text-accent">Grannskapet</h2>
              <p class="text-xs text-textGray">Admin Panel</p>
            </div>
          </div>
          <button
            v-if="!collapsed"
            @click="toggleCollapse"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:block hidden"
          >
            <svg class="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      <nav class="flex-1 p-4 overflow-y-auto">
        <div class="space-y-1">
          <RouterLink
            v-for="item in menuItems"
            :key="item.name"
            :to="{ name: item.name }"
            class="sidebar-link"
            :title="collapsed ? item.label : ''"
          >
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <span v-if="!collapsed" class="sidebar-label">{{ item.label }}</span>
            <BaseBadge v-if="!collapsed && item.badge" variant="danger" size="sm" class="ml-auto">
              {{ item.badge }}
            </BaseBadge>
          </RouterLink>
        </div>
      </nav>

      <div class="p-4 border-t border-gray-200">
        <button
          v-if="collapsed"
          @click="toggleCollapse"
          class="w-full p-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <svg class="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
        <div v-else class="space-y-3">
          <div class="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
            <img
              :src="authStore.user?.avatar"
              :alt="authStore.user?.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-navy truncate">{{ authStore.user?.name }}</p>
              <p class="text-xs text-textGray truncate">{{ authStore.user?.apartment }}</p>
            </div>
          </div>
          
          <div class="space-y-1">
            <RouterLink
              to="/settings"
              class="flex items-center gap-3 px-3 py-2 text-sm text-navy hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Inställningar</span>
            </RouterLink>
            
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logga ut</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseBadge from './BaseBadge.vue'

const router = useRouter()
const authStore = useAuthStore()
const collapsed = ref(false)

const sidebarClasses = computed(() => {
  const base = 'sidebar bg-white border-r border-gray-200 transition-all duration-300 hidden lg:block'
  const width = collapsed.value ? 'w-20' : 'w-64'
  return `${base} ${width}`
})

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const handleLogout = () => {
  if (confirm('Är du säker på att du vill logga ut?')) {
    authStore.logout()
    router.push('/login')
  }
}

const DashboardIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])

const MeetingsIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
])

const DocumentsIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
])

const BudgetIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const ActivitiesIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const PremisesIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
])

const BookingsIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' })
])

const menuItems = [
  { label: 'Dashboard', name: 'dashboard', icon: DashboardIcon },
  { label: 'Möten', name: 'meetings', icon: MeetingsIcon, badge: 3 },
  { label: 'Dokument', name: 'documents', icon: DocumentsIcon },
  { label: 'Budget', name: 'budget', icon: BudgetIcon },
  { label: 'Aktiviteter', name: 'activities', icon: ActivitiesIcon },
  { label: 'Lokaler', name: 'premises', icon: PremisesIcon },
  { label: 'Bokningar', name: 'bookings', icon: BookingsIcon, badge: 2 }
]
</script>

<style scoped>
.sidebar {
  @apply fixed top-0 left-0 h-screen z-30;
}

.sidebar-link {
  @apply flex items-center gap-3 px-4 py-3 text-navy font-medium rounded-lg hover:bg-primary-50 hover:text-primary transition-all;
}

.sidebar-link.router-link-active {
  @apply bg-primary text-white;
}

.sidebar-label {
  @apply flex-1 truncate;
}
</style>
