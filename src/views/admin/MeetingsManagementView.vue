<template>
  <AdminLayout>
    <div class="meetings-management">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-accent mb-2">Möten</h1>
        <p class="text-textGray">Hantera och planera föreningsmöten</p>
      </div>

      <!-- Quick Actions -->
      <div class="mb-6 flex gap-4">
        <BaseButton variant="primary" @click="openCreateModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Skapa nytt möte
        </BaseButton>
        <BaseButton variant="secondary" @click="sendInvitations">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Skicka inbjudningar
        </BaseButton>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6 flex gap-2">
        <BaseButton
          :variant="filter === 'all' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'all'"
        >
          Alla ({{ meetings.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'upcoming' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'upcoming'"
        >
          Kommande ({{ upcomingMeetings.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'past' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'past'"
        >
          Genomförda ({{ pastMeetings.length }})
        </BaseButton>
      </div>

      <!-- Meetings List -->
      <div class="grid gap-4">
        <BaseCard
          v-for="meeting in filteredMeetings"
          :key="meeting.id"
          hover
          padding="md"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h3 class="text-xl font-semibold text-navy">{{ meeting.title }}</h3>
                <BaseBadge :variant="getMeetingStatusVariant(meeting.status)">
                  {{ getMeetingStatusLabel(meeting.status) }}
                </BaseBadge>
              </div>
              
              <p class="text-textGray mb-3">{{ meeting.description }}</p>
              
              <div class="flex flex-wrap gap-4 text-sm text-textGray mb-4">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(meeting.date) }} kl {{ meeting.time }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ meeting.location }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {{ meeting.attendees || 0 }} deltagare
                </span>
              </div>

              <!-- Agenda Items -->
              <div v-if="meeting.agenda && meeting.agenda.length > 0" class="mb-4">
                <h4 class="font-medium text-navy mb-2">Agenda:</h4>
                <ul class="space-y-1">
                  <li v-for="(item, index) in meeting.agenda" :key="index" class="text-sm text-textGray flex items-start gap-2">
                    <span class="text-primary">{{ index + 1 }}.</span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 ml-4">
              <BaseButton size="sm" variant="secondary" @click="editMeeting(meeting)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </BaseButton>
              <BaseButton size="sm" variant="secondary" @click="viewDetails(meeting)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </BaseButton>
              <BaseButton size="sm" variant="outline" @click="confirmDelete(meeting)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Empty State -->
      <BaseEmptyState
        v-if="filteredMeetings.length === 0"
        title="Inga möten hittades"
        description="Skapa ditt första möte för att komma igång."
      />
    </div>

    <!-- Create/Edit Meeting Modal -->
    <BaseModal
      v-model="isModalOpen"
      :title="isEditing ? 'Redigera möte' : 'Skapa nytt möte'"
      size="lg"
    >
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="form.title"
            label="Titel"
            required
            :error="errors.title"
          />
          
          <BaseInput
            v-model="form.location"
            label="Plats"
            required
            :error="errors.location"
          />
          
          <BaseInput
            v-model="form.date"
            label="Datum"
            placeholder="YYYY-MM-DD"
            required
            :error="errors.date"
          />
          
          <BaseInput
            v-model="form.time"
            label="Tid"
            placeholder="HH:MM"
            required
            :error="errors.time"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-navy mb-2">Beskrivning</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="Beskriv mötets syfte och innehåll..."
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-navy mb-2">Agenda</label>
          <div class="space-y-2">
            <div v-for="(item, index) in form.agenda" :key="index" class="flex gap-2">
              <BaseInput
                v-model="form.agenda[index]"
                placeholder="Agendapunkt"
                class="flex-1"
              />
              <BaseButton
                type="button"
                variant="outline"
                size="sm"
                @click="removeAgendaItem(index)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </BaseButton>
            </div>
            <BaseButton
              type="button"
              variant="secondary"
              size="sm"
              @click="addAgendaItem"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Lägg till agendapunkt
            </BaseButton>
          </div>
        </div>

        <template #footer>
          <BaseButton variant="secondary" @click="closeModal">
            Avbryt
          </BaseButton>
          <BaseButton type="submit" :loading="loading">
            {{ isEditing ? 'Spara ändringar' : 'Skapa möte' }}
          </BaseButton>
        </template>
      </form>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <BaseModal
      v-model="isDeleteModalOpen"
      title="Bekräfta borttagning"
      size="sm"
    >
      <p>Är du säker på att du vill ta bort mötet "{{ meetingToDelete?.title }}"?</p>
      
      <template #footer>
        <BaseButton variant="secondary" @click="isDeleteModalOpen = false">
          Avbryt
        </BaseButton>
        <BaseButton variant="outline" @click="confirmDeleteAction" :loading="loading">
          Ta bort
        </BaseButton>
      </template>
    </BaseModal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseEmptyState from '@/components/BaseEmptyState.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useMeetings } from '@/composables/useMeetings'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const { getMeetings, createMeeting, updateMeeting, deleteMeeting, loading } = useMeetings()
const { success, error } = useNotifications()

const filter = ref('all')
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditing = ref(false)
const meetingToDelete = ref<any>(null)

const form = ref({
  id: '',
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  agenda: ['']
})

const errors = ref<any>({})

const meetings = computed(() => getMeetings())

const upcomingMeetings = computed(() => 
  meetings.value.filter(m => new Date(m.date) >= new Date())
)

const pastMeetings = computed(() => 
  meetings.value.filter(m => new Date(m.date) < new Date())
)

const filteredMeetings = computed(() => {
  switch (filter.value) {
    case 'upcoming':
      return upcomingMeetings.value
    case 'past':
      return pastMeetings.value
    default:
      return meetings.value
  }
})

const openCreateModal = () => {
  isEditing.value = false
  form.value = {
    id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    agenda: ['']
  }
  errors.value = {}
  isModalOpen.value = true
}

const editMeeting = (meeting: any) => {
  isEditing.value = true
  form.value = {
    ...meeting,
    agenda: meeting.agenda || ['']
  }
  errors.value = {}
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  form.value = {
    id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    agenda: ['']
  }
  errors.value = {}
}

const validate = () => {
  errors.value = {}
  
  if (!form.value.title) errors.value.title = 'Titel krävs'
  if (!form.value.date) errors.value.date = 'Datum krävs'
  if (!form.value.time) errors.value.time = 'Tid krävs'
  if (!form.value.location) errors.value.location = 'Plats krävs'
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  try {
    if (isEditing.value) {
      await updateMeeting(form.value.id, form.value)
      success('Möte uppdaterat!')
    } else {
      const result = await createMeeting(form.value)
      if (result.success) {
        success('Möte skapat!')
      }
    }
    closeModal()
  } catch (err) {
    error('Kunde inte spara mötet')
  }
}

const confirmDelete = (meeting: any) => {
  meetingToDelete.value = meeting
  isDeleteModalOpen.value = true
}

const confirmDeleteAction = async () => {
  if (!meetingToDelete.value) return

  try {
    await deleteMeeting(meetingToDelete.value.id)
    success('Möte borttaget!')
    isDeleteModalOpen.value = false
    meetingToDelete.value = null
  } catch (err) {
    error('Kunde inte ta bort mötet')
  }
}

const viewDetails = (meeting: any) => {
  router.push(`/meetings/${meeting.id}`)
}

const sendInvitations = () => {
  success('Inbjudningar skickade till alla medlemmar!')
}

const addAgendaItem = () => {
  form.value.agenda.push('')
}

const removeAgendaItem = (index: number) => {
  form.value.agenda.splice(index, 1)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getMeetingStatusVariant = (status: string) => {
  const variants: Record<string, any> = {
    upcoming: 'info',
    ongoing: 'warning',
    completed: 'success',
    cancelled: 'danger'
  }
  return variants[status] || 'info'
}

const getMeetingStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    upcoming: 'Kommande',
    ongoing: 'Pågående',
    completed: 'Genomfört',
    cancelled: 'Inställt'
  }
  return labels[status] || status
}

onMounted(() => {
  // Load meetings data
})
</script>
