<template>
  <div class="empty-state flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="empty-state-icon mb-4">
      <slot name="icon">
        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </slot>
    </div>
    
    <h3 class="text-lg font-semibold text-navy mb-2">
      <slot name="title">{{ title }}</slot>
    </h3>
    
    <p class="text-textGray max-w-md mb-6">
      <slot name="description">{{ description }}</slot>
    </p>
    
    <div v-if="$slots.action || actionText" class="empty-state-action">
      <slot name="action">
        <BaseButton v-if="actionText" @click="handleAction">
          {{ actionText }}
        </BaseButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface Props {
  title?: string
  description?: string
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Ingen data tillgänglig',
  description: 'Det finns ingen information att visa just nu.'
})

const emit = defineEmits<{
  action: []
}>()

const handleAction = () => {
  emit('action')
}
</script>
