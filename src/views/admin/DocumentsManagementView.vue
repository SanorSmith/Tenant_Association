<template>
  <AdminLayout>
    <div class="documents-management">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-accent mb-2">Dokument</h1>
        <p class="text-textGray">Hantera föreningsdokument och mallar</p>
      </div>

      <!-- Quick Actions -->
      <div class="mb-6 flex gap-4">
        <BaseButton variant="primary" @click="openUploadModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Ladda upp dokument
        </BaseButton>
        <BaseButton variant="secondary" @click="openTemplateModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Skapa från mall
        </BaseButton>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6 flex gap-2">
        <BaseButton
          :variant="filter === 'all' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'all'"
        >
          Alla ({{ documents.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'protocols' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'protocols'"
        >
          Protokoll ({{ protocols.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'reports' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'reports'"
        >
          Rapporter ({{ reports.length }})
        </BaseButton>
        <BaseButton
          :variant="filter === 'templates' ? 'primary' : 'outline'"
          size="sm"
          @click="filter = 'templates'"
        >
          Mallar ({{ templates.length }})
        </BaseButton>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <BaseInput
          v-model="searchQuery"
          placeholder="Sök dokument..."
          :icon="SearchIcon"
        />
      </div>

      <!-- Documents Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BaseCard
          v-for="document in filteredDocuments"
          :key="document.id"
          hover
          padding="md"
          class="cursor-pointer"
          @click="viewDocument(document)"
        >
          <div class="flex items-start gap-3">
            <div :class="getDocumentIconBg(document.type)" class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
              <component :is="getDocumentIcon(document.type)" :class="getDocumentIconColor(document.type)" class="w-6 h-6" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-navy truncate">{{ document.title }}</h3>
              <p class="text-sm text-textGray mt-1">{{ document.description || 'Ingen beskrivning' }}</p>
              <div class="flex items-center gap-3 text-xs text-textGray mt-2">
                <span>{{ formatDate(document.uploadDate) }}</span>
                <span>{{ document.size || 'N/A' }}</span>
                <BaseBadge :variant="getDocumentStatusVariant(document.status)" size="sm">
                  {{ getDocumentStatusLabel(document.status) }}
                </BaseBadge>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <BaseButton size="sm" variant="secondary" @click.stop="downloadDocument(document)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </BaseButton>
            <BaseButton size="sm" variant="secondary" @click.stop="shareDocument(document)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </BaseButton>
            <BaseButton size="sm" variant="outline" @click.stop="deleteDocument(document)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </BaseButton>
          </div>
        </BaseCard>
      </div>

      <!-- Empty State -->
      <BaseEmptyState
        v-if="filteredDocuments.length === 0"
        title="Inga dokument hittades"
        description="Ladda upp ditt första dokument för att komma igång."
      />
    </div>

    <!-- Upload Document Modal -->
    <BaseModal
      v-model="isUploadModalOpen"
      title="Ladda upp dokument"
      size="md"
    >
      <form @submit.prevent="handleUpload">
        <div class="mb-4">
          <label class="block text-sm font-medium text-navy mb-2">Välj fil</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer" @click="triggerFileInput">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-sm text-gray-600">Klicka för att välja fil eller dra och släpp</p>
            <p class="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, XLS, XLSX (max 10MB)</p>
          </div>
          <input
            ref="fileInput"
            type="file"
            hidden
            @change="handleFileSelect"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
        </div>

        <div v-if="selectedFile" class="mb-4 p-3 bg-gray-50 rounded-lg">
          <p class="text-sm font-medium text-navy">{{ selectedFile.name }}</p>
          <p class="text-xs text-textGray">{{ formatFileSize(selectedFile.size) }}</p>
        </div>

        <BaseInput
          v-model="uploadForm.title"
          label="Titel"
          required
          :error="errors.title"
        />

        <BaseInput
          v-model="uploadForm.description"
          label="Beskrivning"
          placeholder="Kort beskrivning av dokumentet"
        />

        <div class="mb-4">
          <label class="block text-sm font-medium text-navy mb-2">Typ</label>
          <select v-model="uploadForm.type" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10">
            <option value="">Välj typ</option>
            <option value="protocol">Protokoll</option>
            <option value="report">Rapport</option>
            <option value="budget">Budget</option>
            <option value="policy">Policy</option>
            <option value="template">Mall</option>
            <option value="other">Övrigt</option>
          </select>
        </div>

        <template #footer>
          <BaseButton variant="secondary" @click="closeUploadModal">
            Avbryt
          </BaseButton>
          <BaseButton type="submit" :loading="loading" :disabled="!selectedFile">
            Ladda upp
          </BaseButton>
        </template>
      </form>
    </BaseModal>

    <!-- Template Modal -->
    <BaseModal
      v-model="isTemplateModalOpen"
      title="Skapa från mall"
      size="md"
    >
      <div class="space-y-4">
        <div v-for="template in documentTemplates" :key="template.id" class="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer" @click="createFromTemplate(template)">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-navy">{{ template.name }}</h3>
              <p class="text-sm text-textGray">{{ template.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseEmptyState from '@/components/BaseEmptyState.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { useDocuments } from '@/composables/useDocuments'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const { getDocuments, uploadDocument, deleteDocument, downloadDocument, loading } = useDocuments()
const { success, error } = useNotifications()

const filter = ref('all')
const searchQuery = ref('')
const isUploadModalOpen = ref(false)
const isTemplateModalOpen = ref(false)
const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const uploadForm = ref({
  title: '',
  description: '',
  type: ''
})

const errors = ref<any>({})

// Document templates
const documentTemplates = ref([
  {
    id: 1,
    name: 'Mötesprotokoll',
    description: 'Standardmall för mötesprotokoll',
    type: 'protocol'
  },
  {
    id: 2,
    name: 'Årsredovisning',
    description: 'Mall för årsredovisning',
    type: 'report'
  },
  {
    id: 3,
    name: 'Budget',
    description: 'Budgetmall för räkenskapsår',
    type: 'budget'
  },
  {
    id: 4,
    name: 'Stadgar',
    description: 'Mall för föreningens stadgar',
    type: 'policy'
  }
])

// Mock documents data
const documents = ref([
  {
    id: '1',
    title: 'Årsredovisning 2023',
    description: 'Komplett årsredovisning för 2023',
    type: 'report',
    uploadDate: '2024-01-15',
    size: '2.3 MB',
    status: 'published'
  },
  {
    id: '2',
    title: 'Protokoll styrelsemöte',
    description: 'Protokoll från senaste styrelsemöte',
    type: 'protocol',
    uploadDate: '2024-01-20',
    size: '156 KB',
    status: 'published'
  },
  {
    id: '3',
    title: 'Budgetförslag 2024',
    description: 'Budgetförslag för kommande räkenskapsår',
    type: 'budget',
    uploadDate: '2024-01-10',
    size: '890 KB',
    status: 'draft'
  }
])

const protocols = computed(() => documents.value.filter(d => d.type === 'protocol'))
const reports = computed(() => documents.value.filter(d => d.type === 'report'))
const templates = computed(() => documents.value.filter(d => d.type === 'template'))

const filteredDocuments = computed(() => {
  let filtered = documents.value

  // Apply filter
  if (filter.value !== 'all') {
    filtered = filtered.filter(d => d.type === filter.value)
  }

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(d => 
      d.title.toLowerCase().includes(query) ||
      d.description?.toLowerCase().includes(query)
    )
  }

  return filtered
})

const openUploadModal = () => {
  uploadForm.value = { title: '', description: '', type: '' }
  selectedFile.value = null
  errors.value = {}
  isUploadModalOpen.value = true
}

const closeUploadModal = () => {
  isUploadModalOpen.value = false
  uploadForm.value = { title: '', description: '', type: '' }
  selectedFile.value = null
  errors.value = {}
}

const openTemplateModal = () => {
  isTemplateModalOpen.value = true
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file
    if (!uploadForm.value.title) {
      uploadForm.value.title = file.name.replace(/\.[^/.]+$/, '')
    }
  }
}

const handleUpload = async () => {
  if (!selectedFile.value) return

  try {
    const result = await uploadDocument(selectedFile.value, uploadForm.value)
    if (result.success) {
      success('Dokument uppladdat!')
      closeUploadModal()
    }
  } catch (err) {
    error('Kunde inte ladda upp dokumentet')
  }
}

const viewDocument = (document: any) => {
  router.push(`/documents/${document.id}`)
}

const downloadDocument = (document: any) => {
  downloadDocument(document)
  success('Nedladdning startad!')
}

const shareDocument = (document: any) => {
  success('Länk kopierad till urklipp!')
}

const deleteDocument = async (document: any) => {
  try {
    await deleteDocument(document.id)
    success('Dokument borttaget!')
  } catch (err) {
    error('Kunde inte ta bort dokumentet')
  }
}

const createFromTemplate = (template: any) => {
  uploadForm.value = {
    title: template.name,
    description: template.description,
    type: template.type
  }
  isTemplateModalOpen.value = false
  isUploadModalOpen.value = true
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE')
}

const getDocumentIcon = (type: string) => {
  const icons: Record<string, any> = {
    protocol: 'FileText',
    report: 'FileText',
    budget: 'FileSpreadsheet',
    policy: 'FileText',
    template: 'FileText',
    other: 'File'
  }
  return icons[type] || 'File'
}

const getDocumentIconBg = (type: string) => {
  const backgrounds: Record<string, string> = {
    protocol: 'bg-blue-100',
    report: 'bg-green-100',
    budget: 'bg-purple-100',
    policy: 'bg-orange-100',
    template: 'bg-gray-100',
    other: 'bg-gray-100'
  }
  return backgrounds[type] || 'bg-gray-100'
}

const getDocumentIconColor = (type: string) => {
  const colors: Record<string, string> = {
    protocol: 'text-blue-600',
    report: 'text-green-600',
    budget: 'text-purple-600',
    policy: 'text-orange-600',
    template: 'text-gray-600',
    other: 'text-gray-600'
  }
  return colors[type] || 'text-gray-600'
}

const getDocumentStatusVariant = (status: string) => {
  const variants: Record<string, any> = {
    published: 'success',
    draft: 'warning',
    archived: 'info'
  }
  return variants[status] || 'info'
}

const getDocumentStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: 'Publicerad',
    draft: 'Utkast',
    archived: 'Arkiverad'
  }
  return labels[status] || status
}

// Search icon component
const SearchIcon = () => '🔍'
</script>
