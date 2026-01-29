<template>
  <DefaultLayout>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-accent mb-2">Inställningar</h1>
      <p class="text-textGray">Hantera ditt konto och preferenser</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <!-- User Profile Information -->
        <BaseCard title="Profilinformation" padding="md">
          <div class="space-y-6">
            <!-- Profile Header -->
            <div class="flex items-center gap-4 pb-6 border-b border-gray-200">
              <img :src="authStore.user?.avatar" alt="Profile" class="w-20 h-20 rounded-full object-cover" />
              <div>
                <h3 class="text-xl font-semibold text-navy">{{ authStore.user?.name }}</h3>
                <p class="text-sm text-textGray">{{ authStore.user?.role === 'admin' ? 'Administratör' : authStore.user?.role === 'board' ? 'Styrelsemedlem' : 'Medlem' }}</p>
                <p class="text-xs text-textGray mt-1">Medlem sedan: {{ formatDate(authStore.user?.joinedDate || '') }}</p>
              </div>
            </div>

            <!-- Personal Information -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h4 class="text-sm font-semibold text-navy mb-3">Personlig information</h4>
                <div class="space-y-3">
                  <div>
                    <label class="text-xs text-textGray block mb-1">Namn</label>
                    <p class="text-sm text-navy font-medium">{{ authStore.user?.name }}</p>
                  </div>
                  <div>
                    <label class="text-xs text-textGray block mb-1">E-post</label>
                    <p class="text-sm text-navy font-medium">{{ authStore.user?.email }}</p>
                  </div>
                  <div>
                    <label class="text-xs text-textGray block mb-1">Telefon</label>
                    <p class="text-sm text-navy font-medium">{{ authStore.user?.phone || 'Ej angivet' }}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-navy mb-3">Bostadsinformation</h4>
                <div class="space-y-3">
                  <div>
                    <label class="text-xs text-textGray block mb-1">Lägenhetsnummer</label>
                    <p class="text-sm text-navy font-medium">{{ authStore.user?.apartment || 'Ej angivet' }}</p>
                  </div>
                  <div>
                    <label class="text-xs text-textGray block mb-1">Förening</label>
                    <p class="text-sm text-navy font-medium">Solhöjden BRF</p>
                  </div>
                  <div>
                    <label class="text-xs text-textGray block mb-1">Medlemsnummer</label>
                    <p class="text-sm text-navy font-medium">#{{ authStore.user?.id?.slice(-4) || '0001' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <BaseButton variant="outline" size="sm">Redigera profil</BaseButton>
            </div>
          </div>
        </BaseCard>

        <!-- Notifications Settings -->
        <BaseCard title="Notifieringar" padding="md">
          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-semibold text-navy mb-3">E-postnotifieringar</h4>
              <div class="space-y-3 ml-4">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input v-model="notifications.email" type="checkbox" class="w-4 h-4 text-primary rounded" />
                  <div>
                    <span class="text-sm text-navy">Alla e-postnotifieringar</span>
                    <p class="text-xs text-textGray">Få e-post om nya meddelanden och uppdateringar</p>
                  </div>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input v-model="notifications.meetings" type="checkbox" class="w-4 h-4 text-primary rounded" />
                  <div>
                    <span class="text-sm text-navy">Mötespåminnelser</span>
                    <p class="text-xs text-textGray">Påminnelse 24 timmar före möten</p>
                  </div>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input v-model="notifications.bookings" type="checkbox" class="w-4 h-4 text-primary rounded" />
                  <div>
                    <span class="text-sm text-navy">Bokningsbekräftelser</span>
                    <p class="text-xs text-textGray">Få bekräftelse när din bokning godkänns</p>
                  </div>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input v-model="notifications.activities" type="checkbox" class="w-4 h-4 text-primary rounded" />
                  <div>
                    <span class="text-sm text-navy">Nya aktiviteter</span>
                    <p class="text-xs text-textGray">Få notiser om nya gemensamma aktiviteter</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Security Settings -->
        <BaseCard title="Säkerhet" padding="md">
          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-semibold text-navy mb-3">Lösenord</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-navy">Ändra lösenord</p>
                    <p class="text-xs text-textGray">Senast ändrad: 30 dagar sedan</p>
                  </div>
                  <BaseButton variant="outline" size="sm">Ändra</BaseButton>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="text-sm font-semibold text-navy mb-3">Tvåfaktorsautentisering</h4>
              <div class="space-y-3">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input v-model="security.twoFactor" type="checkbox" class="w-4 h-4 text-primary rounded" />
                  <div>
                    <span class="text-sm text-navy">Aktivera 2FA</span>
                    <p class="text-xs text-textGray">Extra säkerhet för ditt konto</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        <!-- Profile Picture -->
        <BaseCard title="Profilbild" padding="md">
          <div class="text-center">
            <img :src="authStore.user?.avatar" alt="Profile" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
            <BaseButton variant="outline" size="sm" full-width>Byt bild</BaseButton>
          </div>
        </BaseCard>

        <!-- Quick Actions -->
        <BaseCard title="Snabbåtgärder" padding="md">
          <div class="space-y-2">
            <BaseButton variant="outline" size="sm" full-width>Ladda ner mina data</BaseButton>
            <BaseButton variant="outline" size="sm" full-width>Exportera profil</BaseButton>
            <BaseButton variant="outline" size="sm" full-width>Radera konto</BaseButton>
          </div>
        </BaseCard>

        <!-- Account Stats -->
        <BaseCard title="Kontostatistik" padding="md">
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-textGray">Antal bokningar</span>
              <span class="text-sm font-semibold text-navy">12</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-textGray">Deltagna möten</span>
              <span class="text-sm font-semibold text-navy">8</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-textGray">Aktiviteter</span>
              <span class="text-sm font-semibold text-navy">5</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-textGray">Medlem sedan</span>
              <span class="text-sm font-semibold text-navy">2 år</span>
            </div>
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
import BaseButton from '@/components/BaseButton.vue'

const authStore = useAuthStore()

const notifications = ref({
  email: true,
  meetings: true,
  bookings: true,
  activities: false
})

const security = ref({
  twoFactor: false
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Okänt datum'
  const date = new Date(dateStr)
  return date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
