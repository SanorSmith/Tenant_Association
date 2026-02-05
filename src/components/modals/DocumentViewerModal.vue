<template>
  <BaseModal v-model="isOpen" :title="document?.title || 'Dokument'" size="xl">
    <div v-if="document" class="space-y-6">
      <!-- Document Header -->
      <div class="border-b pb-4">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-bold text-navy mb-2">{{ document.title }}</h2>
            <p class="text-textGray mb-2">{{ document.description }}</p>
            <div class="flex flex-wrap gap-2 text-sm">
              <span class="text-gray-600 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(document.uploadedAt) }}
              </span>
              <span class="text-gray-600 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                {{ document.category }}
              </span>
              <span class="text-gray-600 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ formatFileSize(document.fileSize) }}
              </span>
              <BaseBadge :variant="document.isPublic ? 'success' : 'info'" size="sm">
                {{ document.isPublic ? 'Publik' : 'Intern' }}
              </BaseBadge>
            </div>
          </div>
        </div>
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-3">
          <BaseBadge v-for="tag in document.tags" :key="tag" variant="info" size="sm">
            {{ tag }}
          </BaseBadge>
        </div>
      </div>

      <!-- Document Content -->
      <div class="bg-gray-50 rounded-lg p-6">
        <div v-if="documentContent" class="prose max-w-none">
          <div v-html="documentContent"></div>
        </div>
        <div v-else class="text-center py-8 text-textGray">
          <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p>Dokumentinnehåll är inte tillgängligt i demo-läge</p>
          <p class="text-sm mt-2">I en riktig applikation skulle detta visa det fullständiga dokumentet</p>
        </div>
      </div>

      <!-- Document Actions -->
      <div class="border-t pt-4">
        <div class="flex gap-3">
          <BaseButton variant="primary" @click="downloadDocument">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Ladda ner
          </BaseButton>
          <BaseButton variant="outline" @click="printDocument">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Skriv ut
          </BaseButton>
          <BaseButton variant="outline" @click="shareDocument">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Dela
          </BaseButton>
          <BaseButton variant="outline" @click="editDocument" v-if="!document.isPublic">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Redigera
          </BaseButton>
        </div>
      </div>
    </div>
    
    <template #footer>
      <BaseButton variant="secondary" @click="closeModal">
        Stäng
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'

interface Document {
  id: string
  title: string
  description?: string
  type: string
  category: string
  fileUrl: string
  fileSize: number
  fileType: string
  uploadedBy: string
  uploadedAt: string
  tags: string[]
  isPublic: boolean
}

interface Props {
  modelValue: boolean
  document: Document | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
})

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

