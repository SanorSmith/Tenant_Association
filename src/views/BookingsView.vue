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
                  <span class="icon">👤</span>
                  <div>
                    <p class="info-label">Namn</p>
                    <p class="info-value">{{ booking.name }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <span class="icon">📧</span>
                  <div>
                    <p class="info-label">E-post</p>
                    <p class="info-value">{{ booking.email }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <span class="icon">📞</span>
                  <div>
                    <p class="info-label">Telefon</p>
                    <p class="info-value">{{ booking.phone }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <span class="icon">📅</span>
                  <div>
                    <p class="info-label">Datum</p>
                    <p class="info-value">{{ formatDate(booking.date) }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <span class="icon">🕐</span>
                  <div>
                    <p class="info-label">Tid</p>
                    <p class="info-value">{{ booking.startTime }} - {{ booking.endTime }}</p>
                  </div>
                </div>
                
                <div class="info-row">
                  <span class="icon">📝</span>
                  <div>
                    <p class="info-label">Syfte</p>
                    <p class="info-value">{{ booking.purpose }}</p>
                  </div>
                </div>
              </div>
              
              <div class="card-footer">
                <BaseButton variant="primary" size="sm" full-width @click="confirmBooking(booking.id)">
                  ✓ Godkänn
                </BaseButton>
                <BaseButton variant="secondary" size="sm" full-width @click="rejectBooking(booking.id)">
                  ✕ Avslå
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
                  <span class="icon">👤</span>
                  <p class="info-value">{{ booking.name }}</p>
                </div>
                
                <div class="info-row">
                  <span class="icon">📅</span>
                  <p class="info-value">{{ formatDate(booking.date) }} {{ booking.startTime }}-{{ booking.endTime }}</p>
                </div>
                
                <div class="info-row">
                  <span class="icon">📝</span>
                  <p class="info-value">{{ booking.purpose }}</p>
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-header h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1A1A40;
}

.card-body {
  padding: 1.25rem;
  display: grid;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}

.info-label {
  font-size: 0.75rem;
  color: #6B7280;
  margin-bottom: 0.125rem;
}

.info-value {
  color: #1A1A40;
  font-weight: 500;
}

.card-footer {
  padding: 1.25rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
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
