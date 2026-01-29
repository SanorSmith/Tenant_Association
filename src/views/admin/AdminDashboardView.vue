<template>
  <AdminLayout>
    <div class="dashboard">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-accent mb-2">Dashboard</h1>
        <p class="text-textGray">Välkommen tillbaka, {{ currentUser?.name }}</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stat-card bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-navy">{{ stats.pendingProposals }}</span>
          </div>
          <h3 class="text-sm font-medium text-textGray">Väntande förslag</h3>
        </div>

        <div class="stat-card bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-navy">{{ stats.pendingBookings }}</span>
          </div>
          <h3 class="text-sm font-medium text-textGray">Bokningar att godkänna</h3>
        </div>

        <div class="stat-card bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-navy">{{ stats.memberApplications }}</span>
          </div>
          <h3 class="text-sm font-medium text-textGray">Medlemsansökningar</h3>
        </div>

        <div class="stat-card bg-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-navy">{{ stats.lhRequests }}</span>
          </div>
          <h3 class="text-sm font-medium text-textGray">LH-förfrågningar</h3>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h2 class="text-xl font-bold text-navy mb-4">Snabbåtgärder</h2>
          <div class="space-y-3">
            <BaseButton variant="primary" class="w-full justify-center" @click="router.push('/meetings')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Skapa nytt möte
            </BaseButton>
            <BaseButton variant="secondary" class="w-full justify-center" @click="router.push('/activities')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Skapa aktivitet
            </BaseButton>
            <BaseButton variant="secondary" class="w-full justify-center" @click="router.push('/documents')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Ladda upp dokument
            </BaseButton>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 border border-gray-200">
          <h2 class="text-xl font-bold text-navy mb-4">Kommande möten</h2>
          <div v-if="upcomingMeetings.length > 0" class="space-y-3">
            <div v-for="meeting in upcomingMeetings.slice(0, 3)" :key="meeting.id" class="p-3 bg-gray-50 rounded-lg">
              <h3 class="font-semibold text-navy text-sm">{{ meeting.title }}</h3>
              <p class="text-xs text-textGray mt-1">{{ meeting.date }} kl {{ meeting.time }}</p>
            </div>
          </div>
          <p v-else class="text-sm text-textGray">Inga kommande möten</p>
        </div>
      </div>

      <!-- Pending Items -->
      <div class="bg-white rounded-xl p-6 border border-gray-200">
        <h2 class="text-xl font-bold text-navy mb-4">Väntande ärenden</h2>
        
        <div class="space-y-4">
          <!-- Pending Proposals -->
          <div v-if="pendingProposals.length > 0">
            <h3 class="font-semibold text-navy mb-2">Förslag</h3>
            <div v-for="proposal in pendingProposals.slice(0, 3)" :key="proposal.id" class="p-4 bg-gray-50 rounded-lg mb-2">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <p class="font-medium text-navy">{{ proposal.name }}</p>
                  <p class="text-sm text-textGray mt-1 line-clamp-2">{{ proposal.proposal }}</p>
                </div>
                <BaseButton size="sm" @click="viewProposal(proposal.id)">
                  Granska
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- Pending Bookings -->
          <div v-if="pendingBookings.length > 0">
            <h3 class="font-semibold text-navy mb-2">Bokningar</h3>
            <div v-for="booking in pendingBookings.slice(0, 3)" :key="booking.id" class="p-4 bg-gray-50 rounded-lg mb-2">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <p class="font-medium text-navy">{{ booking.name }}</p>
                  <p class="text-sm text-textGray mt-1">{{ booking.date }} {{ booking.startTime }}-{{ booking.endTime }}</p>
                </div>
                <div class="flex gap-2">
                  <BaseButton size="sm" variant="primary" @click="approveBooking(booking.id)">
                    Godkänn
                  </BaseButton>
                  <BaseButton size="sm" variant="secondary" @click="rejectBooking(booking.id)">
                    Avslå
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>

          <!-- Membership Applications -->
          <div v-if="membershipApplications.length > 0">
            <h3 class="font-semibold text-navy mb-2">Medlemsansökningar</h3>
            <div v-for="app in membershipApplications.slice(0, 3)" :key="app.id" class="p-4 bg-gray-50 rounded-lg mb-2">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <p class="font-medium text-navy">{{ app.name }}</p>
                  <p class="text-sm text-textGray mt-1">{{ app.interests.join(', ') }}</p>
                </div>
                <BaseButton size="sm" @click="viewApplication(app.id)">
                  Granska
                </BaseButton>
              </div>
            </div>
          </div>

          <p v-if="pendingProposals.length === 0 && pendingBookings.length === 0 && membershipApplications.length === 0" class="text-sm text-textGray text-center py-4">
            Inga väntande ärenden
          </p>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useAuth } from '@/composables/useAuth'
import { useProposalsStore } from '@/stores/proposals'
import { useBookingRequestsStore } from '@/stores/bookingRequests'
import { useMembershipRequestsStore } from '@/stores/membershipRequests'
import { useLHRequestsStore } from '@/stores/lhRequests'
import { useMeetingsStore } from '@/stores/meetings'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const { currentUser } = useAuth()
const { success } = useNotifications()

const proposalsStore = useProposalsStore()
const bookingRequestsStore = useBookingRequestsStore()
const membershipRequestsStore = useMembershipRequestsStore()
const lhRequestsStore = useLHRequestsStore()
const meetingsStore = useMeetingsStore()

const pendingProposals = computed(() => 
  proposalsStore.proposals.filter(p => p.status === 'pending')
)

const pendingBookings = computed(() => 
  bookingRequestsStore.bookings.filter(b => b.status === 'pending')
)

const membershipApplications = computed(() => 
  membershipRequestsStore.requests.filter(r => r.status === 'pending')
)

const lhRequests = computed(() => 
  lhRequestsStore.requests.filter(r => r.status === 'pending')
)

const upcomingMeetings = computed(() => 
  meetingsStore.upcomingMeetings
)

const stats = computed(() => ({
  pendingProposals: pendingProposals.value.length,
  pendingBookings: pendingBookings.value.length,
  memberApplications: membershipApplications.value.length,
  lhRequests: lhRequests.value.length,
}))

const viewProposal = (id: string) => {
  router.push(`/proposals/${id}`)
}

const approveBooking = async (id: string) => {
  const result = await bookingRequestsStore.approveBooking(id)
  if (result.success) {
    success('Bokning godkänd!')
  }
}

const rejectBooking = async (id: string) => {
  const result = await bookingRequestsStore.rejectBooking(id)
  if (result.success) {
    success('Bokning avslagen')
  }
}

const viewApplication = (id: string) => {
  router.push(`/membership/${id}`)
}

onMounted(() => {
  // Load all data
})
</script>
