<template>
  <BaseModal v-model="isOpen" title="Skapa protokoll" size="xl">
    <div class="space-y-6">
      <p class="text-sm text-textGray">
        Dokumentera ett genomfört möte. Fyll i information om mötet och beslut.
      </p>

      <BaseInput
        v-model="form.title"
        label="Mötets titel"
        placeholder="T.ex. Protokoll styrelsemöte januari 2024"
        required
        :error="errors.title"
      />

      <div class="grid grid-cols-2 gap-4">
        <BaseInput
          v-model="form.date"
          label="Datum"
          type="date"
          required
          :error="errors.date"
        />
        
        <BaseInput
          v-model="form.time"
          label="Tid"
          type="time"
          required
          :error="errors.time"
        />
      </div>

      <BaseInput
        v-model="form.location"
        label="Plats"
        placeholder="Var hölls mötet?"
        required
        :error="errors.location"
      />

      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold text-navy mb-4">Närvarande</h3>
        <div class="space-y-2">
          <label v-for="member in boardMembers" :key="member.id" class="flex items-center gap-2">
            <input
              type="checkbox"
              :value="member.id"
              v-model="form.attendees"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span class="text-sm">{{ member.name }} - {{ member.role }}</span>
          </label>
        </div>
      </div>

      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold text-navy mb-4">Protokollspunkter</h3>
        
        <div v-for="(item, index) in form.protocolItems" :key="index" class="mb-4 p-4 border rounded-lg">
          <div class="flex justify-between items-start mb-2">
            <span class="font-semibold text-navy">§{{ index + 1 }}</span>
            <BaseButton
              variant="outline"
              size="sm"
              @click="removeProtocolItem(index)"
              v-if="form.protocolItems.length > 1"
            >
              ✕
            </BaseButton>
          </div>
          
          <BaseInput
            v-model="form.protocolItems[index].title"
            placeholder="Punkt titel"
            class="mb-2"
          />
          
          <BaseInput
            v-model="form.protocolItems[index].discussion"
            placeholder="Diskussion och bakgrund"
            type="textarea"
            class="mb-2"
          />
          
          <BaseInput
            v-model="form.protocolItems[index].decision"
            placeholder="Beslut"
            type="textarea"
          />
        </div>

        <BaseButton
          variant="outline"
          size="sm"
          @click="addProtocolItem"
        >
          + Lägg till punkt
        </BaseButton>
      </div>

      <div class="border-t pt-4">
        <BaseInput
          v-model="form.nextMeeting"
          label="Nästa möte"
          placeholder="När är nästa möte planerat?"
        />
      </div>
    </div>
    
    <template #footer>
      <BaseButton variant="secondary" @click="closeModal">
        Avbryt
      </BaseButton>
      
      <BaseButton @click="handleSubmit" :loading="loading">
        Slutför protokoll
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
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
  date: '',
  time: '',
  location: '',
  attendees: [] as string[],
  protocolItems: [
    { title: '', discussion: '', decision: '' }
  ],
  nextMeeting: ''
})

const errors = ref({
  title: '',
  date: '',
  time: '',
  location: ''
})

const boardMembers = [
  { id: '1', name: 'Anna Andersson', role: 'Ordförande' },
  { id: '2', name: 'Erik Eriksson', role: 'Vice ordförande' },
  { id: '3', name: 'Maria Svensson', role: 'Kassör' },
  { id: '4', name: 'Johan Johansson', role: 'Sekreterare' }
]

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
})

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

const addProtocolItem = () => {
  form.value.protocolItems.push({ title: '', discussion: '', decision: '' })
}

const removeProtocolItem = (index: number) => {
  form.value.protocolItems.splice(index, 1)
}

const validate = () => {
  errors.value = {
    title: !form.value.title ? 'Titel krävs' : '',
    date: !form.value.date ? 'Datum krävs' : '',
    time: !form.value.time ? 'Tid krävs' : '',
    location: !form.value.location ? 'Plats krävs' : ''
  }
  
  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true

  const attendeeNames = boardMembers
    .filter(m => form.value.attendees.includes(m.id))
    .map(m => `${m.name} (${m.role})`)

  const content = `
# ${form.value.title}

**Datum:** ${form.value.date}  
**Tid:** ${form.value.time}  
**Plats:** ${form.value.location}

## Närvarande
${attendeeNames.join('\n')}

## Protokoll
${form.value.protocolItems.map((item, i) => `
### §${i + 1} ${item.title}

**Diskussion:**  
${item.discussion || 'Ingen diskussion antecknad'}

**Beslut:**  
${item.decision || 'Inget beslut fattat'}
`).join('\n')}

${form.value.nextMeeting ? `\n## Nästa möte\n${form.value.nextMeeting}` : ''}
  `.trim()

  documentsStore.addDocument({
    id: `doc-${Date.now()}`,
    title: form.value.title,
    type: 'protocol',
    description: `Protokoll från möte ${form.value.date}`,
    category: 'Protokoll',
    fileUrl: '',
    fileSize: content.length,
    fileType: 'text/markdown',
    uploadedBy: authStore.user?.id || 'unknown',
    uploadedAt: new Date().toISOString(),
    tags: ['Protokoll', 'Möte'],
    isPublic: false
  })

  loading.value = false
  emit('submitted')
  closeModal()
  alert('Protokoll skapat! ✓')
}

const closeModal = () => {
  isOpen.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    date: '',
    time: '',
    location: '',
    attendees: [],
    protocolItems: [{ title: '', discussion: '', decision: '' }],
    nextMeeting: ''
  }
  errors.value = {
    title: '',
    date: '',
    time: '',
    location: ''
  }
}
</script>
