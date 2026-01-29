<template>
  <DefaultLayout>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-accent mb-2">Budget</h1>
      <p class="text-textGray">Ekonomisk översikt för föreningen</p>
    </div>

    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <BaseCard padding="md">
        <p class="text-sm text-textGray mb-1">Totala intäkter</p>
        <p class="text-3xl font-bold text-green-600">+245 000 kr</p>
      </BaseCard>
      <BaseCard padding="md">
        <p class="text-sm text-textGray mb-1">Totala utgifter</p>
        <p class="text-3xl font-bold text-red-600">-189 000 kr</p>
      </BaseCard>
      <BaseCard padding="md">
        <p class="text-sm text-textGray mb-1">Saldo</p>
        <p class="text-3xl font-bold text-primary">+56 000 kr</p>
      </BaseCard>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <BaseCard title="Intäkter" padding="md">
        <div class="space-y-3">
          <div v-for="item in incomeItems" :key="item.id" class="flex justify-between items-center">
            <span class="text-sm text-navy">{{ item.category }}</span>
            <span class="text-sm font-semibold text-green-600">+{{ item.amount }} kr</span>
          </div>
        </div>
      </BaseCard>

      <BaseCard title="Utgifter" padding="md">
        <div class="space-y-3">
          <div v-for="item in expenseItems" :key="item.id" class="flex justify-between items-center">
            <span class="text-sm text-navy">{{ item.category }}</span>
            <span class="text-sm font-semibold text-red-600">-{{ item.amount }} kr</span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Activities Budget Section -->
    <BaseCard title="Aktiviteter & Evenemang" padding="md">
      <div class="mb-4">
        <p class="text-sm text-textGray mb-2">
          Total budget för aktiviteter: <span class="font-semibold text-navy">{{ formatCurrency(activitiesStore.totalBudget) }}</span>
        </p>
        <p class="text-sm text-textGray">
          Antal planerade aktiviteter: <span class="font-semibold text-navy">{{ activitiesStore.totalActivities }}</span>
        </p>
      </div>
      
      <div v-if="activitiesByBudgetCategory.length === 0" class="text-center py-8 text-textGray">
        Inga aktiviteter med budget kopplade.
      </div>
      
      <div v-else class="space-y-4">
        <div v-for="(activities, category) in activitiesByBudgetCategory" :key="category" class="border rounded-lg p-4">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-semibold text-navy">{{ getBudgetCategoryName(category) }}</h4>
            <span class="text-sm font-semibold text-red-600">
              -{{ formatCurrency(activities.reduce((sum, a) => sum + (a.cost || 0), 0)) }}
            </span>
          </div>
          
          <div class="space-y-2">
            <div v-for="activity in activities" :key="activity.id" class="flex justify-between items-center text-sm">
              <div class="flex-1">
                <span class="font-medium">{{ activity.title }}</span>
                <span class="text-textGray ml-2">{{ formatDate(activity.date) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <BaseBadge :variant="getStatusVariant(activity.status)" size="sm">
                  {{ getStatusText(activity.status) }}
                </BaseBadge>
                <span class="text-red-600 font-medium">
                  -{{ formatCurrency(activity.cost || 0) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useActivitiesStore } from '@/stores/activities'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import type { ActivityData } from '@/stores/activities'

const activitiesStore = useActivitiesStore()

const incomeItems = [
  { id: 1, category: 'Månadsavgifter', amount: '185 000' },
  { id: 2, category: 'Hyresintäkter', amount: '45 000' },
  { id: 3, category: 'Övriga intäkter', amount: '15 000' }
]

const expenseItems = [
  { id: 1, category: 'Underhåll', amount: '78 000' },
  { id: 2, category: 'El och värme', amount: '56 000' },
  { id: 3, category: 'Försäkringar', amount: '32 000' },
  { id: 4, category: 'Administration', amount: '23 000' }
]

// Activities with budget categories
const activitiesByBudgetCategory = computed(() => {
  const activitiesWithBudget = activitiesStore.activities.filter(a => a.budgetCategory && a.cost)
  const grouped: Record<string, ActivityData[]> = {}
  
  activitiesWithBudget.forEach(activity => {
    if (activity.budgetCategory) {
      if (!grouped[activity.budgetCategory]) {
        grouped[activity.budgetCategory] = []
      }
      grouped[activity.budgetCategory].push(activity)
    }
  })
  
  return grouped
})

const getBudgetCategoryName = (category: string) => {
  const names: Record<string, string> = {
    'sociala-aktiviteter': 'Sociala aktiviteter',
    'underhåll': 'Underhåll',
    'driftskostnader': 'Driftskostnader',
    'fastighetsunderhåll': 'Fastighetsunderhåll',
    'övrigt': 'Övrigt'
  }
  return names[category] || category
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK'
  }).format(amount)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>
