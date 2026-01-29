<template>
  <DefaultLayout>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-accent mb-2">Aktiviteter</h1>
        <p class="text-textGray">Sociala evenemang och aktiviteter</p>
      </div>
      <BaseButton variant="primary" size="md">Skapa aktivitet</BaseButton>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard v-for="activity in activities" :key="activity.id" hover padding="none">
        <img :src="activity.image" :alt="activity.title" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-navy mb-2">{{ activity.title }}</h3>
          <p class="text-sm text-textGray mb-3">{{ activity.description }}</p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-textGray">📅 {{ activity.date }}</span>
            <BaseBadge variant="success">{{ activity.participants }} deltagare</BaseBadge>
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

const activities = [
  { id: 1, title: 'Sommarfest 2024', description: 'Grillkväll i gården', date: '15 juni', participants: 45, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' },
  { id: 2, title: 'Städdag', description: 'Gemensam städning av gården', date: '22 maj', participants: 28, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' },
  { id: 3, title: 'Julmarknad', description: 'Traditionell julmarknad', date: '10 december', participants: 67, image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400' }
]
</script>
