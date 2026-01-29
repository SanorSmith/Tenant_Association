<template>
  <BaseModal v-model="isOpen" title="Skapa årsrapport" size="xl">
    <div class="space-y-6">
      <p class="text-sm text-textGray">
        Sammanställ årets verksamhet. Fyll i information om föreningens aktiviteter och ekonomi.
      </p>

      <BaseInput
        v-model="form.title"
        label="Rapportens titel"
        placeholder="T.ex. Årsrapport 2024"
        required
        :error="errors.title"
      />

      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          v-model="form.year"
          label="Verksamhetsår"
          type="number"
          min="2000"
          max="2100"
          required
          :error="errors.year"
        />
        
        <BaseInput
          v-model="form.reportDate"
          label="Rapportdatum"
          type="date"
          required
          :error="errors.reportDate"
        />
      </div>

      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold text-navy mb-4">Verksamhetsberättelse</h3>
        
        <BaseInput
          v-model="form.summary"
          label="Sammanfattning"
          type="textarea"
          placeholder="Kort sammanfattning av årets verksamhet..."
          class="mb-4"
        />

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-navy mb-2">Genomförda aktiviteter</label>
            <BaseInput
              v-model="form.activities"
              type="textarea"
              placeholder="Beskriv årets aktiviteter och evenemang..."
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-navy mb-2">Underhåll och förbättringar</label>
            <BaseInput
              v-model="form.maintenance"
              type="textarea"
              placeholder="Beskriv genomfört underhåll och förbättringar..."
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-navy mb-2">Styrelsearbete</label>
            <BaseInput
              v-model="form.boardWork"
              type="textarea"
              placeholder="Beskriv styrelsens arbete under året..."
            />
          </div>
        </div>
      </div>

      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold text-navy mb-4">Ekonomisk översikt</h3>
        
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="form.income"
            label="Totala intäkter (kr)"
            type="number"
            min="0"
            placeholder="0"
          />
          
          <BaseInput
            v-model="form.expenses"
            label="Totala utgifter (kr)"
            type="number"
            min="0"
            placeholder="0"
          />
        </div>

        <div class="mt-4">
          <BaseInput
            v-model="form.economicSummary"
            label="Ekonomisk kommentar"
            type="textarea"
            placeholder="Kommentera den ekonomiska utvecklingen..."
          />
        </div>
      </div>

      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold text-navy mb-4">Framtidsutsikter</h3>
        
        <BaseInput
          v-model="form.futureOutlook"
          type="textarea"
          placeholder="Beskriv planerade aktiviteter och mål för kommande år..."
        />
      </div>

      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold text-navy mb-4">Styrelse</h3>
        <p class="text-sm text-textGray mb-3">Välj styrelsemedlemmar som ska nämnas i rapporten</p>
        
        <div class="space-y-2">
          <label v-for="member in boardMembers" :key="member.id" class="flex items-center gap-2">
            <input
              type="checkbox"
              :value="member.id"
              v-model="form.boardMembers"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span class="text-sm">{{ member.name }} - {{ member.role }}</span>
          </label>
        </div>
      </div>
    </div>
    
    <template #footer>
      <BaseButton variant="secondary" @click="closeModal">
        Avbryt
      </BaseButton>
      
      <BaseButton @click="handleSubmit" :loading="loading">
        Slutför årsrapport
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDocumentsStore } from '@/stores/documents'
import { useAuthStore } from '@/stores/auth'
import BaseModal from '@/components/BaseModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'submitted': []
}>()

const documentsStore = useDocumentsStore()
const authStore = useAuthStore()

const loading = ref(false)
const isOpen = ref(props.modelValue)

const form = ref({
  title: '',
  year: new Date().getFullYear().toString(),
  reportDate: '',
  summary: '',
  activities: '',
  maintenance: '',
  boardWork: '',
  income: '',
  expenses: '',
  economicSummary: '',
  futureOutlook: '',
  boardMembers: [] as string[]
})

const errors = ref({
  title: '',
  year: '',
  reportDate: ''
})

const boardMembers = [
  { id: '1', name: 'Anna Andersson', role: 'Ordförande' },
  { id: '2', name: 'Erik Eriksson', role: 'Vice ordförande' },
  { id: '3', name: 'Maria Svensson', role: 'Kassör' },
  { id: '4', name: 'Johan Johansson', role: 'Sekreterare' }
]

const balance = computed(() => {
  const income = parseInt(form.value.income) || 0
  const expenses = parseInt(form.value.expenses) || 0
  return income - expenses
})

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
})

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

const validate = () => {
  errors.value = {
    title: !form.value.title ? 'Titel krävs' : '',
    year: !form.value.year ? 'År krävs' : '',
    reportDate: !form.value.reportDate ? 'Rapportdatum krävs' : ''
  }
  
  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true

  const selectedBoardMembers = boardMembers
    .filter(m => form.value.boardMembers.includes(m.id))
    .map(m => `- ${m.name}, ${m.role}`)

  const content = `
# ${form.value.title}

**Verksamhetsår:** ${form.value.year}  
**Rapportdatum:** ${form.value.reportDate}

## Sammanfattning
${form.value.summary || 'Ingen sammanfattning angiven'}

## Verksamhetsberättelse

### Genomförda aktiviteter
${form.value.activities || 'Inga aktiviteter angivna'}

### Underhåll och förbättringar
${form.value.maintenance || 'Inget underhåll angivet'}

### Styrelsearbete
${form.value.boardWork || 'Inget styrelsearbete angivet'}

## Ekonomisk översikt

**Intäkter:** ${parseInt(form.value.income) || 0} kr  
**Utgifter:** ${parseInt(form.value.expenses) || 0} kr  
**Resultat:** ${balance.value} kr

${form.value.economicSummary ? `\n**Kommentar:**\n${form.value.economicSummary}` : ''}

## Framtidsutsikter
${form.value.futureOutlook || 'Inga framtidsutsikter angivna'}

## Styrelse ${form.value.year}
${selectedBoardMembers.length > 0 ? selectedBoardMembers.join('\n') : 'Ingen styrelse angiven'}
  `.trim()

  documentsStore.addDocument({
    id: `doc-${Date.now()}`,
    title: form.value.title,
    type: 'report',
    description: `Årsrapport för verksamhetsåret ${form.value.year}`,
    category: 'Årsrapport',
    fileUrl: '',
    fileSize: content.length,
    fileType: 'text/markdown',
    uploadedBy: authStore.user?.id || 'unknown',
    uploadedAt: new Date().toISOString(),
    tags: ['Årsrapport', form.value.year],
    isPublic: true
  })

  loading.value = false
  emit('submitted')
  closeModal()
  alert('Årsrapport skapad! ✓')
}

const closeModal = () => {
  isOpen.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    year: new Date().getFullYear().toString(),
    reportDate: '',
    summary: '',
    activities: '',
    maintenance: '',
    boardWork: '',
    income: '',
    expenses: '',
    economicSummary: '',
    futureOutlook: '',
    boardMembers: []
  }
  errors.value = {
    title: '',
    year: '',
    reportDate: ''
  }
}
</script>
