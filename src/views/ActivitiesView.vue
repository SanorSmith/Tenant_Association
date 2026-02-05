<template>
  <DefaultLayout>
    <div class="mb-6">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold text-accent mb-2">Aktiviteter</h1>
          <p class="text-textGray">Planera och hantera föreningens aktiviteter och evenemang</p>
        </div>
        <BaseButton variant="primary" size="md" @click="showCreateModal = true" :loading="activitiesStore.isLoading" class="w-full sm:w-auto">
          Skapa aktivitet
        </BaseButton>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <BaseCard padding="md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-textGray">Totalt aktiviteter</p>
            <p class="text-2xl font-bold text-navy">{{ activitiesStore.totalActivities }}</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard padding="md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-textGray">Kommande</p>
            <p class="text-2xl font-bold text-navy">{{ activitiesStore.upcomingActivities.length }}</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard padding="md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-textGray">Total deltagare</p>
            <p class="text-2xl font-bold text-navy">{{ activitiesStore.totalParticipants }}</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard padding="md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-textGray">Total budget</p>
            <p class="text-2xl font-bold text-navy">{{ formatCurrency(activitiesStore.totalBudget) }}</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-6 flex flex-wrap gap-2">
      <BaseButton 
        :variant="filter === 'all' ? 'primary' : 'outline'" 
        :selected="filter === 'all'"
        size="sm" 
        @click="filter = 'all'"
      >
        Alla ({{ activitiesStore.activities.length }})
      </BaseButton>
      <BaseButton 
        :variant="filter === 'upcoming' ? 'primary' : 'outline'" 
        :selected="filter === 'upcoming'"
        size="sm" 
        @click="filter = 'upcoming'"
      >
        Kommande ({{ activitiesStore.upcomingActivities.length }})
      </BaseButton>
      <BaseButton 
        :variant="filter === 'planning' ? 'primary' : 'outline'" 
        :selected="filter === 'planning'"
        size="sm" 
        @click="filter = 'planning'"
      >
        Planeras ({{ activitiesStore.planningActivities.length }})
      </BaseButton>
      <BaseButton 
        :variant="filter === 'past' ? 'primary' : 'outline'" 
        :selected="filter === 'past'"
        size="sm" 
        @click="filter = 'past'"
      >
        Genomförda ({{ activitiesStore.pastActivities.length }})
      </BaseButton>
      
      <!-- Type Filters -->
      <div class="border-l border-gray-300 pl-2 ml-2">
        <BaseButton 
          :variant="filter === 'social' ? 'primary' : 'outline'" 
          size="sm" 
          @click="filter = 'social'"
        >
          Socialt
        </BaseButton>
        <BaseButton 
          :variant="filter === 'maintenance' ? 'primary' : 'outline'" 
          size="sm" 
          @click="filter = 'maintenance'"
        >
          Underhåll
        </BaseButton>
        <BaseButton 
          :variant="filter === 'celebration' ? 'primary' : 'outline'" 
          size="sm" 
          @click="filter = 'celebration'"
        >
          Firande
        </BaseButton>
      </div>
    </div>

    <!-- Activities Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard v-for="activity in filteredActivities" :key="activity.id" hover padding="none" class="overflow-hidden">
        <img 
          v-if="activity.image" 
          :src="activity.image" 
          :alt="activity.title" 
          class="w-full h-48 object-cover"
        />
        <div v-else class="w-full h-48 relative">
          <img :src="getActivityImage(activity.type)" :alt="activity.title" class="w-full h-48 object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-lg font-semibold text-navy">{{ activity.title }}</h3>
            <BaseBadge :variant="getStatusVariant(activity.status)">
              {{ getStatusText(activity.status) }}
            </BaseBadge>
          </div>
          
          <p class="text-sm text-textGray mb-3 line-clamp-2">{{ activity.description }}</p>
          
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(activity.date) }} {{ activity.startTime }}-{{ activity.endTime }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ activity.location }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ activity.organizer }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{{ activity.currentParticipants }} deltagare</span>
              <span v-if="activity.maxParticipants" class="text-textGray">
                (max {{ activity.maxParticipants }})
              </span>
            </div>
            <div v-if="activity.cost" class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ formatCurrency(activity.cost) }}</span>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t flex gap-2">
            <BaseButton variant="outline" size="sm" @click="viewActivityDetails(activity)">
              Detaljer
            </BaseButton>
            <BaseButton 
              v-if="activity.status === 'planning'" 
              variant="primary" 
              size="sm" 
              @click="scheduleActivity(activity)"
            >
              Schemalägg
            </BaseButton>
            <BaseButton 
              v-if="activity.status === 'scheduled'" 
              variant="success" 
              size="sm" 
              @click="manageParticipants(activity)"
            >
              Deltagare
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Empty State -->
    <div v-if="filteredActivities.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-navy mb-2">Inga aktiviteter hittades</h3>
      <p class="text-textGray mb-4">Det finns inga aktiviteter som matchar dina filter.</p>
      <BaseButton variant="primary" @click="showCreateModal = true">
        Skapa första aktiviteten
      </BaseButton>
    </div>

    <!-- Create Activity Modal -->
    <ActivityModal 
      v-model="showCreateModal" 
      @submitted="handleActivitySubmitted"
    />
    
    <!-- Participants Management Modal -->
    <ParticipantsModal 
      v-model="showParticipantsModal" 
      :activity="selectedActivity"
    />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useActivitiesStore } from '@/stores/activities'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import ActivityModal from '@/components/modals/ActivityModal.vue'
