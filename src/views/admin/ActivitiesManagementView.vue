<template>
  <AdminLayout>
    <div class="activities-management">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-accent mb-2">Aktiviteter</h1>
        <p class="text-textGray">Hantera och publicera föreningsaktiviteter</p>
      </div>

      <!-- Quick Actions -->
      <div class="mb-6 flex gap-4">
        <BaseButton variant="primary" @click="openCreateModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Skapa aktivitet
        </BaseButton>
        <BaseButton variant="secondary" @click="publishAllDrafts">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Publicera utkast
        </BaseButton>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6 flex gap-2">
        <BaseButton
          :variant="filter === 'all' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'all'"
        >
          Alla ({{ activities.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'published' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'published'"
        >
          Publicerade ({{ publishedActivities.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'draft' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'draft'"
        >
          Utkast ({{ draftActivities.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'past' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'past'"
        >
          Tidigare ({{ pastActivities.length }})
        </BaseButton>
      </div>

      <!-- Activities Grid -->
      <div class="grid gap-6">
        <BaseCard
          v-for="activity in filteredActivities"
          :key="activity.id"
          hover
          padding="none"
          class="overflow-hidden"
        >
          <!-- Activity Image -->
          <div v-if="activity.imageUrl" class="h-48 bg-gray-200">
            <img :src="activity.imageUrl" :alt="activity.title" class="w-full h-full object-cover" />
            <div class="absolute top-4 left-4">
              <BaseBadge :variant="getActivityStatusVariant(activity.status)">
                {{ getActivityStatusLabel(activity.status) }}
              </BaseBadge>
            </div>
            <div class="absolute top-4 right-4">
              <BaseBadge :variant="activity.visibility === 'public' ? 'success' : 'info'">
                {{ activity.visibility === 'public' ? 'Publik' : 'Intern' }}
              </BaseBadge>
            </div>
          </div>

          <!-- Activity Content -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-navy mb-2">{{ activity.title }}</h3>
                <p class="text-textGray mb-3">{{ activity.description }}</p>
                
                <div class="flex flex-wrap gap-4 text-sm text-textGray mb-4">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDate(activity.date) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ activity.time || 'Hela dagen' }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ activity.location || 'Föreningslokalen' }}
                  </span>
                </div>

                <!-- Registration Info -->
                <div v-if="activity.registrationOpen" class="flex items-center justify-between text-sm">
                  <span class="text-textGray">
                    {{ activity.currentParticipants || 0 }}/{{ activity.maxParticipants || '∞' }} anmälda
                  </span>
                  <div class="w-full bg-gray-200 rounded-full h-2 max-w-xs">
                    <div 
                      class="bg-primary h-2 rounded-full transition-all" 
                      :style="{ width: getRegistrationPercentage(activity) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-4 border-t border-gray-200">
              <BaseButton size="sm" variant="secondary" @click="editActivity(activity)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </BaseButton>
              
              <BaseButton 
                size="sm" 
                :variant="activity.visibility === 'public' ? 'success' : 'info'"
                @click="toggleVisibility(activity)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {{ activity.visibility === 'public' ? 'Publik' : 'Intern' }}
              </BaseButton>

              <BaseButton 
                size="sm" 
                :variant="activity.status === 'published' ? 'success' : 'warning'"
                @click="togglePublishStatus(activity)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ activity.status === 'published' ? 'Publicerad' : 'Utkast' }}
              </BaseButton>

              <BaseButton size="sm" variant="outline" @click="deleteActivity(activity)">
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
        v-if="filteredActivities.length === 0"
        title="Inga aktiviteter hittades"
        description="Skapa din första aktivitet för att komma igång."
      />
    </div>

    <!-- Create/Edit Activity Modal -->
    <BaseModal
      v-model="isModalOpen"
      :title="isEditing ? 'Redigera aktivitet' : 'Skapa ny aktivitet'"
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
            placeholder="Föreningslokalen"
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
            :error="errors.time"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-navy mb-2">Beskrivning</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="Beskriv aktiviteten..."
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-navy mb-2">Visibilitet</label>
            <select v-model="form.visibility" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10">
              <option value="public">Publik - Synlig för alla</option>
              <option value="private">Intern - Bara för medlemmar</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-navy mb-2">Status</label>
            <select v-model="form.status" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10">
              <option value="draft">Utkast</option>
              <option value="published">Publicerad</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-navy mb-2">Max deltagare</label>
            <BaseInput
              v-model="form.maxParticipants"
              placeholder="Obegränsat"
              type="number"
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="form.registrationOpen"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span class="text-sm font-medium text-navy">Öppna för anmälan</span>
          </label>
        </div>

        <template #footer>
          <BaseButton variant="secondary" @click="closeModal">
            Avbryt
          </BaseButton>
          <BaseButton type="submit" :loading="loading">
            {{ isEditing ? 'Spara ändringar' : 'Skapa aktivitet' }}
          </BaseButton>
        </template>
      </form>
    </BaseModal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseEmptyState from '@/components/BaseEmptyState.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useActivities } from '@/composables/useActivities'
import { useNotifications } from '@/composables/useNotifications'

const { getActivities, createActivity, updateActivity, deleteActivity, loading } = useActivities()
const { success, error } = useNotifications()

const filter = ref('all')
const isModalOpen = ref(false)
const isEditing = ref(false)

const form = ref({
  id: '',
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  visibility: 'public' as 'public' | 'private',
  status: 'draft' as 'draft' | 'published',
  maxParticipants: '',
  registrationOpen: false,
  imageUrl: '',
  currentParticipants: 0
})

const errors = ref<any>({})

// Mock activities data
const activities = ref([
  {
    id: '1',
    title: 'Sommargrill i parken',
    description: 'Välkommen på gemensam grillkväll! Vi bjuder på korv och dryck.',
    date: '2024-06-15',
    time: '18:00',
    location: 'Föreningsparken',
    visibility: 'public' as const,
    status: 'published' as const,
    maxParticipants: 50,
    currentParticipants: 12,
    registrationOpen: true,
    imageUrl: '/api/placeholder/400/200'
  },
  {
    id: '2',
    title: 'Styrelsemöte',
    description: 'Ordinarie styrelsemöte för att diskutera kommande verksamhet.',
    date: '2024-05-20',
    time: '19:00',
    location: 'Styrelserummet',
    visibility: 'private' as const,
    status: 'published' as const,
    maxParticipants: 10,
    currentParticipants: 7,
    registrationOpen: false,
    imageUrl: '/api/placeholder/400/200'
  },
  {
    id: '3',
    title: 'Julmarknad',
    description: 'Traditionell julmarknad med lotteri och fika.',
    date: '2024-12-01',
    time: '11:00',
    location: 'Föreningslokalen',
    visibility: 'public' as const,
    status: 'draft' as const,
    maxParticipants: 100,
    currentParticipants: 0,
    registrationOpen: true,
    imageUrl: '/api/placeholder/400/200'
  }
])

const publishedActivities = computed(() => 
  activities.value.filter(a => a.status === 'published')
)

const draftActivities = computed(() => 
  activities.value.filter(a => a.status === 'draft')
)

const pastActivities = computed(() => 
  activities.value.filter(a => new Date(a.date) < new Date())
)

const filteredActivities = computed(() => {
  switch (filter.value) {
    case 'published':
      return publishedActivities.value
    case 'draft':
      return draftActivities.value
    case 'past':
      return pastActivities.value
    default:
      return activities.value
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
    visibility: 'public',
    status: 'draft',
    maxParticipants: '',
    registrationOpen: false,
    imageUrl: '',
    currentParticipants: 0
  }
  errors.value = {}
  isModalOpen.value = true
}

const editActivity = (activity: any) => {
  isEditing.value = true
  form.value = { ...activity }
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
    visibility: 'public',
    status: 'draft',
    maxParticipants: '',
    registrationOpen: false,
    imageUrl: '',
    currentParticipants: 0
  }
  errors.value = {}
}

const validate = () => {
  errors.value = {}
  
  if (!form.value.title) errors.value.title = 'Titel krävs'
  if (!form.value.description) errors.value.description = 'Beskrivning krävs'
  if (!form.value.date) errors.value.date = 'Datum krävs'
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  try {
    if (isEditing.value) {
      await updateActivity(form.value.id, form.value)
      success('Aktivitet uppdaterad!')
    } else {
      const result = await createActivity(form.value)
      if (result.success) {
        success('Aktivitet skapad!')
      }
    }
    closeModal()
  } catch (err) {
    error('Kunde inte spara aktiviteten')
  }
}

const toggleVisibility = async (activity: any) => {
  const newVisibility = activity.visibility === 'public' ? 'private' : 'public'
  await updateActivity(activity.id, { visibility: newVisibility })
  activity.visibility = newVisibility
  success(`Aktivitet är nu ${newVisibility === 'public' ? 'publik' : 'intern'}!`)
}

const togglePublishStatus = async (activity: any) => {
  const newStatus = activity.status === 'published' ? 'draft' : 'published'
  await updateActivity(activity.id, { status: newStatus })
  activity.status = newStatus
  success(`Aktivitet är nu ${newStatus === 'published' ? 'publicerad' : 'utkast'}!`)
}

const deleteActivity = async (activity: any) => {
  try {
    await deleteActivity(activity.id)
    success('Aktivitet borttagen!')
  } catch (err) {
    error('Kunde inte ta bort aktiviteten')
  }
}

const publishAllDrafts = () => {
  const drafts = draftActivities.value
  if (drafts.length === 0) {
    error('Inga utkast att publicera')
    return
  }
  
  drafts.forEach(activity => {
    updateActivity(activity.id, { status: 'published' })
    activity.status = 'published'
  })
  
  success(`${drafts.length} aktiviteter publicerade!`)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getRegistrationPercentage = (activity: any) => {
  if (!activity.maxParticipants) return 0
  return Math.min((activity.currentParticipants / activity.maxParticipants) * 100, 100)
}

const getActivityStatusVariant = (status: string) => {
  const variants: Record<string, any> = {
    published: 'success',
    draft: 'warning',
    cancelled: 'danger'
  }
  return variants[status] || 'info'
}

const getActivityStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: 'Publicerad',
    draft: 'Utkast',
    cancelled: 'Inställd'
  }
  return labels[status] || status
}
</script>
