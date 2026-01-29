<template>
  <DefaultLayout>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-accent mb-2">Dokument</h1>
        <p class="text-textGray">Föreningens dokumentarkiv</p>
      </div>
      <BaseButton variant="primary" size="md" @click="showDocumentTypeModal = true">
        Skapa dokument
      </BaseButton>
    </div>

    <BaseInput v-model="searchQuery" type="search" placeholder="Sök dokument..." class="mb-6" />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BaseCard 
        v-for="doc in filteredDocuments" 
        :key="doc.id" 
        hover 
        padding="md"
        @click="openDocument(doc)"
        class="cursor-pointer"
      >
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-navy truncate mb-1">{{ doc.title }}</h3>
            <p class="text-xs text-textGray mb-2">{{ doc.date }}</p>
            <BaseBadge variant="info" size="sm">{{ doc.type }}</BaseBadge>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Document Type Selection Modal -->
    <DocumentTypeModal 
      v-model="showDocumentTypeModal" 
      @select="handleDocumentTypeSelect"
    />

    <!-- Agenda Creation Modal -->
    <AgendaModal 
      v-if="selectedDocumentType === 'agenda'"
      v-model="showAgendaModal" 
      @submitted="handleDocumentCreated"
    />

    <!-- Protocol Creation Modal -->
    <ProtocolModal 
      v-if="selectedDocumentType === 'protocol'"
      v-model="showProtocolModal" 
      @submitted="handleDocumentCreated"
    />

    <!-- Annual Report Creation Modal -->
    <AnnualReportModal 
      v-if="selectedDocumentType === 'annual-report'"
      v-model="showAnnualReportModal" 
      @submitted="handleDocumentCreated"
    />

    <!-- Document Viewer Modal -->
    <DocumentViewerModal 
      v-model="showDocumentViewerModal" 
      :document="selectedDocument"
    />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDocumentsStore } from '@/stores/documents'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import DocumentTypeModal from '@/components/modals/DocumentTypeModal.vue'
import AgendaModal from '@/components/modals/AgendaModal.vue'
import ProtocolModal from '@/components/modals/ProtocolModal.vue'
import AnnualReportModal from '@/components/modals/AnnualReportModal.vue'
import DocumentViewerModal from '@/components/modals/DocumentViewerModal.vue'

const documentsStore = useDocumentsStore()

const searchQuery = ref('')
const showDocumentTypeModal = ref(false)
const showAgendaModal = ref(false)
const showProtocolModal = ref(false)
const showAnnualReportModal = ref(false)
const showDocumentViewerModal = ref(false)
const selectedDocumentType = ref<'agenda' | 'protocol' | 'annual-report' | null>(null)
const selectedDocument = ref(null)

