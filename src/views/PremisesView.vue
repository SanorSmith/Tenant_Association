<template>
  <DefaultLayout>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-accent mb-2">Lokaler</h1>
      <p class="text-textGray">Gemensamma utrymmen och faciliteter</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <BaseCard v-for="premise in premises" :key="premise.id" hover padding="md">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="text-2xl">{{ premise.icon }}</span>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-navy mb-2">{{ premise.name }}</h3>
            <p class="text-sm text-textGray mb-3">{{ premise.description }}</p>
            <div class="flex flex-wrap gap-2 mb-3">
              <BaseBadge v-for="amenity in premise.amenities" :key="amenity" variant="info" size="sm">{{ amenity }}</BaseBadge>
            </div>
            <BaseButton variant="primary" size="sm">Boka nu</BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'

const premises = [
  { id: 1, name: 'Festlokal', icon: '🎉', description: 'Stor lokal för fester och evenemang', amenities: ['Kök', 'Ljudsystem', '50 personer'] },
  { id: 2, name: 'Tvättstuga', icon: '🧺', description: 'Moderna tvättmaskiner och torktumlare', amenities: ['4 maskiner', 'Torkskåp', 'Mangel'] },
  { id: 3, name: 'Gym', icon: '💪', description: 'Välutrustat träningsutrymme', amenities: ['Löpband', 'Vikter', 'Yoga'] },
  { id: 4, name: 'Gästlägenhet', icon: '🏠', description: 'Lägenhet för besökande gäster', amenities: ['2 rum', 'Kök', 'Badrum'] }
]
</script>
