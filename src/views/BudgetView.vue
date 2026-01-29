<template>
  <DefaultLayout>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-accent mb-2">Budget 2024</h1>
        <p class="text-textGray">Ekonomisk översikt för föreningen</p>
      </div>
      <BaseButton variant="primary" size="md" @click="showBudgetPostModal = true">
        + Ny budgetpost
      </BaseButton>
    </div>

    <!-- Budget Overview Card -->
    <BaseCard padding="md" class="mb-6">
      <h3 class="text-lg font-semibold text-navy mb-4">Budgetöversikt</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <p class="text-sm text-textGray mb-2">Total budget</p>
          <p class="text-4xl font-bold text-accent">{{ formatCurrency(totalBudget) }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-textGray mb-2">Antal poster</p>
          <p class="text-4xl font-bold text-primary">{{ budgetPosts.length }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-textGray mb-2">Kategorier</p>
          <p class="text-4xl font-bold text-secondary">{{ uniqueCategories.length }}</p>
        </div>
      </div>
    </BaseCard>

    <!-- Budget Charts -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Budget per Category Bar Chart -->
      <BaseCard padding="md">
        <h3 class="text-lg font-semibold text-navy mb-4">Budget per kategori</h3>
        <div class="space-y-4">
          <div v-for="category in budgetByCategory" :key="category.name" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-navy font-medium">{{ category.name }}</span>
              <span class="text-navy font-semibold">{{ formatCurrency(category.amount) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-500"
                :style="{ 
                  width: `${(category.amount / maxCategoryAmount) * 100}%`,
                  backgroundColor: category.color 
                }"
              >
                <span class="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {{ Math.round((category.amount / totalBudget) * 100) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Distribution Donut Chart -->
      <BaseCard padding="md">
        <h3 class="text-lg font-semibold text-navy mb-4">Fördelning</h3>
        <div class="flex items-center justify-center">
          <div class="relative w-64 h-64">
            <svg viewBox="0 0 100 100" class="transform -rotate-90">
              <circle
                v-for="(segment, index) in donutSegments"
                :key="index"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                :stroke="segment.color"
                stroke-width="20"
                :stroke-dasharray="`${segment.percentage * 2.513} ${251.3 - segment.percentage * 2.513}`"
                :stroke-dashoffset="segment.offset"
                class="transition-all duration-500"
              />
            </svg>
          </div>
        </div>
        <div class="mt-4 space-y-2">
          <div v-for="category in budgetByCategory" :key="category.name" class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
              <span class="text-navy">{{ category.name }}</span>
            </div>
            <span class="text-navy font-semibold">{{ formatCurrency(category.amount) }}</span>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Budget Posts Table -->
    <BaseCard padding="md">
      <h3 class="text-lg font-semibold text-navy mb-4">Budgetposter</h3>
      
      <!-- Filters -->
      <div class="flex gap-4 mb-4">
        <select v-model="selectedCategory" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">Alla kategorier</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <select v-model="selectedYear" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <!-- Budget Posts Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-navy">Kategori</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-navy">Beskrivning</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-navy">Belopp</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-navy">Aktivitet</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-navy">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in filteredBudgetPosts" :key="post.id" class="border-b hover:bg-gray-50">
              <td class="px-4 py-3">
                <span 
                  class="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                  :style="{ backgroundColor: getCategoryColor(post.category) }"
                >
                  {{ post.category }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-navy">{{ post.description }}</td>
              <td class="px-4 py-3 text-right text-sm font-semibold" :class="post.amount >= 0 ? 'text-green-600' : 'text-accent'">
                {{ formatCurrency(post.amount) }}
              </td>
              <td class="px-4 py-3 text-center">
                <span v-if="post.activity" class="text-xs text-textGray">{{ post.activity }}</span>
                <span v-else class="text-xs text-gray-400">-</span>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button @click="editBudgetPost(post)" class="text-primary hover:text-accent">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="deleteBudgetPost(post.id)" class="text-red-500 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <!-- Budget Post Modal -->
    <BaseModal v-model="showBudgetPostModal" :title="editingPost ? 'Redigera budgetpost' : 'Ny budgetpost'" size="md">
      <form @submit.prevent="saveBudgetPost" class="space-y-4">
        <BaseInput
          v-model="budgetPostForm.category"
          label="Kategori"
          placeholder="T.ex. Administrativa kostnader"
          required
        />
        
        <BaseInput
          v-model="budgetPostForm.description"
          label="Beskrivning"
          placeholder="T.ex. Kontorsmaterial och pappersvaror"
          required
        />
        
        <BaseInput
          v-model="budgetPostForm.amount"
          type="number"
          label="Belopp (kr)"
          placeholder="0"
          required
        />
        
        <BaseInput
          v-model="budgetPostForm.activity"
          label="Kopplad aktivitet (valfritt)"
          placeholder="T.ex. Oktoberfest"
        />
      </form>
      
      <template #footer>
        <div class="flex gap-3">
          <BaseButton variant="secondary" @click="showBudgetPostModal = false">
            Avbryt
          </BaseButton>
          <BaseButton variant="primary" @click="saveBudgetPost">
            {{ editingPost ? 'Spara ändringar' : 'Skapa budgetpost' }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Activities Budget Section -->
    <BaseCard title="Aktiviteter & Evenemang" padding="md" class="mt-6">
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
import { ref, computed } from 'vue'
import { useActivitiesStore } from '@/stores/activities'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import type { ActivityData } from '@/stores/activities'

const activitiesStore = useActivitiesStore()

// Budget Posts State
interface BudgetPost {
  id: string
  category: string
  description: string
  amount: number
  activity?: string
  year: string
}

const budgetPosts = ref<BudgetPost[]>([
  { id: '1', category: 'Administrativa kostnader', description: 'Kontorsmaterial och pappersvaror', amount: 5000, year: '2024' },
  { id: '2', category: 'Administrativa kostnader', description: 'Sommarfest för medlemmar', amount: 15000, activity: 'Oktoberfest', year: '2024' },
  { id: '3', category: 'Aktiviteter', description: 'Städdag i området', amount: 8000, activity: 'Oktoberfest', year: '2024' },
  { id: '4', category: 'Aktiviteter', description: 'Städdag i området', amount: 3000, activity: 'Oktoberfest', year: '2024' },
  { id: '5', category: 'Lokaler', description: 'Hyra av föreningslokal', amount: 12000, year: '2024' },
])

const showBudgetPostModal = ref(false)
const editingPost = ref<BudgetPost | null>(null)
const selectedCategory = ref('')
const selectedYear = ref('2024')

const budgetPostForm = ref({
  category: '',
  description: '',
  amount: '',
  activity: ''
})

// Computed Properties
const totalBudget = computed(() => {
  return budgetPosts.value.reduce((sum, post) => sum + Math.abs(post.amount), 0)
})

const uniqueCategories = computed(() => {
  return [...new Set(budgetPosts.value.map(post => post.category))]
})

const filteredBudgetPosts = computed(() => {
  return budgetPosts.value.filter(post => {
    const categoryMatch = !selectedCategory.value || post.category === selectedCategory.value
    const yearMatch = post.year === selectedYear.value
    return categoryMatch && yearMatch
  })
})

// Category colors mapping - using app's blue color palette
const categoryColors: Record<string, string> = {
  'Administrativa kostnader': '#1e3a8a', // Deep blue (primary dark)
  'Aktiviteter': '#2563eb', // Bright blue (primary)
  'Lokaler': '#3b82f6', // Medium blue
  'Underhåll': '#60a5fa', // Light blue
  'Driftskostnader': '#93c5fd' // Very light blue
}

const budgetByCategory = computed(() => {
  const grouped: Record<string, number> = {}
  
  budgetPosts.value.forEach(post => {
    if (!grouped[post.category]) {
      grouped[post.category] = 0
    }
    grouped[post.category] += Math.abs(post.amount)
  })
  
  return Object.entries(grouped)
    .map(([name, amount]) => ({
      name,
      amount,
      color: categoryColors[name] || '#2C5F7C'
    }))
    .sort((a, b) => b.amount - a.amount)
})

const maxCategoryAmount = computed(() => {
  return Math.max(...budgetByCategory.value.map(cat => cat.amount))
})

const donutSegments = computed(() => {
  let offset = 0
  return budgetByCategory.value.map(category => {
    const percentage = (category.amount / totalBudget.value) * 100
    const segment = {
      color: category.color,
      percentage,
      offset: -offset
    }
    offset += percentage * 2.513
    return segment
  })
})

// Functions
const getCategoryColor = (category: string) => {
  return categoryColors[category] || '#2C5F7C'
}

const saveBudgetPost = () => {
  if (!budgetPostForm.value.category || !budgetPostForm.value.description || !budgetPostForm.value.amount) {
    return
  }

  if (editingPost.value) {
    // Update existing post
    const index = budgetPosts.value.findIndex(p => p.id === editingPost.value!.id)
    if (index !== -1) {
      budgetPosts.value[index] = {
        ...editingPost.value,
        category: budgetPostForm.value.category,
        description: budgetPostForm.value.description,
        amount: parseFloat(budgetPostForm.value.amount),
        activity: budgetPostForm.value.activity || undefined
      }
    }
  } else {
    // Create new post
    const newPost: BudgetPost = {
      id: Date.now().toString(),
      category: budgetPostForm.value.category,
      description: budgetPostForm.value.description,
      amount: parseFloat(budgetPostForm.value.amount),
      activity: budgetPostForm.value.activity || undefined,
      year: selectedYear.value
    }
    budgetPosts.value.push(newPost)
  }

  // Reset form
  budgetPostForm.value = {
    category: '',
    description: '',
    amount: '',
    activity: ''
  }
  editingPost.value = null
  showBudgetPostModal.value = false
}

const editBudgetPost = (post: BudgetPost) => {
  editingPost.value = post
  budgetPostForm.value = {
    category: post.category,
    description: post.description,
    amount: post.amount.toString(),
    activity: post.activity || ''
  }
  showBudgetPostModal.value = true
}

const deleteBudgetPost = (id: string) => {
  if (confirm('Är du säker på att du vill ta bort denna budgetpost?')) {
    budgetPosts.value = budgetPosts.value.filter(post => post.id !== id)
  }
}

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
