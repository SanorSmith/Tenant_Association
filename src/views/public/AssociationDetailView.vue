<template>
  <PublicLayout>
    <div class="association-detail-page bg-gray-50">
    <section class="bg-gradient-to-br from-primary-50 to-white py-12 border-b border-gray-200">
      <div class="container-custom">
        <div class="max-w-4xl">
          <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          <h1 class="text-4xl font-bold text-accent mb-3">
            {{ association?.name || 'Förening' }}
          </h1>
          
          <p class="flex items-center gap-2 text-lg text-textGray mb-3">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ association?.location || 'Uppsala' }}
          </p>
          
          <p class="text-navy text-lg leading-relaxed mb-4">
            {{ association?.description || 'Välkommen till vår förening!' }}
          </p>
          
          <div class="flex items-center gap-6 text-sm text-textGray mb-6">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {{ association?.apartments || 0 }} lägenheter
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {{ association?.memberCount || 0 }} medlemmar
            </span>
          </div>

          <button 
            @click="goBack"
            class="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-medium"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tillbaka till sökning
          </button>
        </div>
      </div>
    </section>

    <div class="container-custom py-12">
      <div class="grid lg:grid-cols-[320px,1fr] gap-8">
        
        <aside class="space-y-4">
          <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-4">
            <h2 class="text-xl font-bold text-navy mb-4">Vad vill du göra?</h2>
            
            <div class="space-y-3">
              <BaseButton 
                @click="openProposalModal"
                variant="primary"
                class="w-full justify-center"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Lämna förslag
              </BaseButton>

              <BaseButton 
                @click="openCreateLHModal"
                variant="secondary"
                class="w-full justify-center"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Starta ny förening
              </BaseButton>

              <BaseButton 
                @click="openMembershipModal"
                variant="secondary"
                class="w-full justify-center"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Bli aktiv medlem
              </BaseButton>

              <BaseButton 
                @click="openBookingModal"
                variant="secondary"
                class="w-full justify-center"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Boka lokal
              </BaseButton>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <RouterLink to="/login">
                <BaseButton variant="outline" class="w-full justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Logga in (Styrelse)
                </BaseButton>
              </RouterLink>
            </div>
          </div>
        </aside>

        <main>
          <h2 class="text-2xl font-bold text-accent mb-6">
            Nyheter & Aktiviteter
          </h2>

          <div v-if="publishedActivities.length > 0" class="space-y-6">
            <article 
              v-for="activity in publishedActivities" 
              :key="activity.id"
              class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div class="p-6">
                <div class="flex items-center gap-2 text-sm text-textGray mb-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ formatDate(activity.date) }}</span>
                </div>

                <h3 class="text-xl font-semibold text-navy mb-3">
                  {{ activity.title }}
                </h3>

                <p class="text-textGray leading-relaxed mb-4">
                  {{ activity.description }}
                </p>

                <div class="flex items-center justify-between">
                  <BaseBadge :variant="activity.status === 'upcoming' ? 'success' : 'info'">
                    {{ activity.status === 'upcoming' ? 'Kommande' : 'Genomförd' }}
                  </BaseBadge>
                  
                  <div v-if="activity.maxParticipants" class="text-sm text-textGray">
                    {{ activity.participants?.length || 0 }}/{{ activity.maxParticipants }} deltagare
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="text-center py-12 bg-white rounded-xl border border-gray-200">
            <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="text-lg font-semibold text-navy mb-2">Inga aktiviteter publicerade än</h3>
            <p class="text-textGray">Styrelsen har inte publicerat några aktiviteter ännu. Kom tillbaka snart!</p>
          </div>
        </main>
      </div>
    </div>

    <ProposalModal 
      v-model="isProposalModalOpen"
      :association-id="associationId"
      @submitted="handleProposalSubmitted"
    />

    <CreateLHModal 
      v-model="isCreateLHModalOpen"
      @submitted="handleCreateLHSubmitted"
    />

    <MembershipModal 
      v-model="isMembershipModalOpen"
      :association-id="associationId"
      @submitted="handleMembershipSubmitted"
    />

    <BookingModal 
      v-model="isBookingModalOpen"
      :association-id="associationId"
      @submitted="handleBookingSubmitted"
    />
  </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import ProposalModal from '@/components/modals/ProposalModal.vue'
import CreateLHModal from '@/components/modals/CreateLHModal.vue'
import MembershipModal from '@/components/modals/MembershipModal.vue'
import BookingModal from '@/components/modals/BookingModal.vue'
import { useNotifications } from '@/composables/useNotifications'

const route = useRoute()
const router = useRouter()
const { success } = useNotifications()

const isProposalModalOpen = ref(false)
const isCreateLHModalOpen = ref(false)
const isMembershipModalOpen = ref(false)
const isBookingModalOpen = ref(false)

const associationId = computed(() => route.params.id as string)

const association = ref({
  id: '1',
  name: 'Rosendal Hyresgästförening',
  location: 'Rosendal, Uppsala',
  description: 'Vi arbetar för bättre boendemiljö och gemenskap i Rosendal. Välkommen att engagera dig!',
  apartments: 245,
  memberCount: 89
})

const publishedActivities = ref([
  {
    id: '1',
    title: 'Sommargrill i parken',
    description: 'Välkommen på gemensam grillkväll! Vi bjuder på korv och dryck. Ta gärna med något att grilla själv också.',
    date: '2024-06-15',
    status: 'upcoming',
    maxParticipants: 50,
    participants: []
  },
  {
    id: '2',
    title: 'Årsmöte 2024',
    description: 'Ordinarie årsmöte där vi går igenom verksamhetsberättelse och väljer ny styrelse.',
    date: '2024-05-20',
    status: 'upcoming',
    maxParticipants: null,
    participants: []
  }
])

const goBack = () => {
  router.push('/')
}

const openProposalModal = () => {
  isProposalModalOpen.value = true
}

const openCreateLHModal = () => {
  isCreateLHModalOpen.value = true
}

const openMembershipModal = () => {
  isMembershipModalOpen.value = true
}

const openBookingModal = () => {
  isBookingModalOpen.value = true
}

const handleProposalSubmitted = () => {
  success('Ditt förslag har skickats till styrelsen!')
}

const handleCreateLHSubmitted = () => {
  success('Din ansökan har mottagits! Vi kontaktar dig snart.')
}

const handleMembershipSubmitted = () => {
  success('Tack för ditt intresse! Vi hör av oss inom kort.')
}

const handleBookingSubmitted = () => {
  success('Din bokningsförfrågan har skickats till styrelsen!')
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  if (!association.value) {
    router.push('/')
  }
})
</script>
