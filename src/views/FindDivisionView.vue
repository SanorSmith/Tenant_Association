<template>
  <PublicLayout>
    <section class="py-16 md:py-24 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12 md:mb-16">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Hitta din <span class="text-cta">avdelning</span>
          </h1>
          <p class="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto">
            Sök bland våra lokala avdelningar i hela Sverige
          </p>
        </div>

        <div class="max-w-2xl mx-auto mb-12">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Sök på stad, kommun eller postnummer..."
              class="w-full px-6 py-4 pr-12 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-lg"
            />
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div v-if="filteredDivisions.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div v-for="division in filteredDivisions" :key="division.id" class="division-card">
            <div class="flex items-start gap-3 mb-4">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-text-primary mb-1">{{ division.name }}</h3>
                <p class="text-sm text-text-muted">{{ division.region }}</p>
              </div>
            </div>
            <div class="space-y-2 text-sm text-text-secondary mb-4">
              <p class="flex items-center gap-2">
                <svg class="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ division.email }}
              </p>
              <p class="flex items-center gap-2">
                <svg class="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {{ division.phone }}
              </p>
            </div>
            <BaseButton variant="outline" size="sm" full-width>
              Kontakta avdelning
            </BaseButton>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-text-muted text-lg">Inga avdelningar hittades. Försök med en annan sökning.</p>
        </div>
      </div>
    </section>
  </PublicLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseButton from '@/components/BaseButton.vue'

const searchQuery = ref('')

const divisions = [
  {
    id: '1',
    name: 'Stockholm Centrum',
    region: 'Stockholm',
    email: 'stockholm.centrum@hyresgastforeningen.se',
    phone: '08-791 01 00'
  },
  {
    id: '2',
    name: 'Göteborg Väst',
    region: 'Västra Götaland',
    email: 'goteborg.vast@hyresgastforeningen.se',
    phone: '031-123 45 67'
  },
  {
    id: '3',
    name: 'Malmö Södra',
    region: 'Skåne',
    email: 'malmo.sodra@hyresgastforeningen.se',
    phone: '040-123 45 67'
  },
  {
    id: '4',
    name: 'Uppsala',
    region: 'Uppsala län',
    email: 'uppsala@hyresgastforeningen.se',
    phone: '018-123 45 67'
  },
  {
    id: '5',
    name: 'Linköping',
    region: 'Östergötland',
    email: 'linkoping@hyresgastforeningen.se',
    phone: '013-123 45 67'
  },
  {
    id: '6',
    name: 'Örebro',
    region: 'Örebro län',
    email: 'orebro@hyresgastforeningen.se',
    phone: '019-123 45 67'
  }
]

const filteredDivisions = computed(() => {
  if (!searchQuery.value) {
    return divisions
  }
  const query = searchQuery.value.toLowerCase()
  return divisions.filter(division => 
    division.name.toLowerCase().includes(query) ||
    division.region.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
.division-card {
  @apply p-6 bg-background-secondary rounded-2xl border border-border hover:border-primary-300 hover:shadow-lg transition-all duration-300 ease-smooth;
}
</style>
