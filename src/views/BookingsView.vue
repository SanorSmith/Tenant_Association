<template>
  <DefaultLayout>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-accent mb-2">Bokningar</h1>
        <p class="text-textGray">Hantera dina bokningar</p>
      </div>
      <BaseButton variant="primary" size="md">Ny bokning</BaseButton>
    </div>

    <div class="grid gap-4">
      <BaseCard v-for="booking in bookings" :key="booking.id" padding="md">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <span class="text-xl">{{ booking.icon }}</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-navy">{{ booking.premise }}</h3>
              <p class="text-sm text-textGray">{{ booking.date }} kl {{ booking.time }}</p>
            </div>
          </div>
          <BaseBadge :variant="booking.status === 'confirmed' ? 'success' : 'warning'">{{ booking.statusText }}</BaseBadge>
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

const bookings = [
  { id: 1, premise: 'Festlokal', date: '15 juni 2024', time: '18:00-23:00', status: 'confirmed', statusText: 'Bekräftad', icon: '🎉' },
  { id: 2, premise: 'Tvättstuga', date: '20 maj 2024', time: '10:00-12:00', status: 'confirmed', statusText: 'Bekräftad', icon: '🧺' },
  { id: 3, premise: 'Gästlägenhet', date: '5 juli 2024', time: 'Helg', status: 'pending', statusText: 'Väntar', icon: '🏠' }
]
</script>
