<template>
  <div class="default-layout min-h-screen flex" @click="handleActivity" @keydown="handleActivity" @mousemove="handleActivity" @scroll="handleActivity">
    <TheSidebar />
    
    <div class="flex-1 flex flex-col lg:ml-64">
      <TheNavbar />
      
      <main class="main-content flex-1 bg-gray-50">
        <div class="container-custom py-6">
          <slot></slot>
        </div>
      </main>
      
      <TheFooter />
    </div>
    
    <SessionTimer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import TheFooter from '@/components/TheFooter.vue'
import SessionTimer from '@/components/SessionTimer.vue'
import { useAuth } from '@/composables/useAuth'

const { resetSessionTimer } = useAuth()

let activityTimeout: NodeJS.Timeout | null = null

const handleActivity = () => {
  resetSessionTimer()
}

onMounted(() => {
  // Set up activity tracking
  document.addEventListener('click', handleActivity)
  document.addEventListener('keydown', handleActivity)
  document.addEventListener('mousemove', handleActivity)
  document.addEventListener('scroll', handleActivity)
})

onUnmounted(() => {
  // Clean up event listeners
  document.removeEventListener('click', handleActivity)
  document.removeEventListener('keydown', handleActivity)
  document.removeEventListener('mousemove', handleActivity)
  document.removeEventListener('scroll', handleActivity)
  
  if (activityTimeout) {
    clearTimeout(activityTimeout)
  }
})
</script>
