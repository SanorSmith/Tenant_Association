<template>
  <div v-if="showTimer && remainingSessionTime > 0" class="fixed bottom-4 right-4 z-50">
    <div 
      class="bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[200px]"
      :class="{ 'bg-yellow-50 border-yellow-300': remainingSessionTime < 120000 }"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <svg 
            class="w-5 h-5" 
            :class="timerColor"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-medium" :class="textColor">
            Session: {{ formattedTime }}
          </span>
        </div>
        <button
          @click="extendSession"
          class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
        >
          Förläng
        </button>
      </div>
      
      <div v-if="remainingSessionTime < 120000" class="mt-2 text-xs text-yellow-700">
        <p>Sessionen löper ut snart!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { remainingSessionTime, resetSessionTimer, formatRemainingTime } = useAuth()

const showTimer = ref(false)
const updateInterval = ref<NodeJS.Timeout | null>(null)

const formattedTime = computed(() => {
  return formatRemainingTime(remainingSessionTime.value)
})

const timerColor = computed(() => {
  if (remainingSessionTime.value < 60000) return 'text-red-500'
  if (remainingSessionTime.value < 120000) return 'text-yellow-500'
  return 'text-gray-500'
})

const textColor = computed(() => {
  if (remainingSessionTime.value < 60000) return 'text-red-700'
  if (remainingSessionTime.value < 120000) return 'text-yellow-700'
  return 'text-gray-700'
})

const extendSession = () => {
  resetSessionTimer()
  showTimer.value = false
}

onMounted(() => {
  // Show timer when less than 5 minutes remaining
  updateInterval.value = setInterval(() => {
    if (remainingSessionTime.value > 0 && remainingSessionTime.value < 300000) {
      showTimer.value = true
    } else {
      showTimer.value = false
    }
  }, 1000)
})

onUnmounted(() => {
  if (updateInterval.value) {
    clearInterval(updateInterval.value)
  }
})
</script>
