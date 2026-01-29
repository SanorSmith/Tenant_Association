<template>
  <AdminLayout>
    <div class="bookings-management">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-accent mb-2">Bokningar</h1>
        <p class="text-textGray">Hantera och godkänn lokalbokningar</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <BaseCard padding="md">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-1">{{ pendingBookings.length }}</div>
            <div class="text-sm text-textGray">Väntar på godkännande</div>
          </div>
        </BaseCard>
        <BaseCard padding="md">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-1">{{ approvedBookings.length }}</div>
            <div class="text-sm text-textGray">Godkända</div>
          </div>
        </BaseCard>
        <BaseCard padding="md">
          <div class="text-center">
            <div class="text-3xl font-bold text-red-600 mb-1">{{ rejectedBookings.length }}</div>
            <div class="text-sm text-textGray">Avslagna</div>
          </div>
        </BaseCard>
        <BaseCard padding="md">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-1">{{ todayBookings.length }}</div>
            <div class="text-sm text-textGray">Idag</div>
          </div>
        </BaseCard>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6 flex gap-2">
        <BaseButton
          :variant="filter === 'all' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'all'"
        >
          Alla ({{ bookings.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'pending' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'pending'"
        >
          Väntande ({{ pendingBookings.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'approved' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'approved'"
        >
          Godkända ({{ approvedBookings.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'rejected' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'rejected'"
        >
          Avslagna ({{ rejectedBookings.length }})
        </BaseButton>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <BaseInput
          v-model="searchQuery"
          placeholder="Sök bokningar..."
          :icon="SearchIcon"
        />
      </div>

      <!-- Bookings List -->
      <div class="space-y-4">
        <BaseCard
          v-for="booking in filteredBookings"
          :key="booking.id"
          hover
          padding="md"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h3 class="text-lg font-semibold text-navy">{{ booking.premiseName }}</h3>
                <BaseBadge :variant="getBookingStatusVariant(booking.status)">
                  {{ getBookingStatusLabel(booking.status) }}
                </BaseBadge>
                <BaseBadge variant="info" size="sm">
                  {{ formatDate(booking.date) }}
                </BaseBadge>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-medium">Bokare:</span>
                    <span>{{ booking.name }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium">E-post:</span>
                    <span>{{ booking.email }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="font-medium">Telefon:</span>
                    <span>{{ booking.phone }}</span>
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-medium">Tid:</span>
                    <span>{{ booking.startTime }} - {{ booking.endTime }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="font-medium">Adress:</span>
                    <span>{{ booking.address }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="font-medium">Syfte:</span>
                    <span>{{ booking.purpose }}</span>
                  </div>
                </div>
              </div>

              <!-- Timeline -->
              <div class="border-t pt-3">
                <div class="flex items-center gap-4 text-xs text-textGray">
                  <span>Skapad: {{ formatDateTime(booking.submittedAt) }}</span>
                  <span v-if="booking.approvedAt">Godkänd: {{ formatDateTime(booking.approvedAt) }}</span>
                  <span v-if="booking.rejectedAt">Avslagen: {{ formatDateTime(booking.rejectedAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 ml-4">
              <BaseButton
                v-if="booking.status === 'pending'"
                size="sm"
                variant="primary"
                @click="approveBooking(booking)"
                :loading="loading"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Godkänn
              </BaseButton>
              
              <BaseButton
                v-if="booking.status === 'pending'"
                size="sm"
                variant="outline"
                @click="openRejectModal(booking)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Avslå
              </BaseButton>

              <BaseButton
                v-if="booking.status === 'approved'"
                size="sm"
                variant="secondary"
                @click="sendConfirmation(booking)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Skicka bekräftelse
              </BaseButton>

              <BaseButton
                size="sm"
                variant="outline"
                @click="viewDetails(booking)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Detaljer
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Empty State -->
      <BaseEmptyState
        v-if="filteredBookings.length === 0"
        title="Inga bokningar hittades"
        description="Inga bokningar matchar dina filter."
      />
    </div>

    <!-- Reject Modal -->
    <BaseModal
      v-model="isRejectModalOpen"
      title="Avslå bokning"
      size="sm"
    >
      <div class="space-y-4">
        <p>Är du säker på att du vill avslå bokningen från "{{ selectedBooking?.name }}"?</p>
        
        <div>
          <label class="block text-sm font-medium text-navy mb-2">Anledning (valfritt)</label>
          <textarea
            v-model="rejectionReason"
            rows="3"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="Beskriv varför bokningen avslås..."
          ></textarea>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="isRejectModalOpen = false">
          Avbryt
        </BaseButton>
        <BaseButton variant="outline" @click="confirmReject" :loading="loading">
          Avslå bokning
        </BaseButton>
      </template>
    </BaseModal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseEmptyState from '@/components/BaseEmptyState.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useBookingRequestsStore } from '@/stores/bookingRequests'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const bookingStore = useBookingRequestsStore()
const { success, error } = useNotifications()

const filter = ref('pending')
const searchQuery = ref('')
const isRejectModalOpen = ref(false)
const selectedBooking = ref<any>(null)
const rejectionReason = ref('')

const { bookings, approveBooking, rejectBooking } = bookingStore
const loading = ref(false)

const pendingBookings = computed(() => 
  bookings.value.filter(b => b.status === 'pending')
)

const approvedBookings = computed(() => 
  bookings.value.filter(b => b.status === 'approved')
)

const rejectedBookings = computed(() => 
  bookings.value.filter(b => b.status === 'rejected')
)

const todayBookings = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return bookings.value.filter(b => b.date === today)
})

const filteredBookings = computed(() => {
  let filtered = bookings.value

  // Apply filter
  if (filter.value !== 'all') {
    filtered = filtered.filter(b => b.status === filter.value)
  }

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(b => 
      b.name.toLowerCase().includes(query) ||
      b.email.toLowerCase().includes(query) ||
      b.premiseName.toLowerCase().includes(query) ||
      b.purpose.toLowerCase().includes(query)
    )
  }

  return filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
})

const approveBooking = async (booking: any) => {
  loading.value = true
  try {
    const result = await approveBooking(booking.id)
    if (result.success) {
      success('Bokning godkänd! Bekräftelse skickad till ' + booking.name)
    }
  } catch (err) {
    error('Kunde inte godkänna bokningen')
  }
  loading.value = false
}

const openRejectModal = (booking: any) => {
  selectedBooking.value = booking
  rejectionReason.value = ''
  isRejectModalOpen.value = true
}

const confirmReject = async () => {
  if (!selectedBooking.value) return

  loading.value = true
  try {
    const result = await rejectBooking(selectedBooking.value.id, rejectionReason.value)
    if (result.success) {
      success('Bokning avslagen! Meddelande skickat till ' + selectedBooking.value.name)
      isRejectModalOpen.value = false
      selectedBooking.value = null
      rejectionReason.value = ''
    }
  } catch (err) {
    error('Kunde inte avslå bokningen')
  }
  loading.value = false
}

const sendConfirmation = (booking: any) => {
  success('Bekräftelse skickad till ' + booking.name)
}

const viewDetails = (booking: any) => {
  router.push(`/bookings/${booking.id}`)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getBookingStatusVariant = (status: string) => {
  const variants: Record<string, any> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return variants[status] || 'info'
}

const getBookingStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Väntande',
    approved: 'Godkänd',
    rejected: 'Avslagen'
  }
  return labels[status] || status
}

// Search icon component
const SearchIcon = () => '🔍'
</script>
