<template>
  <DefaultLayout>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-accent mb-2">Dokument</h1>
        <p class="text-textGray">Föreningens dokumentarkiv</p>
      </div>
      <BaseButton variant="primary" size="md">Ladda upp dokument</BaseButton>
    </div>

    <BaseInput v-model="searchQuery" type="search" placeholder="Sök dokument..." class="mb-6" />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BaseCard v-for="doc in documents" :key="doc.id" hover padding="md">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-navy truncate mb-1">{{ doc.title }}</h3>
            <p class="text-xs text-textGray mb-2">{{ doc.date }}</p>
            <BaseBadge variant="info" size="sm">{{ doc.type }}</BaseBadge>
          </div>
        </div>
      </BaseCard>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseBadge from '@/components/BaseBadge.vue'

const searchQuery = ref('')

const documents = [
  { id: 1, title: 'Årsredovisning 2023', date: '2024-01-15', type: 'Rapport' },
  { id: 2, title: 'Protokoll årsstämma', date: '2024-03-20', type: 'Protokoll' },
  { id: 3, title: 'Budgetförslag 2024', date: '2024-02-10', type: 'Budget' },
  { id: 4, title: 'Ordningsregler', date: '2023-12-01', type: 'Policy' },
  { id: 5, title: 'Underhållsplan', date: '2024-01-05', type: 'Plan' },
  { id: 6, title: 'Försäkringsbrev', date: '2024-03-01', type: 'Kontrakt' }
]
</script>
