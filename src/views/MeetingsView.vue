<template>
  <DefaultLayout>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-accent mb-2">Möten</h1>
        <p class="text-textGray">Hantera och planera föreningsmöten</p>
      </div>
      <BaseButton variant="primary" size="md">Skapa nytt möte</BaseButton>
    </div>

    <div class="mb-6 flex gap-4">
      <BaseButton :variant="filter === 'all' ? 'primary' : 'outline'" size="sm" @click="filter = 'all'">Alla</BaseButton>
      <BaseButton :variant="filter === 'upcoming' ? 'primary' : 'outline'" size="sm" @click="filter = 'upcoming'">Kommande</BaseButton>
      <BaseButton :variant="filter === 'past' ? 'primary' : 'outline'" size="sm" @click="filter = 'past'">Tidigare</BaseButton>
    </div>

    <div class="grid gap-4">
      <BaseCard v-for="meeting in filteredMeetings" :key="meeting.id" hover padding="md">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-navy mb-2">{{ meeting.title }}</h3>
            <p class="text-sm text-textGray mb-3">{{ meeting.description }}</p>
            <div class="flex flex-wrap gap-4 text-sm text-textGray">
              <span>📅 {{ meeting.date }} kl {{ meeting.time }}</span>
              <span>📍 {{ meeting.location }}</span>
              <span>👥 {{ meeting.attendees }} deltagare</span>
            </div>
          </div>
          <BaseBadge :variant="meeting.status === 'upcoming' ? 'success' : 'info'">{{ meeting.statusText }}</BaseBadge>
        </div>
      </BaseCard>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'

const filter = ref('all')

const meetings = [
  { id: 1, title: 'Årsstämma 2024', description: 'Ordinarie årsstämma för bostadsrättsföreningen', date: '2024-05-22', time: '19:00', location: 'Föreningslokalen', attendees: 45, status: 'upcoming', statusText: 'Kommande' },
  { id: 2, title: 'Styrelsemöte', description: 'Månatligt styrelsemöte', date: '2024-05-15', time: '18:00', location: 'Styrelserummet', attendees: 7, status: 'upcoming', statusText: 'Kommande' },
  { id: 3, title: 'Extra möte', description: 'Diskussion om renoveringsprojekt', date: '2024-04-10', time: '19:00', location: 'Föreningslokalen', attendees: 32, status: 'past', statusText: 'Genomfört' }
]

const filteredMeetings = computed(() => {
  if (filter.value === 'all') return meetings
  return meetings.filter(m => m.status === filter.value)
})
</script>
