<template>
  <DefaultLayout>
    <div class="dashboard-view">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-accent mb-2">Dashboard</h1>
        <p class="text-textGray">Välkommen tillbaka, {{ authStore.user?.name }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <BaseCard v-for="stat in stats" :key="stat.label" hover padding="md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-textGray mb-1">{{ stat.label }}</p>
              <p class="text-3xl font-bold text-navy">{{ stat.value }}</p>
              <p v-if="stat.change" :class="stat.changeClass" class="text-sm mt-1">
                {{ stat.change }}
              </p>
            </div>
            <div :class="stat.iconBg" class="w-12 h-12 rounded-lg flex items-center justify-center">
              <component :is="stat.icon" :class="stat.iconColor" class="w-6 h-6" />
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="grid lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2">
          <BaseCard title="Senaste aktiviteter" padding="none">
            <div class="divide-y divide-gray-200">
              <div v-for="activity in recentActivities" :key="activity.id" class="p-4 hover:bg-gray-50 transition-colors">
                <div class="flex items-start gap-4">
                  <div :class="activity.iconBg" class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <component :is="activity.icon" :class="activity.iconColor" class="w-5 h-5" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-navy">{{ activity.title }}</p>
                    <p class="text-sm text-textGray mt-1">{{ activity.description }}</p>
                    <p class="text-xs text-textGray mt-2">{{ activity.time }}</p>
                  </div>
                  <BaseBadge :variant="activity.badgeVariant" size="sm">
                    {{ activity.badge }}
                  </BaseBadge>
                </div>
              </div>
            </div>
            <div class="p-4 border-t border-gray-200 text-center">
              <button class="text-sm text-primary hover:text-primary-600 font-medium">
                Visa alla aktiviteter
              </button>
            </div>
          </BaseCard>
        </div>

        <div>
          <BaseCard title="Snabbåtgärder" padding="md">
            <div class="space-y-3">
              <BaseButton v-for="action in quickActions" :key="action.label" variant="outline" size="md" full-width @click="handleAction(action.route)">
                <component :is="action.icon" class="w-5 h-5 mr-2" />
                {{ action.label }}
              </BaseButton>
            </div>
          </BaseCard>

          <BaseCard title="Kommande möten" padding="md" class="mt-6">
            <div class="space-y-4">
              <div v-for="meeting in upcomingMeetings" :key="meeting.id" class="flex items-start gap-3">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span class="text-xs text-primary font-medium">{{ meeting.day }}</span>
                  <span class="text-lg font-bold text-primary">{{ meeting.date }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-navy truncate">{{ meeting.title }}</p>
                  <p class="text-xs text-textGray">{{ meeting.time }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
              <BaseButton variant="primary" size="sm" full-width @click="router.push('/meetings')">
                Visa alla möten
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <BaseCard title="Budgetöversikt" padding="md">
          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-textGray">Intäkter</span>
                <span class="text-lg font-semibold text-green-600">+245 000 kr</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-textGray">Utgifter</span>
                <span class="text-lg font-semibold text-red-600">-189 000 kr</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-red-500 h-2 rounded-full" style="width: 65%"></div>
              </div>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-navy">Saldo</span>
                <span class="text-xl font-bold text-primary">+56 000 kr</span>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <BaseButton variant="outline" size="sm" full-width @click="router.push('/budget')">
              Visa fullständig budget
            </BaseButton>
          </div>
        </BaseCard>

        <BaseCard title="Senaste dokument" padding="md">
          <div class="space-y-3">
            <div v-for="doc in recentDocuments" :key="doc.id" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-navy truncate">{{ doc.title }}</p>
                <p class="text-xs text-textGray">{{ doc.date }}</p>
              </div>
              <BaseBadge variant="info" size="sm">{{ doc.type }}</BaseBadge>
            </div>
          </div>
          <div class="mt-4">
            <BaseButton variant="outline" size="sm" full-width @click="router.push('/documents')">
              Visa alla dokument
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'

const router = useRouter()
const authStore = useAuthStore()

const UsersIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' })
])

const CalendarIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
])

const DocumentIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
])

const ActivityIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const PlusIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4v16m8-8H4' })
])

const stats = [
  { label: 'Totalt medlemmar', value: '112', change: '+5 denna månad', changeClass: 'text-green-600', icon: UsersIcon, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { label: 'Kommande möten', value: '3', change: '2 denna vecka', changeClass: 'text-primary', icon: CalendarIcon, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { label: 'Nya dokument', value: '8', change: '+3 denna vecka', changeClass: 'text-green-600', icon: DocumentIcon, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { label: 'Aktiva aktiviteter', value: '5', change: '2 pågående', changeClass: 'text-orange-600', icon: ActivityIcon, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' }
]

const recentActivities = [
  { id: 1, title: 'Nytt möte skapat', description: 'Årsstämma 2024 har schemalagts', time: 'För 2 timmar sedan', badge: 'Möte', badgeVariant: 'info', icon: CalendarIcon, iconBg: 'bg-primary-100', iconColor: 'text-primary' },
  { id: 2, title: 'Dokument uppladdat', description: 'Årsredovisning 2023.pdf', time: 'För 5 timmar sedan', badge: 'Dokument', badgeVariant: 'info', icon: DocumentIcon, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 3, title: 'Ny aktivitet', description: 'Grillkväll i augusti', time: 'Igår', badge: 'Aktivitet', badgeVariant: 'success', icon: ActivityIcon, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 4, title: 'Bokning bekräftad', description: 'Festlokal - 15 juni', time: 'För 2 dagar sedan', badge: 'Bokning', badgeVariant: 'warning', icon: CalendarIcon, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' }
]

const quickActions = [
  { label: 'Skapa möte', icon: PlusIcon, route: '/meetings' },
  { label: 'Ladda upp dokument', icon: PlusIcon, route: '/documents' },
  { label: 'Ny aktivitet', icon: PlusIcon, route: '/activities' },
  { label: 'Boka lokal', icon: PlusIcon, route: '/bookings' }
]

const upcomingMeetings = [
  { id: 1, title: 'Styrelsemöte', date: '15', day: 'MAJ', time: '18:00' },
  { id: 2, title: 'Årsstämma 2024', date: '22', day: 'MAJ', time: '19:00' },
  { id: 3, title: 'Extra möte', date: '05', day: 'JUN', time: '17:30' }
]

const recentDocuments = [
  { id: 1, title: 'Årsredovisning 2023', date: 'Idag', type: 'Rapport' },
  { id: 2, title: 'Protokoll styrelsemöte', date: 'Igår', type: 'Protokoll' },
  { id: 3, title: 'Budgetförslag 2024', date: '3 dagar sedan', type: 'Budget' },
  { id: 4, title: 'Ordningsregler', date: '1 vecka sedan', type: 'Policy' }
]

const handleAction = (route: string) => {
  router.push(route)
}
</script>
