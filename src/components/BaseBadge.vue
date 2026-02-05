<template>
  <span :class="badgeClasses">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  rounded: false
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center font-medium'
  
  const variants = {
    primary: 'bg-[#ea580d]/10 text-[#ea580d]',
    success: 'bg-gray-100 text-gray-600',
    warning: 'bg-gray-100 text-gray-600',
    danger: 'bg-[#ea580d]/10 text-[#ea580d]',
    info: 'bg-gray-100 text-gray-600'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  }
  
  const roundedClass = props.rounded ? 'rounded-full' : 'rounded'
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${roundedClass}`
})
</script>
