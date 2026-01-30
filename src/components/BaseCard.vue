<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header px-6 py-4 border-b border-gray-200">
      <slot name="header">
        <h3 class="text-lg font-semibold text-accent">{{ title }}</h3>
      </slot>
    </div>
    
    <div class="card-body" :class="bodyPadding">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer px-6 py-4 border-t border-gray-200 bg-gray-50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  padding: 'md',
  shadow: 'md'
})

const cardClasses = computed(() => {
  const base = 'bg-white rounded-lg border border-gray-200 max-w-full overflow-hidden'
  const hoverClass = props.hover ? 'hover:shadow-lg hover:border-primary-300 transition-all duration-200 cursor-pointer' : ''
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }
  
  return `${base} ${shadows[props.shadow]} ${hoverClass}`
})

const bodyPadding = computed(() => {
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return paddings[props.padding]
})
</script>
