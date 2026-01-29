<template>
  <DefaultLayout>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-accent mb-2">Lokaler</h1>
      <p class="text-textGray">Gemensamma utrymmen och faciliteter</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <BaseCard v-for="premise in premises" :key="premise.id" hover padding="md">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="text-2xl">{{ premise.icon }}</span>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-navy mb-2">{{ premise.name }}</h3>
            <p class="text-sm text-textGray mb-3">{{ premise.description }}</p>
            <div class="flex flex-wrap gap-2 mb-3">
              <BaseBadge v-for="amenity in premise.amenities" :key="amenity" variant="info" size="sm">{{ amenity }}</BaseBadge>
            </div>
            <BaseButton variant="primary" size="sm" @click="openBookingModal(premise)">Boka nu</BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Booking Modal -->
    <BaseModal v-model="showBookingModal" title="Boka lokal" size="md">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <p class="text-sm text-textGray mb-4">
          Skicka en bokningsförfrågan till styrelsen. De kommer att granska och godkänna din bokning.
        </p>

        <div class="mb-4 p-3 bg-blue-50 rounded-lg">
          <p class="text-sm font-semibold text-navy">Vald lokal: {{ selectedPremise?.name }}</p>
        </div>

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
          v-model="form.address"
          label="Adress"
          required
          :error="errors.address"
        />

        <BaseInput
          v-model="form.date"
          label="Datum"
          type="date"
          required
          :error="errors.date"
        />

        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="form.startTime"
            label="Starttid"
            type="time"
            required
            :error="errors.startTime"
          />

          <BaseInput
            v-model="form.endTime"
            label="Sluttid"
            type="time"
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
        <BaseButton variant="secondary" @click="closeModal">
          Avbryt
        </BaseButton>
        
        <BaseButton @click="handleSubmit" :loading="loading">
          Skicka förfrågan
        </BaseButton>
      </template>
    </BaseModal>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBookingsStore } from '@/stores/bookings'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'

const authStore = useAuthStore()
const bookingsStore = useBookingsStore()

const premises = [
  { id: 'premise-1', name: 'Festlokal', icon: '🎉', description: 'Stor lokal för fester och evenemang', amenities: ['Kök', 'Ljudsystem', '50 personer'] },
  { id: 'premise-2', name: 'Tvättstuga', icon: '🧺', description: 'Moderna tvättmaskiner och torktumlare', amenities: ['4 maskiner', 'Torkskåp', 'Mangel'] },
  { id: 'premise-3', name: 'Gym', icon: '💪', description: 'Välutrustat träningsutrymme', amenities: ['Löpband', 'Vikter', 'Yoga'] },
  { id: 'premise-4', name: 'Gästlägenhet', icon: '🏠', description: 'Lägenhet för besökande gäster', amenities: ['2 rum', 'Kök', 'Badrum'] }
]

const showBookingModal = ref(false)
const selectedPremise = ref<typeof premises[0] | null>(null)
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  date: '',
  startTime: '',
  endTime: '',
  purpose: '',
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  date: '',
  startTime: '',
  endTime: '',
  purpose: '',
})

const openBookingModal = (premise: typeof premises[0]) => {
  selectedPremise.value = premise
  
  // Pre-fill with user data if available
  const user = authStore.user
  if (user) {
    form.value.name = user.name || ''
    form.value.email = user.email || ''
    form.value.phone = user.phone || ''
  }
  
  showBookingModal.value = true
}

const validate = () => {
  errors.value.name = !form.value.name ? 'Namn krävs' : ''
  errors.value.email = !form.value.email ? 'E-post krävs' : ''
  errors.value.phone = !form.value.phone ? 'Telefonnummer krävs' : ''
  errors.value.address = !form.value.address ? 'Adress krävs' : ''
  errors.value.date = !form.value.date ? 'Datum krävs' : ''
  errors.value.startTime = !form.value.startTime ? 'Starttid krävs' : ''
  errors.value.endTime = !form.value.endTime ? 'Sluttid krävs' : ''
  errors.value.purpose = !form.value.purpose ? 'Syfte krävs' : ''
  
  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = async () => {
  if (!validate() || !selectedPremise.value) return

  loading.value = true

  const result = await bookingsStore.createBooking({
    premiseId: selectedPremise.value.id,
    premiseName: selectedPremise.value.name,
    associationId: authStore.user?.associationId || 'assoc-1',
    associationName: 'Solhöjden BRF',
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    address: form.value.address,
    date: form.value.date,
    startTime: form.value.startTime,
    endTime: form.value.endTime,
    purpose: form.value.purpose,
  })

  loading.value = false
  
  if (result.success) {
    alert('Bokningsförfrågan skickad! ✓\n\nStyrelsen kommer att granska din förfrågan.')
    closeModal()
  } else {
    alert('Kunde inte skicka förfrågan. Försök igen.')
  }
}

const closeModal = () => {
  showBookingModal.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
  }
  Object.keys(errors.value).forEach(key => {
    errors.value[key as keyof typeof errors.value] = ''
  })
}
</script>