// Initialize demo data if store is empty
if (documentsStore.documents.length === 0) {
  // 1. Comprehensive Annual Report
  documentsStore.addDocument({
    id: 'doc-1',
    title: 'Årsredovisning 2023',
    type: 'report',
    description: 'Komplekt årsredovisning för verksamhetsåret 2023 med ekonomisk översikt och verksamhetsberättelse',
    category: 'Årsrapport',
    fileUrl: '',
    fileSize: 15420,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-01-15',
    tags: ['Årsrapport', '2023', 'Ekonomi', 'Verksamhet'],
    isPublic: true
  })

  // 2. Detailed Meeting Protocol
  documentsStore.addDocument({
    id: 'doc-2',
    title: 'Protokoll föreningsstämma 2024-03-20',
    type: 'protocol',
    description: 'Protokoll från ordinarie föreningsstämma med beslut om budget och styrelse',
    category: 'Protokoll',
    fileUrl: '',
    fileSize: 8750,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-03-20',
    tags: ['Protokoll', 'Föreningsstämma', '2024'],
    isPublic: false
  })

  // 3. Budget Document
  documentsStore.addDocument({
    id: 'doc-3',
    title: 'Budget 2024 - Fastställd',
    type: 'report',
    description: 'Fastställd budget för verksamhetsåret 2024 med detaljerade kostnadsposter',
    category: 'Budget',
    fileUrl: '',
    fileSize: 6230,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-02-10',
    tags: ['Budget', '2024', 'Ekonomi'],
    isPublic: false
  })

  // 4. House Rules Policy
  documentsStore.addDocument({
    id: 'doc-4',
    title: 'Ordningsregler och trivselregler',
    type: 'policy',
    description: 'Gällande ordningsregler för fastigheten inklusive trivselregler och tvättstuganvändning',
    category: 'Policy',
    fileUrl: '',
    fileSize: 3450,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2023-12-01',
    tags: ['Ordningsregler', 'Policy', 'Regler'],
    isPublic: true
  })

  // 5. Maintenance Plan
  documentsStore.addDocument({
    id: 'doc-5',
    title: 'Underhållsplan 2024-2026',
    type: 'report',
    description: 'Långsiktig underhållsplan för fastigheten med prioriterade åtgärder',
    category: 'Underhåll',
    fileUrl: '',
    fileSize: 5680,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-01-05',
    tags: ['Underhåll', 'Plan', 'Fastighet'],
    isPublic: false
  })

  // 6. Insurance Contract
  documentsStore.addDocument({
    id: 'doc-6',
    title: 'Försäkringsavtal - Folksam',
    type: 'contract',
    description: 'Gällande försäkringsavtal med Folksam för fastighets- och ansvarsförsäkring',
    category: 'Kontrakt',
    fileUrl: '',
    fileSize: 4120,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-03-01',
    tags: ['Försäkring', 'Kontrakt', 'Folksam'],
    isPublic: false
  })

  // 7. Meeting Agenda
  documentsStore.addDocument({
    id: 'doc-7',
    title: 'Dagordning styrelsemöte maj 2024',
    type: 'report',
    description: 'Dagordning för styrelsemöte med punkter om sommarfest och underhåll',
    category: 'Dagordning',
    fileUrl: '',
    fileSize: 2150,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-05-10',
    tags: ['Dagordning', 'Styrelsemöte', '2024'],
    isPublic: false
  })

  // 8. Energy Report
  documentsStore.addDocument({
    id: 'doc-8',
    title: 'Energideklaration 2023',
    type: 'report',
    description: 'Årlig energideklaration med uppföljning av energiförbrukning och åtgärder',
    category: 'Rapport',
    fileUrl: '',
    fileSize: 3890,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-01-20',
    tags: ['Energi', 'Miljö', 'Deklaration'],
    isPublic: true
  })

  // 9. Fire Safety Plan
  documentsStore.addDocument({
    id: 'doc-9',
    title: 'Brandskyddsplan och utrymningsvägar',
    type: 'policy',
    description: 'Brandskyddsplan med utrymningsvägar och brandsäkerhetsföreskrifter',
    category: 'Säkerhet',
    fileUrl: '',
    fileSize: 4560,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2023-11-15',
    tags: ['Brandskydd', 'Säkerhet', 'Utrymning'],
    isPublic: true
  })

  // 10. Waste Management Plan
  documentsStore.addDocument({
    id: 'doc-10',
    title: 'Avfallshantering och sophantering',
    type: 'policy',
    description: 'Regler för sophantering, källsortering och avfallsplanering',
    category: 'Miljö',
    fileUrl: '',
    fileSize: 2780,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-02-15',
    tags: ['Avfall', 'Miljö', 'Soptunna'],
    isPublic: true
  })

  // 11. Parking Rules
  documentsStore.addDocument({
    id: 'doc-11',
    title: 'Parkeringsregler och garageanvändning',
    type: 'policy',
    description: 'Regler för parkering, garageanvändning och gästparkering',
    category: 'Regler',
    fileUrl: '',
    fileSize: 1890,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-01-08',
    tags: ['Parkering', 'Garage', 'Regler'],
    isPublic: true
  })

  // 12. Board Meeting Protocol
  documentsStore.addDocument({
    id: 'doc-12',
    title: 'Protokoll styrelsemöte 2024-04-15',
    type: 'protocol',
    description: 'Protokoll från styrelsemöte med beslut om sommaraktiviteter och budgetuppföljning',
    category: 'Protokoll',
    fileUrl: '',
    fileSize: 5230,
    fileType: 'application/pdf',
    uploadedBy: 'demo-user',
    uploadedAt: '2024-04-15',
    tags: ['Protokoll', 'Styrelsemöte', '2024'],
    isPublic: false
  })
}

const filteredDocuments = computed(() => {
  const docs = documentsStore.documents.map(doc => ({
    ...doc,
    date: new Date(doc.uploadedAt).toLocaleDateString('sv-SE'),
    type: doc.tags[0] || doc.type
  }))

  if (!searchQuery.value) return docs

  return documentsStore.searchDocuments(searchQuery.value).map(doc => ({
    ...doc,
    date: new Date(doc.uploadedAt).toLocaleDateString('sv-SE'),
    type: doc.tags[0] || doc.type
  }))
})

const handleDocumentTypeSelect = (type: 'agenda' | 'protocol' | 'annual-report') => {
  selectedDocumentType.value = type
  
  if (type === 'agenda') {
    showAgendaModal.value = true
  } else if (type === 'protocol') {
    showProtocolModal.value = true
  } else if (type === 'annual-report') {
    showAnnualReportModal.value = true
  }
}

const handleDocumentCreated = () => {
  selectedDocumentType.value = null
  showAgendaModal.value = false
  showProtocolModal.value = false
  showAnnualReportModal.value = false
}

const openDocument = (doc: any) => {
  selectedDocument.value = doc
  showDocumentViewerModal.value = true
}
</script>
