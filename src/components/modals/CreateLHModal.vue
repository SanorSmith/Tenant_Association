<template>
  <BaseModal v-model="isOpen" title="Ansök om att starta ny hyresgästförening" size="md">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <p class="text-sm text-textGray mb-4">
        Fyll i formuläret så kontaktar vi dig för att hjälpa dig komma igång med en lokal hyresgästförening i ditt område.
      </p>

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
        required
        :error="errors.phone"
      />

      <BaseInput
        v-model="form.area"
        label="Område/Stadsdel"
        required
        placeholder="T.ex. Gottsunda, Rosendal..."
        :error="errors.area"
      />

      <BaseInput
        v-model="form.postalCode"
        label="Postnummer"
        required
        placeholder="XXX XX"
        :error="errors.postalCode"
      />

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-navy">
          Beskriv ditt intresse <span class="text-accent">*</span>
        </label>
        <textarea
          v-model="form.description"
          rows="5"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          placeholder="Berätta varför du vill starta en förening och vad du hoppas uppnå..."
        ></textarea>
        <p v-if="errors.description" class="text-sm text-accent">
          {{ errors.description }}
        </p>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="secondary" @click="close">
        Avbryt
      </BaseButton>
      
      <BaseButton @click="handleSubmit" :loading="loading">
        Skicka ansökan
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useLHRequestsStore } from '@/stores/lhRequests'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'submitted': []
}>()

const lhRequestsStore = useLHRequestsStore()
const loading = ref(false)
const isOpen = ref(props.modelValue)

const form = ref({
  name: '',
  email: '',
  phone: '',
  area: '',
  postalCode: '',
  description: '',
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  area: '',
  postalCode: '',
  description: '',
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
  errors.value.phone = !form.value.phone ? 'Telefonnummer krävs' : ''
  errors.value.area = !form.value.area ? 'Område krävs' : ''
  errors.value.postalCode = !form.value.postalCode ? 'Postnummer krävs' : ''
  errors.value.description = !form.value.description ? 'Beskrivning krävs' : ''
  
  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true

  const result = await lhRequestsStore.submitRequest({
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    area: form.value.area,
    postalCode: form.value.postalCode,
    description: form.value.description,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  })

  loading.value = false
  
  if (result.success) {
    emit('submitted')
    resetForm()
  }
}

const resetForm = () => {
  Object.keys(form.value).forEach(key => form.value[key] = '')
  Object.keys(errors.value).forEach(key => errors.value[key] = '')
}

const close = () => {
  isOpen.value = false
  resetForm()
}
</script>
