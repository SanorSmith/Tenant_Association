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

    <div class="grid md:grid-cols-2 gap-6">
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
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'

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
</script>
