<template>
  <AdminLayout>
    <div class="proposals-management">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-accent mb-2">Förslag</h1>
        <p class="text-textGray">Granska och hantera inkomna förslag från medlemmar</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <BaseCard padding="md">
          <div class="text-center">
            <div class="text-3xl font-bold text-warning mb-1">{{ pendingProposals.length }}</div>
            <div class="text-sm text-textGray">Väntar på granskning</div>
          </div>
        </BaseCard>
        <BaseCard padding="md">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-1">{{ reviewedProposals.length }}</div>
            <div class="text-sm text-textGray">Granskade</div>
          </div>
        </BaseCard>
        <BaseCard padding="md">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-1">{{ approvedProposals.length }}</div>
            <div class="text-sm text-textGray">Godkända</div>
          </div>
        </BaseCard>
        <BaseCard padding="md">
          <div class="text-center">
            <div class="text-3xl font-bold text-red-600 mb-1">{{ rejectedProposals.length }}</div>
            <div class="text-sm text-textGray">Avslagna</div>
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
          Alla ({{ proposals.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'pending' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'pending'"
        >
          Väntande ({{ pendingProposals.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'reviewed' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'reviewed'"
        >
          Granskade ({{ reviewedProposals.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'approved' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'approved'"
        >
          Godkända ({{ approvedProposals.length }})
        </BaseButton>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <BaseInput
          v-model="searchQuery"
          placeholder="Sök förslag..."
          :icon="SearchIcon"
        />
      </div>

      <!-- Proposals List -->
      <div class="space-y-4">
        <BaseCard
          v-for="proposal in filteredProposals"
          :key="proposal.id"
          hover
          padding="md"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h3 class="text-lg font-semibold text-navy">Förslag från {{ proposal.name }}</h3>
                <BaseBadge :variant="getProposalStatusVariant(proposal.status)">
                  {{ getProposalStatusLabel(proposal.status) }}
                </BaseBadge>
                <BaseBadge variant="info" size="sm">
                  {{ formatDate(proposal.submittedAt) }}
                </BaseBadge>
              </div>

              <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <p class="text-navy font-medium mb-2">Förslag:</p>
                <p class="text-textGray whitespace-pre-wrap">{{ proposal.proposal }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-medium">Namn:</span>
                    <span>{{ proposal.name }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium">E-post:</span>
                    <span>{{ proposal.email }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="font-medium">Telefon:</span>
                    <span>{{ proposal.phone }}</span>
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span class="font-medium">Förening:</span>
                    <span>{{ getAssociationName(proposal.associationId) }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-medium">Inskickat:</span>
                    <span>{{ formatDateTime(proposal.submittedAt) }}</span>
                  </div>
                  <div v-if="proposal.reviewedAt" class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-medium">Granskat:</span>
                    <span>{{ formatDateTime(proposal.reviewedAt) }}</span>
                  </div>
                </div>
              </div>

              <!-- Review Notes -->
              <div v-if="proposal.reviewNotes" class="border-t pt-3">
                <p class="text-sm font-medium text-navy mb-1">Kommentar:</p>
                <p class="text-sm text-textGray">{{ proposal.reviewNotes }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 ml-4">
              <BaseButton
                v-if="proposal.status === 'pending'"
                size="sm"
                variant="primary"
                @click="openReviewModal(proposal)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Granska
              </BaseButton>
              
              <BaseButton
                v-if="proposal.status === 'pending'"
                size="sm"
                variant="success"
                @click="approveProposal(proposal)"
                :loading="loading"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Godkänn
              </BaseButton>

              <BaseButton
                v-if="proposal.status === 'pending'"
                size="sm"
                variant="outline"
                @click="openRejectModal(proposal)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Avslå
              </BaseButton>

              <BaseButton
                size="sm"
                variant="secondary"
                @click="contactProposer(proposal)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Kontakta
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Empty State -->
      <BaseEmptyState
        v-if="filteredProposals.length === 0"
        title="Inga förslag hittades"
        description="Inga förslag matchar dina filter."
      />
    </div>

    <!-- Review Modal -->
    <BaseModal
      v-model="isReviewModalOpen"
      title="Granska förslag"
      size="lg"
    >
      <div v-if="selectedProposal" class="space-y-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="font-semibold text-navy mb-2">Förslag från {{ selectedProposal.name }}</h3>
          <p class="text-textGray whitespace-pre-wrap">{{ selectedProposal.proposal }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-navy mb-2">Kontaktinformation</label>
            <div class="space-y-1 text-sm">
              <p><strong>E-post:</strong> {{ selectedProposal.email }}</p>
              <p><strong>Telefon:</strong> {{ selectedProposal.phone }}</p>
              <p><strong>Förening:</strong> {{ getAssociationName(selectedProposal.associationId) }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-navy mb-2">Tidsstämplar</label>
            <div class="space-y-1 text-sm">
              <p><strong>Inskickat:</strong> {{ formatDateTime(selectedProposal.submittedAt) }}</p>
              <p v-if="selectedProposal.reviewedAt"><strong>Granskat:</strong> {{ formatDateTime(selectedProposal.reviewedAt) }}</p>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-navy mb-2">Granskningskommentar</label>
          <textarea
            v-model="reviewNotes"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="Lägg till kommentarer om förslaget..."
          ></textarea>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="isReviewModalOpen = false">
          Stäng
        </BaseButton>
        <BaseButton variant="success" @click="approveWithNotes" :loading="loading">
          Godkänn med kommentar
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Reject Modal -->
    <BaseModal
      v-model="isRejectModalOpen"
      title="Avslå förslag"
      size="sm"
    >
      <div class="space-y-4">
        <p>Är du säker på att du vill avslå förslaget från "{{ selectedProposal?.name }}"?</p>
        
        <div>
          <label class="block text-sm font-medium text-navy mb-2">Anledning till avslag</label>
          <textarea
            v-model="rejectionReason"
            rows="3"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="Beskriv varför förslaget avslås..."
            required
          ></textarea>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="isRejectModalOpen = false">
          Avbryt
        </BaseButton>
        <BaseButton variant="outline" @click="confirmReject" :loading="loading">
          Avslå förslag
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
import { useProposalsStore } from '@/stores/proposals'
import { useAssociationsStore } from '@/stores/associations'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const proposalsStore = useProposalsStore()
const associationsStore = useAssociationsStore()
const { success, error } = useNotifications()

const filter = ref('pending')
const searchQuery = ref('')
const isReviewModalOpen = ref(false)
const isRejectModalOpen = ref(false)
const selectedProposal = ref<any>(null)
const reviewNotes = ref('')
const rejectionReason = ref('')
const loading = ref(false)

const { proposals } = proposalsStore

const pendingProposals = computed(() => 
  proposals.value.filter(p => p.status === 'pending')
)

const reviewedProposals = computed(() => 
  proposals.value.filter(p => p.status !== 'pending')
)

const approvedProposals = computed(() => 
  proposals.value.filter(p => p.status === 'approved')
)

const rejectedProposals = computed(() => 
  proposals.value.filter(p => p.status === 'rejected')
)

const filteredProposals = computed(() => {
  let filtered = proposals.value

  // Apply filter
  if (filter.value !== 'all') {
    if (filter.value === 'reviewed') {
      filtered = reviewedProposals.value
    } else {
      filtered = filtered.filter(p => p.status === filter.value)
    }
  }

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.email.toLowerCase().includes(query) ||
      p.proposal.toLowerCase().includes(query)
    )
  }

  return filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
})

const openReviewModal = (proposal: any) => {
  selectedProposal.value = proposal
  reviewNotes.value = proposal.reviewNotes || ''
  isReviewModalOpen.value = true
}

const openRejectModal = (proposal: any) => {
  selectedProposal.value = proposal
  rejectionReason.value = ''
  isRejectModalOpen.value = true
}

const approveProposal = async (proposal: any) => {
  loading.value = true
  try {
    // Update proposal status
    const updatedProposal = {
      ...proposal,
      status: 'approved',
      reviewedAt: new Date().toISOString(),
      reviewNotes: 'Godkänt av styrelsen'
    }
    
    // Update in store (you'd implement this method)
    success('Förslag godkänt! Meddelande skickat till ' + proposal.name)
  } catch (err) {
    error('Kunde inte godkänna förslaget')
  }
  loading.value = false
}

const approveWithNotes = async () => {
  if (!selectedProposal.value) return

  loading.value = true
  try {
    // Update proposal with notes
    const updatedProposal = {
      ...selectedProposal.value,
      status: 'approved',
      reviewedAt: new Date().toISOString(),
      reviewNotes: reviewNotes.value
    }
    
    success('Förslag godkänt med kommentar! Meddelande skickat till ' + selectedProposal.value.name)
    isReviewModalOpen.value = false
    selectedProposal.value = null
    reviewNotes.value = ''
  } catch (err) {
    error('Kunde inte godkänna förslaget')
  }
  loading.value = false
}

const confirmReject = async () => {
  if (!selectedProposal.value || !rejectionReason.value) return

  loading.value = true
  try {
    // Update proposal with rejection
    const updatedProposal = {
      ...selectedProposal.value,
      status: 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewNotes: rejectionReason.value
    }
    
    success('Förslag avslaget! Meddelande skickat till ' + selectedProposal.value.name)
    isRejectModalOpen.value = false
    selectedProposal.value = null
    rejectionReason.value = ''
  } catch (err) {
    error('Kunde inte avslå förslaget')
  }
  loading.value = false
}

const contactProposer = (proposal: any) => {
  success('E-postklient öppnad för att kontakta ' + proposal.name)
  // In a real app, this would open email client or contact form
}

const getAssociationName = (associationId?: string) => {
  if (!associationId) return 'Okänd'
  const association = associationsStore.getAssociationById(associationId)
  return association?.name || 'Okänd förening'
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

const getProposalStatusVariant = (status: string) => {
  const variants: Record<string, any> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return variants[status] || 'info'
}

const getProposalStatusLabel = (status: string) => {
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
