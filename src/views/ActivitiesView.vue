<template>
  <DefaultLayout>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-accent mb-2">Aktiviteter</h1>
        <p class="text-textGray">Planera och hantera föreningens aktiviteter och evenemang</p>
      </div>
      <BaseButton variant="primary" size="md" @click="showCreateModal = true" :loading="activitiesStore.isLoading">
        Skapa aktivitet
      </BaseButton>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <BaseCard padding="md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-textGray">Totalt aktiviteter</p>
            <p class="text-2xl font-bold text-navy">{{ activitiesStore.totalActivities }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span class="text-xl">📊</span>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard padding="md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-textGray">Kommande</p>
            <p class="text-2xl font-bold text-navy">{{ activitiesStore.upcomingActivities.length }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span class="text-xl">📅</span>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard padding="md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-textGray">Total deltagare</p>
            <p class="text-2xl font-bold text-navy">{{ activitiesStore.totalParticipants }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <span class="text-xl">👥</span>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard padding="md">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-textGray">Total budget</p>
            <p class="text-2xl font-bold text-navy">{{ formatCurrency(activitiesStore.totalBudget) }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <span class="text-xl">💰</span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-6 flex flex-wrap gap-2">
      <BaseButton 
        :variant="filter === 'all' ? 'primary' : 'outline'" 
        size="sm" 
        @click="filter = 'all'"
      >
        Alla ({{ activitiesStore.activities.length }})
      </BaseButton>
      <BaseButton 
        :variant="filter === 'upcoming' ? 'primary' : 'outline'" 
        size="sm" 
        @click="filter = 'upcoming'"
      >
        Kommande ({{ activitiesStore.upcomingActivities.length }})
      </BaseButton>
      <BaseButton 
        :variant="filter === 'planning' ? 'primary' : 'outline'" 
        size="sm" 
        @click="filter = 'planning'"
      >
        Planeras ({{ activitiesStore.planningActivities.length }})
      </BaseButton>
      <BaseButton 
        :variant="filter === 'past' ? 'primary' : 'outline'" 
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
        <div v-else class="w-full h-48 bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
          <span class="text-white text-4xl">{{ getActivityIcon(activity.type) }}</span>
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
              <span class="text-textGray">📅</span>
              <span>{{ formatDate(activity.date) }} {{ activity.startTime }}-{{ activity.endTime }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-textGray">📍</span>
              <span>{{ activity.location }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-textGray">�</span>
              <span>{{ activity.organizer }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-textGray">👥</span>
              <span>{{ activity.currentParticipants }} deltagare</span>
              <span v-if="activity.maxParticipants" class="text-textGray">
                (max {{ activity.maxParticipants }})
              </span>
            </div>
            <div v-if="activity.cost" class="flex items-center gap-2">
              <span class="text-textGray">💰</span>
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
        <span class="text-2xl">📋</span>
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

const getActivityIcon = (type: string) => {
  const icons: Record<string, string> = {
    social: '🎉',
    maintenance: '🔧',
    meeting: '🤝',
    celebration: '🎊',
    sports: '⚽',
    other: '📋'
  }
  return icons[type] || '📋'
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
