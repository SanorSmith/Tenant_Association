<template>
  <DefaultLayout>
    <div class="bookings-page">
      <div class="page-header mb-8">
        <h1 class="text-3xl font-bold text-accent mb-2">Bokningar</h1>
        <p class="text-textGray">Hantera alla bokningsförfrågningar</p>
      </div>

      <!-- Tabs -->
      <div class="tabs mb-8">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="['tab', { active: activeTab === tab.value }]"
        >
          {{ tab.label }}
          <span v-if="tab.count > 0" class="tab-badge">{{ tab.count }}</span>
        </button>
      </div>

      <!-- Bookings List -->
      <div class="bookings-container">
        <!-- Pending Bookings -->
        <div v-if="activeTab === 'pending'">
          <div v-if="bookingsStore.pendingBookings.length === 0" class="empty-state">
            <p class="text-textGray">Inga väntande bokningar</p>
          </div>
          
          <div v-else class="bookings-grid">
            <BaseCard
              v-for="booking in bookingsStore.pendingBookings"
              :key="booking.id"
              padding="none"
              hover
            >
              <div class="card-header">
                <h3>{{ booking.premiseName }}</h3>
                <BaseBadge variant="warning" size="sm">Väntande</BaseBadge>
              </div>
              
              <div class="card-body">
                <div class="info-row">
                  <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div class="flex-1">
                    <p class="info-label">Namn</p>
                    <p class="info-value">{{ booking.name }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div class="flex-1">
                    <p class="info-label">E-post</p>
                    <p class="info-value">{{ booking.email }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div class="flex-1">
                    <p class="info-label">Telefon</p>
                    <p class="info-value">{{ booking.phone }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div class="flex-1">
                    <p class="info-label">Datum & Tid</p>
                    <p class="info-value">{{ formatDate(booking.date) }}, {{ booking.startTime }} - {{ booking.endTime }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div class="flex-1">
                    <p class="info-label">Syfte</p>
                    <p class="info-value">{{ booking.purpose }}</p>
                  </div>
                </div>
              </div>
              
              <div class="card-footer">
                <BaseButton variant="primary" size="sm" full-width @click="confirmBooking(booking.id)">
                  Godkänn
                </BaseButton>
                <BaseButton variant="outline" size="sm" full-width @click="rejectBooking(booking.id)">
                  Avslå
                </BaseButton>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- Confirmed Bookings -->
        <div v-if="activeTab === 'confirmed'">
          <div v-if="bookingsStore.confirmedBookings.length === 0" class="empty-state">
            <p class="text-textGray">Inga godkända bokningar</p>
          </div>
          
          <div v-else class="bookings-grid">
            <BaseCard
              v-for="booking in bookingsStore.confirmedBookings"
              :key="booking.id"
              padding="none"
              hover
            >
              <div class="card-header">
                <h3>{{ booking.premiseName }}</h3>
                <BaseBadge variant="success" size="sm">Godkänd</BaseBadge>
              </div>
              
              <div class="card-body">
                <div class="info-row">
                  <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p class="info-value flex-1">{{ booking.name }}</p>
                </div>
                
                <div class="info-row">
                  <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="info-value flex-1">{{ formatDate(booking.date) }} {{ booking.startTime }}-{{ booking.endTime }}</p>
                </div>
                
                <div class="info-row">
                  <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="info-value flex-1">{{ booking.purpose }}</p>
                </div>
              </div>
              
              <div class="card-footer">
                <BaseButton variant="secondary" size="sm" full-width @click="cancelBookingConfirm(booking.id)">
                  Avboka
                </BaseButton>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- All Bookings -->
        <div v-if="activeTab === 'all'">
          <div class="bookings-grid">
            <BaseCard
              v-for="booking in bookingsStore.bookings"
              :key="booking.id"
              padding="md"
              hover
            >
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-semibold text-navy">{{ booking.premiseName }}</h3>
                <BaseBadge :variant="getStatusVariant(booking.status)" size="sm">
                  {{ getStatusLabel(booking.status) }}
                </BaseBadge>
              </div>
              
              <div class="space-y-1 text-sm text-textGray">
                <p>{{ booking.name }} - {{ formatDate(booking.date) }}</p>
                <p>{{ booking.startTime }} - {{ booking.endTime }}</p>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookingsStore } from '@/stores/bookings'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'

const bookingsStore = useBookingsStore()
const activeTab = ref('pending')

const tabs = computed(() => [
  {
    label: 'Väntande',
    value: 'pending',
    count: bookingsStore.pendingBookings.length,
  },
  {
    label: 'Godkända',
    value: 'confirmed',
    count: bookingsStore.confirmedBookings.length,
  },
  {
    label: 'Alla',
    value: 'all',
    count: bookingsStore.bookings.length,
  },
])

const confirmBooking = async (id: string) => {
  const currentUser = JSON.parse(localStorage.getItem('grannskapet_user') || '{}')
  const result = await bookingsStore.confirmBooking(
    id,
    currentUser.name || 'Admin'
  )
  
  if (result.success) {
    alert('Bokning godkänd! ✓')
  }
}

const rejectBooking = async (id: string) => {
  const currentUser = JSON.parse(localStorage.getItem('grannskapet_user') || '{}')
  const reason = prompt('Anledning till avslag (valfritt):')
  
  const result = await bookingsStore.rejectBooking(
    id,
    currentUser.name || 'Admin',
    reason || undefined
  )
  
  if (result.success) {
    alert('Bokning avslagen')
  }
}

const cancelBookingConfirm = async (id: string) => {
  if (!confirm('Avboka denna bokning?')) return
  
  const result = await bookingsStore.cancelBooking(id)
  
  if (result.success) {
    alert('Bokning avbokad')
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Väntande',
    confirmed: 'Godkänd',
    rejected: 'Avslagen',
    cancelled: 'Avbokad',
  }
  return labels[status] || status
}

const getStatusVariant = (status: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' => {
  const variants: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
    pending: 'warning',
    confirmed: 'success',
    rejected: 'danger',
    cancelled: 'info',
  }
  return variants[status] || 'info'
}
</script>

<style scoped>
.bookings-page {
  padding: 0;
}

.page-header {
  margin-bottom: 2rem;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: #6B7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tab:hover {
  color: #0066B3;
}

.tab.active {
  color: #0066B3;
  border-bottom-color: #0066B3;
}

.tab-badge {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  background: #0066B3;
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
}

/* Bookings Grid */
.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1A1A40;
}

.card-body {
  padding: 1rem;
  display: grid;
  gap: 0.625rem;
}

.info-row {
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;
}

.icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}

.info-label {
  font-size: 0.6875rem;
  color: #6B7280;
  margin-bottom: 0.125rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.info-value {
  color: #1A1A40;
  font-weight: 500;
  font-size: 0.875rem;
}

.card-footer {
  padding: 0.875rem 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.625rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6B7280;
}

@media (max-width: 768px) {
  .bookings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
