<template>
  <BaseModal v-model="isOpen" title="Lämna förslag till styrelsen" size="md">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <BaseInput
        v-model="form.name"
        label="Ditt namn"
        required
        :error="errors.name"
      />

      <BaseInput
        v-model="form.email"
        label="E-post"
        type="email"
        required
        :error="errors.email"
      />

      <BaseInput
        v-model="form.phone"
        label="Telefonnummer"
        type="tel"
        :error="errors.phone"
      />

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-navy">
          Ditt förslag <span class="text-accent">*</span>
        </label>
        <textarea
          v-model="form.proposal"
          rows="6"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          placeholder="Beskriv ditt förslag..."
        ></textarea>
        <p v-if="errors.proposal" class="text-sm text-accent">
          {{ errors.proposal }}
        </p>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="close">
          Avbryt
        </BaseButton>
        
        <BaseButton type="submit" :loading="loading">
          Skicka förslag
        </BaseButton>
      </template>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  modelValue: boolean
  associationId?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'submitted': []
}>()

const loading = ref(false)
const isOpen = ref(props.modelValue)

const form = ref({
  name: '',
  email: '',
  phone: '',
  proposal: '',
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  proposal: '',
})

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
})

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

const validate = () => {
  errors.value.name = !form.value.name ? 'Namn krävs' : ''
  errors.value.email = !form.value.email ? 'E-post krävs' : ''
  errors.value.proposal = !form.value.proposal ? 'Förslag krävs' : ''
  
  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 1000))

  loading.value = false
  emit('submitted')
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    proposal: '',
  }
  errors.value = {
    name: '',
    email: '',
    phone: '',
    proposal: '',
  }
}

const close = () => {
  isOpen.value = false
  resetForm()
}
</script>
