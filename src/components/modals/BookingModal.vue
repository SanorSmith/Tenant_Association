<template>
  <BaseModal v-model="isOpen" title="Boka lokal" size="md">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <p class="text-sm text-textGray mb-4">
        Skicka en bokningsförfrågan till styrelsen. De kommer att granska och godkänna din bokning.
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
        v-model="form.date"
        label="Datum"
        placeholder="YYYY-MM-DD"
        required
        :error="errors.date"
      />

      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          v-model="form.startTime"
          label="Starttid"
          placeholder="HH:MM"
          required
          :error="errors.startTime"
        />

        <BaseInput
          v-model="form.endTime"
          label="Sluttid"
          placeholder="HH:MM"
          required
          :error="errors.endTime"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-navy">
          Syfte med bokningen <span class="text-accent">*</span>
        </label>
        <textarea
          v-model="form.purpose"
          rows="4"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          placeholder="Beskriv vad du ska använda lokalen till..."
        ></textarea>
        <p v-if="errors.purpose" class="text-sm text-accent">
          {{ errors.purpose }}
        </p>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="secondary" @click="close">
        Avbryt
      </BaseButton>
      
      <BaseButton @click="handleSubmit" :loading="loading">
        Skicka förfrågan
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useBookingRequestsStore } from '@/stores/bookingRequests'

interface Props {
  modelValue: boolean
  associationId?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'submitted': []
}>()

const bookingRequestsStore = useBookingRequestsStore()
const loading = ref(false)
const isOpen = ref(props.modelValue)

const form = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  startTime: '',
  endTime: '',
  purpose: '',
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  startTime: '',
  endTime: '',
  purpose: '',
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
  errors.value.date = !form.value.date ? 'Datum krävs' : ''
  errors.value.startTime = !form.value.startTime ? 'Starttid krävs' : ''
  errors.value.endTime = !form.value.endTime ? 'Sluttid krävs' : ''
  errors.value.purpose = !form.value.purpose ? 'Syfte krävs' : ''
  
  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true

  const result = await bookingRequestsStore.submitBooking({
    associationId: props.associationId,
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    date: form.value.date,
    startTime: form.value.startTime,
    endTime: form.value.endTime,
    purpose: form.value.purpose,
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
