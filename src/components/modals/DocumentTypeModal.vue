<template>
  <BaseModal v-model="isOpen" title="Skapa nytt dokument" size="lg">
    <div class="space-y-6">
      <p class="text-textGray">Välj vilken typ av dokument du vill skapa</p>
      
      <div class="grid md:grid-cols-3 gap-4">
        <!-- Agenda Card -->
        <button
          @click="selectDocumentType('agenda')"
          class="group relative bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-200 text-left"
        >
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-navy mb-2">Dagordning</h3>
          <p class="text-sm text-textGray">Skapa en dagordning för ett möte</p>
        </button>

        <!-- Protocol Card -->
        <button
          @click="selectDocumentType('protocol')"
          class="group relative bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-200 text-left"
        >
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-navy mb-2">Protokoll</h3>
          <p class="text-sm text-textGray">Dokumentera ett genomfört möte</p>
        </button>

        <!-- Annual Report Card -->
        <button
          @click="selectDocumentType('annual-report')"
          class="group relative bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-200 text-left"
        >
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-navy mb-2">Årsrapport</h3>
          <p class="text-sm text-textGray">Sammanställ årets verksamhet</p>
        </button>
      </div>
    </div>
    
    <template #footer>
      <BaseButton variant="secondary" @click="closeModal">
        Avbryt
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'select': [type: 'agenda' | 'protocol' | 'annual-report']
}>()

const isOpen = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
})

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

const selectDocumentType = (type: 'agenda' | 'protocol' | 'annual-report') => {
  emit('select', type)
  closeModal()
}

const closeModal = () => {
  isOpen.value = false
}
</script>
