<template>
  <DefaultLayout>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-accent mb-2">Inställningar</h1>
      <p class="text-textGray">Hantera ditt konto och preferenser</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <BaseCard title="Profilinformation" padding="md">
          <form class="space-y-4">
            <BaseInput v-model="profile.name" label="Namn" type="text" />
            <BaseInput v-model="profile.email" label="E-post" type="email" />
            <BaseInput v-model="profile.phone" label="Telefon" type="tel" />
            <BaseInput v-model="profile.apartment" label="Lägenhetsnummer" type="text" />
            <BaseButton variant="primary" size="md">Spara ändringar</BaseButton>
          </form>
        </BaseCard>

        <BaseCard title="Notifieringar" padding="md" class="mt-6">
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer">
              <input v-model="notifications.email" type="checkbox" class="w-4 h-4 text-primary rounded" />
              <span class="text-sm text-navy">E-postnotifieringar</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input v-model="notifications.meetings" type="checkbox" class="w-4 h-4 text-primary rounded" />
              <span class="text-sm text-navy">Mötespåminnelser</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input v-model="notifications.activities" type="checkbox" class="w-4 h-4 text-primary rounded" />
              <span class="text-sm text-navy">Nya aktiviteter</span>
            </label>
          </div>
        </BaseCard>
      </div>

      <div>
        <BaseCard title="Profilbild" padding="md">
          <div class="text-center">
            <img :src="authStore.user?.avatar" alt="Profile" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
            <BaseButton variant="outline" size="sm" full-width>Byt bild</BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const authStore = useAuthStore()

const profile = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
  apartment: authStore.user?.apartment || ''
})

const notifications = ref({
  email: true,
  meetings: true,
  activities: false
})
</script>
