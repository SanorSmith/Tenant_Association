<template>
  <PublicLayout>
    <section class="hero bg-gradient-to-br from-primary-50 to-white py-20">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in">
            <h1 class="text-5xl md:text-6xl font-bold text-accent mb-6 leading-tight">
              Förenkla din föreningsförvaltning
            </h1>
            <p class="text-xl text-navy mb-8 leading-relaxed">
              Grannskapet är den kompletta plattformen för bostadsrättsföreningar. 
              Hantera möten, dokument, budget och aktiviteter på ett enkelt sätt.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <BaseButton variant="primary" size="lg" @click="scrollToSearch">
                Hitta din förening
              </BaseButton>
              <BaseButton variant="outline" size="lg" @click="router.push('/login')">
                Logga in
              </BaseButton>
            </div>
            <div class="mt-8 flex items-center gap-8 text-sm text-textGray">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>100+ föreningar</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>5000+ medlemmar</span>
              </div>
            </div>
          </div>
          <div class="hidden lg:block animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" 
              alt="Modern apartment building"
              class="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="py-20 bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-accent mb-4">Allt du behöver på ett ställe</h2>
          <p class="text-xl text-textGray max-w-2xl mx-auto">
            Kraftfulla verktyg för effektiv föreningsförvaltning
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <component :is="feature.icon" class="w-7 h-7 text-primary" />
            </div>
            <h3 class="text-xl font-semibold text-navy mb-3">{{ feature.title }}</h3>
            <p class="text-textGray leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="search" ref="searchSection" class="py-20 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-accent mb-4">Hitta din förening</h2>
          <p class="text-xl text-textGray">Sök bland våra anslutna bostadsrättsföreningar</p>
        </div>

        <div class="max-w-2xl mx-auto mb-12">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Sök på föreningsnamn, stad eller adress..."
              class="w-full px-6 py-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg"
            />
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div v-if="filteredAssociations.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="assoc in filteredAssociations" :key="assoc.id" class="association-card">
            <img :src="assoc.image" :alt="assoc.name" class="w-full h-48 object-cover rounded-t-xl" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-accent mb-2">{{ assoc.name }}</h3>
              <p class="text-sm text-textGray mb-4">{{ assoc.address }}, {{ assoc.city }}</p>
              <p class="text-sm text-navy mb-4 line-clamp-2">{{ assoc.description }}</p>
              <div class="flex items-center justify-between text-sm text-textGray mb-4">
                <span>{{ assoc.totalApartments }} lägenheter</span>
                <span>{{ assoc.totalMembers }} medlemmar</span>
              </div>
              <BaseButton variant="primary" size="sm" full-width @click="viewAssociation(assoc.id)">
                Visa mer
              </BaseButton>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <BaseEmptyState
            title="Inga föreningar hittades"
            description="Försök med en annan sökning"
          />
        </div>
      </div>
    </section>

    <section id="about" class="py-20 bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800" 
              alt="Team meeting"
              class="rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 class="text-4xl font-bold text-accent mb-6">Varför välja Grannskapet?</h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-navy mb-2">Användarvänligt</h3>
                  <p class="text-textGray">Intuitivt gränssnitt som alla kan använda, oavsett teknisk nivå.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-navy mb-2">Säkert</h3>
                  <p class="text-textGray">Dina data är skyddade med modern kryptering och säkerhetsåtgärder.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-navy mb-2">Snabbt</h3>
                  <p class="text-textGray">Optimerad prestanda för snabb åtkomst till all information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="py-20 bg-primary text-white">
      <div class="container-custom text-center">
        <h2 class="text-4xl font-bold mb-6">Redo att komma igång?</h2>
        <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Kontakta oss idag för att lära dig mer om hur Grannskapet kan hjälpa din förening.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton variant="accent" size="lg">
            Kontakta oss
          </BaseButton>
          <BaseButton variant="outline" size="lg" class="!text-white !border-white hover:!bg-white hover:!text-primary">
            Boka demo
          </BaseButton>
        </div>
      </div>
    </section>
  </PublicLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAssociationsStore } from '@/stores/associations'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseEmptyState from '@/components/BaseEmptyState.vue'

const router = useRouter()
const associationsStore = useAssociationsStore()

const searchQuery = ref('')
const searchSection = ref<HTMLElement | null>(null)

const CalendarIcon = () => h('svg', { class: 'w-7 h-7', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
])

const DocumentIcon = () => h('svg', { class: 'w-7 h-7', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
])

const ChartIcon = () => h('svg', { class: 'w-7 h-7', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
])

const ActivityIcon = () => h('svg', { class: 'w-7 h-7', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' })
])

const BuildingIcon = () => h('svg', { class: 'w-7 h-7', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
])

const BookingIcon = () => h('svg', { class: 'w-7 h-7', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' })
])

const features = [
  {
    title: 'Möteshantering',
    description: 'Planera, genomför och dokumentera föreningsmöten enkelt. Skicka kallelser och spara protokoll digitalt.',
    icon: CalendarIcon
  },
  {
    title: 'Dokumentarkiv',
    description: 'Säker lagring av alla viktiga dokument. Enkelt att söka, dela och organisera föreningens filer.',
    icon: DocumentIcon
  },
  {
    title: 'Budgetöversikt',
    description: 'Håll koll på ekonomin med tydliga rapporter och grafer. Följ upp intäkter och utgifter i realtid.',
    icon: ChartIcon
  },
  {
    title: 'Aktiviteter',
    description: 'Organisera sociala evenemang och aktiviteter. Öka gemenskapen och engagemanget i föreningen.',
    icon: ActivityIcon
  },
  {
    title: 'Lokalbokning',
    description: 'Boka gemensamma utrymmen som tvättstuga, gym och festlokal. Enkel översikt över tillgänglighet.',
    icon: BuildingIcon
  },
  {
    title: 'Bokningssystem',
    description: 'Smidigt system för att hantera alla bokningar. Automatiska påminnelser och bekräftelser.',
    icon: BookingIcon
  }
]

const filteredAssociations = computed(() => {
  if (!searchQuery.value) {
    return associationsStore.associations.slice(0, 6)
  }
  return associationsStore.searchAssociations(searchQuery.value).slice(0, 6)
})

const scrollToSearch = () => {
  searchSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const viewAssociation = (id: string) => {
  router.push({ name: 'association-detail', params: { id } })
}

onMounted(() => {
  associationsStore.initDemoData()
})
</script>

<style scoped>
.feature-card {
  @apply p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200;
}

.association-card {
  @apply bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
