<template>
  <BaseModal v-model="isOpen" :title="`Deltagare - ${activity?.title}`" size="lg">
    <div v-if="activity" class="space-y-6">
      <!-- Activity Summary -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="text-textGray">Datum:</span>
            <p class="font-semibold">{{ formatDate(activity.date) }}</p>
          </div>
          <div>
            <span class="text-textGray">Tid:</span>
            <p class="font-semibold">{{ activity.startTime }}-{{ activity.endTime }}</p>
          </div>
          <div>
            <span class="text-textGray">Plats:</span>
            <p class="font-semibold">{{ activity.location }}</p>
          </div>
          <div>
            <span class="text-textGray">Deltagare:</span>
            <p class="font-semibold">{{ activity.currentParticipants }}/{{ activity.maxParticipants || '∞' }}</p>
          </div>
        </div>
      </div>

      <!-- Add Participant Form -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold text-navy mb-4">Lägg till deltagare</h3>
        <form @submit.prevent="handleAddParticipant" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput
              v-model="participantForm.name"
              label="Namn"
              placeholder="Ange namn"
              required
              :error="participantErrors.name"
            />
            <BaseInput
              v-model="participantForm.email"
              label="E-post"
              type="email"
              placeholder="Ange e-post"
              required
              :error="participantErrors.email"
            />
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput
              v-model="participantForm.phone"
              label="Telefon"
              type="tel"
              placeholder="Ange telefonnummer"
              :error="participantErrors.phone"
            />
            <BaseInput
              v-model="participantForm.apartment"
              label="Lägenhet"
              placeholder="Ange lägenhetsnummer"
              :error="participantErrors.apartment"
            />
          </div>
          <BaseInput
            v-model="participantForm.notes"
            label="Anteckningar"
            placeholder="Övrig information om deltagaren"
          />
          <BaseButton type="submit" variant="primary" :loading="addingParticipant">
            Lägg till deltagare
          </BaseButton>
        </form>
      </div>

      <!-- Participants List -->
      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-navy">Registrerade deltagare ({{ activity.participants.length }})</h3>
          <div class="flex gap-2">
            <BaseButton
              variant="outline"
              size="sm"
              @click="filterStatus = 'all'"
              :class="{ 'bg-primary text-white': filterStatus === 'all' }"
            >
              Alla
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              @click="filterStatus = 'confirmed'"
              :class="{ 'bg-primary text-white': filterStatus === 'confirmed' }"
            >
              Bekräftade
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              @click="filterStatus = 'declined'"
              :class="{ 'bg-primary text-white': filterStatus === 'declined' }"
            >
              Avböjt
            </BaseButton>
          </div>
        </div>

        <div v-if="filteredParticipants.length === 0" class="text-center py-8 text-textGray">
          Inga deltagare hittades för detta filter.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="participant in filteredParticipants"
            :key="participant.id"
            class="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold text-navy">{{ participant.name }}</h4>
                  <BaseBadge :variant="getStatusVariant(participant.status)">
                    {{ getStatusText(participant.status) }}
                  </BaseBadge>
                </div>
                <div class="grid md:grid-cols-2 gap-2 text-sm text-textGray">
                  <div>📧 {{ participant.email }}</div>
                  <div v-if="participant.phone">📱 {{ participant.phone }}</div>
                  <div v-if="participant.apartment">🏠 {{ participant.apartment }}</div>
                  <div>📅 {{ formatDate(participant.registeredAt) }}</div>
                </div>
                <div v-if="participant.notes" class="mt-2 text-sm text-textGray">
                  <strong>Anteckningar:</strong> {{ participant.notes }}
                </div>
              </div>
              
              <div class="flex flex-col gap-2 ml-4">
                <select
                  v-model="participant.status"
                  @change="updateParticipantStatus(participant.id, participant.status)"
                  class="text-sm border rounded px-2 py-1"
                >
                  <option value="registered">Registrerad</option>
                  <option value="confirmed">Bekräftad</option>
                  <option value="declined">Avböjt</option>
                  <option value="attended">Närvarande</option>
                  <option value="no-show">Utebliven</option>
                </select>
                
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="removeParticipant(participant.id)"
                  class="text-red-600 hover:bg-red-50"
                >
                  Ta bort
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold text-navy mb-4">Statistik</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-navy">{{ activity.participants.length }}</div>
            <div class="text-sm text-textGray">Totalt</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ confirmedCount }}</div>
            <div class="text-sm text-textGray">Bekräftade</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-yellow-600">{{ registeredCount }}</div>
            <div class="text-sm text-textGray">Registrerade</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">{{ declinedCount }}</div>
            <div class="text-sm text-textGray">Avböjt</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ attendedCount }}</div>
            <div class="text-sm text-textGray">Närvarande</div>
          </div>
        </div>
      </div>
    </div>
    
    <template #footer>
      <BaseButton variant="secondary" @click="closeModal">
        Stäng
      </BaseButton>
      
      <BaseButton variant="primary" @click="sendReminders">
        Skicka påminnelser
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useActivitiesStore } from '@/stores/activities'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import type { ActivityData, ActivityParticipant } from '@/stores/activities'