import ParticipantsModal from '@/components/modals/ParticipantsModal.vue'
import type { ActivityData } from '@/stores/activities'

const activitiesStore = useActivitiesStore()

const filter = ref('all')
const showCreateModal = ref(false)
const showParticipantsModal = ref(false)
const selectedActivity = ref<ActivityData | null>(null)

const filteredActivities = computed(() => {
  switch (filter.value) {
    case 'upcoming':
      return activitiesStore.upcomingActivities
    case 'planning':
      return activitiesStore.planningActivities
    case 'past':
      return activitiesStore.pastActivities
    case 'social':
    case 'maintenance':
    case 'celebration':
    case 'meeting':
    case 'sports':
    case 'other':
      return activitiesStore.activities.filter(a => a.type === filter.value)
    default:
      return activitiesStore.activities
  }
})

const getActivityImage = (type: string) => {
  const images: Record<string, string> = {
    social: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
    maintenance: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    meeting: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    celebration: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&h=300&fit=crop',
    sports: 'https://images.unsplash.com/photo-1461896836934-48f230077609?w=400&h=300&fit=crop',
    other: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop'
  }
  return images[type] || images.other
}

const getStatusVariant = (status: string) => {
  const variants: Record<string, string> = {
    planning: 'warning',
    scheduled: 'success',
    ongoing: 'info',
    completed: 'info',
    cancelled: 'danger'
  }
  return variants[status] || 'info'
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    planning: 'Planeras',
    scheduled: 'Schemalagd',
    ongoing: 'Pågår',
    completed: 'Genomförd',
    cancelled: 'Inställd'
  }
  return texts[status] || status
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK'
  }).format(amount)
}

const handleActivitySubmitted = () => {
  // Activity was created successfully
  // The store will automatically update the list
}

const viewActivityDetails = (activity: ActivityData) => {
  // TODO: Navigate to activity details page or show details modal
  alert(`Detaljer för ${activity.title}:\n\n${activity.description}\n\nPlats: ${activity.location}\nDatum: ${formatDate(activity.date)}\nDeltagare: ${activity.currentParticipants}/${activity.maxParticipants || '∞'}`)
}

const scheduleActivity = async (activity: ActivityData) => {
  const result = await activitiesStore.updateActivity(activity.id, { status: 'scheduled' })
  if (result.success) {
    alert('Aktiviteten är nu schemalagd! ✓')
  } else {
    alert('Kunde inte schemalägga aktiviteten.')
  }
}

const manageParticipants = (activity: ActivityData) => {
  selectedActivity.value = activity
  showParticipantsModal.value = true
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
