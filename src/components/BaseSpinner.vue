<template>
  <div :class="containerClasses">
    <svg :class="spinnerClasses" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p v-if="message" :class="messageClasses">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'accent' | 'white' | 'gray'
  message?: string
  centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  centered: false
})

const containerClasses = computed(() => {
  const base = 'flex flex-col items-center gap-3'
  const centered = props.centered ? 'justify-center min-h-[200px]' : ''
  
  return `${base} ${centered}`
})

const spinnerClasses = computed(() => {
  const base = 'animate-spin'
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  
  const colors = {
    primary: 'text-primary',
    accent: 'text-accent',
    white: 'text-white',
    gray: 'text-gray-500'
  }
  
  return `${base} ${sizes[props.size]} ${colors[props.color]}`
})

const messageClasses = computed(() => {
  const base = 'text-sm font-medium'
  
  const colors = {
    primary: 'text-primary',
    accent: 'text-accent',
    white: 'text-white',
    gray: 'text-gray-600'
  }
  
  return `${base} ${colors[props.color]}`
})
</script>