interface Props {
  modelValue: boolean
  activity: ActivityData | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const activitiesStore = useActivitiesStore()

const isOpen = ref(props.modelValue)
const addingParticipant = ref(false)
const filterStatus = ref<'all' | 'registered' | 'confirmed' | 'declined' | 'attended' | 'no-show'>('all')

const participantForm = ref({
  name: '',
  email: '',
  phone: '',
  apartment: '',
  notes: ''
})

const participantErrors = ref({
  name: '',
  email: '',
  phone: '',
  apartment: ''
})

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
})

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

const filteredParticipants = computed(() => {
  if (!props.activity) return []
  
  if (filterStatus.value === 'all') {
    return props.activity.participants
  }
  
  return props.activity.participants.filter(p => p.status === filterStatus.value)
})

const confirmedCount = computed(() => 
  props.activity?.participants.filter(p => p.status === 'confirmed').length || 0
)

const registeredCount = computed(() => 
  props.activity?.participants.filter(p => p.status === 'registered').length || 0
)

const declinedCount = computed(() => 
  props.activity?.participants.filter(p => p.status === 'declined').length || 0
)

const attendedCount = computed(() => 
  props.activity?.participants.filter(p => p.status === 'attended').length || 0
)

const getStatusVariant = (status: string) => {
  const variants: Record<string, string> = {
    registered: 'info',
    confirmed: 'success',
    declined: 'danger',
    attended: 'success',
    'no-show': 'warning'
  }
  return variants[status] || 'info'
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    registered: 'Registrerad',
    confirmed: 'Bekräftad',
    declined: 'Avböjt',
    attended: 'Närvarande',
    'no-show': 'Utebliven'
  }
  return texts[status] || status
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const validateParticipant = () => {
  participantErrors.value = {
    name: !participantForm.value.name ? 'Namn krävs' : '',
    email: !participantForm.value.email ? 'E-post krävs' : '',
    phone: '',
    apartment: ''
  }
  
  return !Object.values(participantErrors.value).some(error => error)
}

const handleAddParticipant = async () => {
  if (!validateParticipant() || !props.activity) return

  addingParticipant.value = true

  const result = await activitiesStore.addParticipant(props.activity.id, {
    name: participantForm.value.name,
    email: participantForm.value.email,
    phone: participantForm.value.phone || undefined,
    apartment: participantForm.value.apartment || undefined,
    notes: participantForm.value.notes || undefined,
    status: 'registered'
  })

  addingParticipant.value = false
  
  if (result.success) {
    resetParticipantForm()
    alert('Deltagare tillagd! ✓')
  } else {
    alert(result.error || 'Kunde inte lägga till deltagare')
  }
}

const updateParticipantStatus = async (participantId: string, status: ActivityParticipant['status']) => {
  if (!props.activity) return
  
  const result = await activitiesStore.updateParticipantStatus(props.activity.id, participantId, status)
  if (!result.success) {
    alert('Kunde inte uppdatera status')
  }
}

const removeParticipant = async (participantId: string) => {
  if (!confirm('Är du säker på att du vill ta bort denna deltagare?')) return
  if (!props.activity) return
  
  const result = await activitiesStore.removeParticipant(props.activity.id, participantId)
  if (result.success) {
    alert('Deltagare borttagen! ✓')
  } else {
    alert('Kunde inte ta bort deltagare')
  }
}

const sendReminders = () => {
  if (!props.activity) return
  
  const confirmedParticipants = props.activity.participants.filter(p => p.status === 'confirmed')
  if (confirmedParticipants.length === 0) {
    alert('Det finns inga bekräftade deltagare att skicka påminnelser till.')
    return
  }
  
  alert(`Påminnelse skickad till ${confirmedParticipants.length} bekräftade deltagare! ✓\n\nI en riktig applikation skulle detta skicka SMS/e-post till alla deltagare.`)
}

const resetParticipantForm = () => {
  participantForm.value = {
    name: '',
    email: '',
    phone: '',
    apartment: '',
    notes: ''
  }
  participantErrors.value = {
    name: '',
    email: '',
    phone: '',
    apartment: ''
  }
}

const closeModal = () => {
  isOpen.value = false
  resetParticipantForm()
}
</script>
