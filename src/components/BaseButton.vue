<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="animate-spin mr-2">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  selected: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: props.selected ? 'bg-[#ea580d] text-white border border-[#ea580d]' : 'border border-[#ea580d] text-[#ea580d] hover:bg-[#ea580d] hover:text-white active:bg-[#ea580d] active:text-white focus:ring-[#ea580d]',
    secondary: props.selected ? 'bg-[#ea580d] text-white border border-[#ea580d]' : 'border border-[#ea580d] text-[#ea580d] hover:bg-[#ea580d] hover:text-white active:bg-[#ea580d] active:text-white focus:ring-[#ea580d]',
    accent: props.selected ? 'bg-[#ea580d] text-white border border-[#ea580d]' : 'border border-[#ea580d] text-[#ea580d] hover:bg-[#ea580d] hover:text-white active:bg-[#ea580d] active:text-white focus:ring-[#ea580d]',
    outline: props.selected ? 'bg-[#ea580d] text-white border border-[#ea580d]' : 'border border-[#ea580d] text-[#ea580d] hover:bg-[#ea580d] hover:text-white active:bg-[#ea580d] active:text-white focus:ring-[#ea580d]'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]'
  }
  
  const width = props.fullWidth ? 'w-full' : ''
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${width}`
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
