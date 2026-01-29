<template>
  <BaseModal v-model="isOpen" title="Bli aktiv medlem" size="md">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <p class="text-sm text-textGray mb-4">
        Tack för att du vill engagera dig! Berätta hur du vill bidra till föreningen.
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

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-navy">
          Hur vill du vara aktiv? <span class="text-accent">*</span>
        </label>
        
        <div class="space-y-2">
          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="form.interests"
              value="events"
              class="mt-1 w-4 h-4"
            />
            <span class="text-sm">Hjälpa till vid evenemang och aktiviteter</span>
          </label>

          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="form.interests"
              value="communication"
              class="mt-1 w-4 h-4"
            />
            <span class="text-sm">Kommunikation och information</span>
          </label>

          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="form.interests"
              value="board"
              class="mt-1 w-4 h-4"
            />
            <span class="text-sm">Styrelsearbete</span>
          </label>

          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="form.interests"
              value="hosting"
              class="mt-1 w-4 h-4"
            />
            <span class="text-sm">Vara värd för aktiviteter</span>
          </label>

          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="form.interests"
              value="safety"
              class="mt-1 w-4 h-4"
            />
            <span class="text-sm">Trygghetsfrågor</span>
          </label>

          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="form.interests"
              value="other"
              class="mt-1 w-4 h-4"
            />
            <span class="text-sm">Annat</span>
          </label>
        </div>
        
        <p v-if="errors.interests" class="text-sm text-accent">
          {{ errors.interests }}
        </p>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-navy">
          Övriga kommentarer
        </label>
        <textarea
          v-model="form.message"
          rows="4"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          placeholder="Berätta mer om dig själv och dina idéer..."
        ></textarea>
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
import { useMembershipRequestsStore } from '@/stores/membershipRequests'

interface Props {
  modelValue: boolean
  associationId?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'submitted': []
}>()

const membershipRequestsStore = useMembershipRequestsStore()
const loading = ref(false)
const isOpen = ref(props.modelValue)

const form = ref({
  name: '',
  email: '',
  phone: '',
  interests: [] as string[],
  message: '',
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  interests: '',
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
  errors.value.interests = form.value.interests.length === 0 ? 'Välj minst ett alternativ' : ''
  
  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true

  const result = await membershipRequestsStore.submitRequest({
    associationId: props.associationId,
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    interests: form.value.interests,
    message: form.value.message,
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
  form.value = {
    name: '',
    email: '',
    phone: '',
    interests: [],
    message: '',
  }
  Object.keys(errors.value).forEach(key => errors.value[key] = '')
}

const close = () => {
  isOpen.value = false
  resetForm()
}
</script>