// Demo content for different document types
const documentContent = computed(() => {
  if (!props.document) return null
  
  const content: Record<string, string> = {
    'Årsredovisning 2023': `
      <h1>Årsredovisning 2023</h1>
      <h2>Sammanfattning</h2>
      <p>Verksamhetsåret 2023 har varit framgångsrikt för vår bostadsrättsförening. Vi har genomfört flera viktiga projekt och upprätthållit en hög standard på vår fastighet.</p>
      
      <h2>Ekonomisk översikt</h2>
      <table>
        <tr><td>Intäkter:</td><td>2 450 000 kr</td></tr>
        <tr><td>Utgifter:</td><td>1 890 000 kr</td></tr>
        <tr><td>Resultat:</td><td>560 000 kr</td></tr>
      </table>
      
      <h2>Genomförda projekt</h2>
      <ul>
        <li>Fasadrenoverning - komplett</li>
        <li>Nytt tak på garage - genomfört</li>
        <li>Uppgradering av ventilationssystem - påbörjat</li>
      </ul>
      
      <h2>Framtidsplaner</h2>
      <p>För 2024 planerar vi att fortsätta med ventilationssystemet och genomföra en total renovering av tvättstugorna.</p>
    `,
    
    'Protokoll föreningsstämma 2024-03-20': `
      <h1>Protokoll föreningsstämma 2024-03-20</h1>
      
      <h2>Närvarande</h2>
      <p>Anna Andersson (ordförande), Erik Eriksson (vice ordförande), Maria Svensson (kassör), Johan Johansson (sekreterare), samt 42 medlemmar.</p>
      
      <h2>§1 Mötets öppnande</h2>
      <p>Ordförande Anna Andersson öppnade mötet kl. 19:00 och hälsade alla välkomna.</p>
      
      <h2>§2 Föregående protokoll</h2>
      <p>Föregående protokoll från föreningsstämma 2023-03-15 godkändes utan ändringar.</p>
      
      <h2>§3 Årsredovisning 2023</h2>
      <p>Kassören Maria Svensson presenterade årsredovisningen som visade ett positivt resultat på 560 000 kr.</p>
      
      <h2>§4 Beslut om budget 2024</h2>
      <p><strong>Beslut:</strong> Budgeten för 2024 fastställdes med rösterna 45 för, 2 emot, 1 avstod.</p>
      
      <h2>§5 Val av styrelse</h2>
      <p><strong>Beslut:</strong> Nuvarande styrelse omvaldes för ytterligare ett år.</p>
      
      <h2>§6 Övriga frågor</h2>
      <p>Inga övriga frågor framfördes.</p>
      
      <h2>Mötets avslutande</h2>
      <p>Mötet avslutades kl. 20:15.</p>
    `,
    
    'Budget 2024 - Fastställd': `
      <h1>Budget 2024 - Fastställd</h1>
      
      <h2>Intäkter</h2>
      <table>
        <tr><td>Månadsavgifter:</td><td>2 100 000 kr</td></tr>
        <tr><td>Hyresintäkter:</td><td>350 000 kr</td></tr>
        <tr><td>Övriga intäkter:</td><td>50 000 kr</td></tr>
        <tr><td><strong>Totalt:</strong></td><td><strong>2 500 000 kr</strong></td></tr>
      </table>
      
      <h2>Utgifter</h2>
      <table>
        <tr><td>Underhåll:</td><td>800 000 kr</td></tr>
        <tr><td>El och värme:</td><td>650 000 kr</td></tr>
        <tr><td>Försäkringar:</td><td>320 000 kr</td></tr>
        <tr><td>Administration:</td><td>180 000 kr</td></tr>
        <tr><td>Avskrivningar:</td><td>200 000 kr</td></tr>
        <tr><td><strong>Totalt:</strong></td><td><strong>2 150 000 kr</strong></td></tr>
      </table>
      
      <h2>Resultat</h2>
      <p><strong>Beräknat resultat: 350 000 kr</strong></p>
    `,
    
    'Ordningsregler och trivselregler': `
      <h1>Ordningsregler och trivselregler</h1>
      
      <h2>Allmänna regler</h2>
      <ul>
        <li>Håll ljudnivån nere mellan kl. 22:00 - 07:00</li>
        <li>Inga fester i lägenheterna efter kl. 23:00</li>
        <li>Sotning får endast ske i avsedda platser</li>
        <li>Håll gårdarna och gemensamma ytor rena</li>
      </ul>
      
      <h2>Tvättstuga</h2>
      <ul>
        <li>Bokning sker via anslagstavlan i tvättstugan</li>
        <li>Max 3 timmar per lägenhet och vecka</li>
        <li>Rengöring efter varje användning</li>
        <li>Ingen tvätt mellan kl. 22:00 - 07:00</li>
      </ul>
      
      <h2>Soptunna och källsortering</h2>
      <ul>
        <li>Använd endast avsedda påsar för källsortering</li>
        <li>Hushållssoppa lämnas i soptunnan på måndagar och torsdagar</li>
        <li>Grovsoppa lämnas i behållaren vid infarten</li>
      </ul>
      
      <h2>Parkering och garage</h2>
      <ul>
        <li>Parkera endast på din tilldelade plats</li>
        <li>Gästparkering sker på anvisade platser</li>
        <li>Ingen motorvärmare i garaget</li>
        <li>Håll garageporten stängd</li>
      </ul>
    `,
    
    'Underhållsplan 2024-2026': `
      <h1>Underhållsplan 2024-2026</h1>
      
      <h2>2024 - Prioriterade åtgärder</h2>
      <ul>
        <li><strong>Kvartal 1:</strong> Fortsättning av ventilationssystem</li>
        <li><strong>Kvartal 2:</strong> Renovering av tvättstugor</li>
        <li><strong>Kvartal 3:</strong> Ytbehandling av balkonger</li>
        <li><strong>Kvartal 4:</strong> Inspektion av dräneringssystem</li>
      </ul>
      
      <h2>2025 - Planerade projekt</h2>
      <ul>
        <li><strong>Vår:</strong> Byte av fönster i trapphus</li>
        <li><strong>Sommar:</strong> Asfaltering av gård</li>
        <li><strong>Höst:</strong> Renovering av hiss</li>
        <li><strong>Vinter:</strong> Isolering av källare</li>
      </ul>
      
      <h2>2026 - Långsiktiga planer</h2>
      <ul>
        <li>Total renovering av fasader</li>
        <li>Installation av solceller på taket</li>
        <li>Uppgradering av elsystem</li>
        <li>Byte av vattenledningar</li>
      </ul>
      
      <h2>Budget</h2>
      <p>Total budget för underhållsplanen: 4 200 000 kr</p>
    `,
    
    'Försäkringsavtal - Folksam': `
      <h1>Försäkringsavtal - Folksam</h1>
      
      <h2>Avtalsnummer</h2>
      <p>FA-2023-456789</p>
      
      <h2>Försäkringsperiod</h2>
      <p>2024-01-01 till 2024-12-31</p>
      
      <h2>Försäkringar</h2>
      
      <h3>Fastighetsförsäkring</h3>
      <ul>
        <li>Försäkringsbelopp: 25 000 000 kr</li>
        <li>Självrisk: 10 000 kr</li>
        <li>Täcker: Brand, vattenskada, stormskada</li>
      </ul>
      
      <h3>Ansvarsförsäkring</h3>
      <ul>
        <li>Försäkringsbelopp: 10 000 000 kr</li>
        <li>Självrisk: 5 000 kr</li>
        <li>Täcker: Allmän ansvarsförsäkring för föreningen</li>
      </ul>
      
      <h3>Rättskyddsförsäkring</h3>
      <ul>
        <li>Försäkringsbelopp: 500 000 kr</li>
        <li>Självrisk: 2 000 kr</li>
        <li>Täcker: Rättsliga kostnader vid tvister</li>
      </ul>
      
      <h2>Premie</h2>
      <p>Total årlig premie: 45 600 kr</p>
      
      <h2>Kontakt</h2>
      <p>Folksam Försäkring: 0771-950 950</p>
      <p>Avtalsansvarig: Maria Lindberg</p>
    `
  }
  
  return content[props.document.title] || null
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const downloadDocument = () => {
  alert(`Laddar ner: ${props.document?.title}\n\nI en riktig applikation skulle detta ladda ner PDF-dokumentet.`)
}

const printDocument = () => {
  alert(`Skriver ut: ${props.document?.title}\n\nI en riktig applikation skulle detta öppna utskriftsdialogen.`)
}

const shareDocument = () => {
  alert(`Dela: ${props.document?.title}\n\nI en riktig applikation skulle detta öppna delningsalternativ.`)
}

const editDocument = () => {
  alert(`Redigera: ${props.document?.title}\n\nI en riktig applikation skulle detta öppna dokumentet för redigering.`)
}

const closeModal = () => {
  isOpen.value = false
}
</script>

<style scoped>
.prose h1 {
  @apply text-2xl font-bold text-navy mb-4;
}

.prose h2 {
  @apply text-xl font-semibold text-navy mb-3 mt-6;
}

.prose table {
  @apply w-full border-collapse border border-gray-300 my-4;
}

.prose table td {
  @apply border border-gray-300 px-3 py-2;
}

.prose ul {
  @apply list-disc pl-6 my-4;
}

.prose li {
  @apply mb-1;
}
</style>
