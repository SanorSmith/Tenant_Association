<template>
  <div class="default-layout h-screen flex flex-col overflow-hidden" @click="handleActivity" @keydown="handleActivity" @mousemove="handleActivity" @scroll="handleActivity">
    <div class="flex flex-1 overflow-hidden min-h-0">
      <TheSidebar />
      
      <div class="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        <TheDesktopNavbar />
        <TheNavbar />
        
        <main class="main-content flex-1 bg-gray-50 overflow-y-auto overflow-x-hidden">
          <div class="container-custom py-6">
            <slot></slot>
          </div>
        </main>
      </div>
    </div>
    
    <TheFooter class="w-full flex-shrink-0" />
    
    <SessionTimer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheDesktopNavbar from '@/components/TheDesktopNavbar.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import TheFooter from '@/components/TheFooter.vue'
import SessionTimer from '@/components/SessionTimer.vue'
import { useAuth } from '@/composables/useAuth'

const { resetSessionTimer } = useAuth()

let activityTimeout: NodeJS.Timeout | null = null

const handleActivity = () => {
  resetSessionTimer()
}

const updateFooterHeight = () => {
  nextTick(() => {
    const footer = document.querySelector('footer')
    if (footer) {
      const footerHeight = footer.offsetHeight
      document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`)
    }
  })
}

onMounted(() => {
  // Set up activity tracking
  document.addEventListener('click', handleActivity)
  document.addEventListener('keydown', handleActivity)
  document.addEventListener('mousemove', handleActivity)
  document.addEventListener('scroll', handleActivity)
  
  // Update footer height
  updateFooterHeight()
  window.addEventListener('resize', updateFooterHeight)
})

onUnmounted(() => {
  // Clean up event listeners
  document.removeEventListener('click', handleActivity)
  document.removeEventListener('keydown', handleActivity)
  document.removeEventListener('mousemove', handleActivity)
  document.removeEventListener('scroll', handleActivity)
  window.removeEventListener('resize', updateFooterHeight)
  
  if (activityTimeout) {
    clearTimeout(activityTimeout)
  }
})
</script>
