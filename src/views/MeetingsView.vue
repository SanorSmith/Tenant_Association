<template>
  <DefaultLayout>
    <div class="mb-6">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold text-accent mb-2">Möten</h1>
          <p class="text-textGray">Hantera och planera föreningsmöten</p>
        </div>
        <BaseButton variant="primary" size="md" @click="showCreateModal = true" :loading="loading" class="w-full sm:w-auto">
          Skapa nytt möte
        </BaseButton>
      </div>
    </div>

    <div class="mb-6 flex gap-4">
      <BaseButton :variant="filter === 'all' ? 'primary' : 'outline'" size="sm" @click="filter = 'all'">Alla</BaseButton>
      <BaseButton :variant="filter === 'upcoming' ? 'primary' : 'outline'" size="sm" @click="filter = 'upcoming'">Kommande</BaseButton>
      <BaseButton :variant="filter === 'past' ? 'primary' : 'outline'" size="sm" @click="filter = 'past'">Tidigare</BaseButton>
    </div>

    <div class="grid gap-4">
      <BaseCard v-for="meeting in filteredMeetings" :key="meeting.id" hover padding="md">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-navy mb-2">{{ meeting.title }}</h3>
            <p class="text-sm text-textGray mb-3">{{ meeting.description }}</p>
            <div class="flex flex-wrap gap-4 text-sm text-textGray">
              <span>📅 {{ meeting.date }} kl {{ meeting.time }}</span>
              <span>📍 {{ meeting.location }}</span>
              <span>👥 {{ meeting.attendees }} deltagare</span>
            </div>
          </div>
          <BaseBadge :variant="meeting.status === 'upcoming' ? 'success' : 'info'">{{ meeting.statusText }}</BaseBadge>
        </div>
      </BaseCard>
    </div>

    <!-- Create Meeting Modal -->
    <BaseModal v-model="showCreateModal" title="Skapa nytt möte" size="md">
      <div class="space-y-4">
        <BaseInput
          v-model="form.title"
          label="Mötets titel"
          placeholder="Ange titel för mötet"
          :error="errors.title"
          required
        />
        
        <BaseInput
          v-model="form.description"
          label="Beskrivning"
          placeholder="Beskriv mötets ämne och agenda"
          type="textarea"
          :error="errors.description"
          required
        />
        
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="form.date"
            label="Datum"
            type="date"
            :error="errors.date"
            required
          />
          
          <BaseInput
            v-model="form.time"
            label="Tid"
            type="time"
            :error="errors.time"
            required
          />
        </div>
        
        <BaseInput
          v-model="form.location"
          label="Plats"
          placeholder="Var ska mötet hållas?"
          :error="errors.location"
          required
        />
        
        <BaseInput
          v-model="form.maxAttendees"
          label="Max antal deltagare"
          type="number"
          min="1"
          placeholder="0 = obegränsat"
        />
      </div>
      
      <template #footer>
        <BaseButton variant="secondary" @click="closeModal">
          Avbryt
        </BaseButton>
        <BaseButton @click="handleCreateMeeting" :loading="loading">
          Skapa möte
        </BaseButton>
      </template>
    </BaseModal>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseModal from '@/components/BaseModal.vue'
import { useMeetings } from '@/composables/useMeetings'
import { useNotifications } from '@/composables/useNotifications'
import { useMeetingsStore } from '@/stores/meetings'

const { createMeeting, loading } = useMeetings()
const { success, error } = useNotifications()
const meetingsStore = useMeetingsStore()

const filter = ref('all')
const showCreateModal = ref(false)

// Form data
const form = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  maxAttendees: 0
})

// Form errors
const errors = ref<Record<string, string>>({})

// Initialize demo data if store is empty
if (meetingsStore.meetings.length === 0) {
  meetingsStore.addMeeting({
    id: 'meeting-1',
    title: 'Årsstämma 2024',
    description: 'Ordinarie årsstämma för bostadsrättsföreningen',
    date: '2024-05-22',
    time: '19:00',
    location: 'Föreningslokalen',
    type: 'board',
    status: 'upcoming',
    attendees: 45,
    maxAttendees: 100,
    agenda: [],
    documents: [],
    createdBy: 'demo-user',
    createdAt: new Date().toISOString()
  })
  
  meetingsStore.addMeeting({
    id: 'meeting-2',
    title: 'Styrelsemöte',
    description: 'Månatligt styrelsemöte',
    date: '2024-05-15',
    time: '18:00',
    location: 'Styrelserummet',
    type: 'board',
    status: 'upcoming',
    attendees: 7,
    maxAttendees: 15,
    agenda: [],
    documents: [],
    createdBy: 'demo-user',
    createdAt: new Date().toISOString()
  })
  
  meetingsStore.addMeeting({
    id: 'meeting-3',
    title: 'Extra möte',
    description: 'Diskussion om renoveringsprojekt',
    date: '2024-04-10',
    time: '19:00',
    location: 'Föreningslokalen',
    type: 'board',
    status: 'completed',
    attendees: 32,
    maxAttendees: 50,
    agenda: [],
    documents: [],
    createdBy: 'demo-user',
    createdAt: new Date().toISOString()
  })
}

const filteredMeetings = computed(() => {
  const meetings = meetingsStore.meetings.map(meeting => ({
    ...meeting,
    statusText: meeting.status === 'upcoming' ? 'Kommande' : meeting.status === 'completed' ? 'Genomfört' : meeting.status
  }))
  
  if (filter.value === 'all') return meetings
  return meetings.filter(m => m.status === filter.value)
})

// Form validation
const validateForm = () => {
  errors.value = {}
  
  if (!form.value.title.trim()) {
    errors.value.title = 'Titel är obligatoriskt'
  }
  
  if (!form.value.description.trim()) {
    errors.value.description = 'Beskrivning är obligatorisk'
  }
  
  if (!form.value.date) {
    errors.value.date = 'Datum är obligatoriskt'
  }
  
  if (!form.value.time) {
    errors.value.time = 'Tid är obligatorisk'
  }
  
  if (!form.value.location.trim()) {
    errors.value.location = 'Plats är obligatorisk'
  }
  
  return Object.keys(errors.value).length === 0
}

// Handle form submission
const handleCreateMeeting = async () => {
  if (!validateForm()) {
    error('Vänligen korrigera felen i formuläret')
    return
  }
  
  const result = await createMeeting({
    title: form.value.title,
    description: form.value.description,
    date: form.value.date,
    time: form.value.time,
    location: form.value.location,
    maxAttendees: form.value.maxAttendees
  })
  
  if (result.success) {
    success('Möte skapat successfully!')
    closeModal()
    // In a real app, you would refresh the meetings list from the store
    // For now, we'll just show the success message
  } else {
    error(result.error || 'Kunde inte skapa mötet')
  }
}

// Close modal and reset form
const closeModal = () => {
  showCreateModal.value = false
  form.value = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: 0
  }
  errors.value = {}
}
</script>
