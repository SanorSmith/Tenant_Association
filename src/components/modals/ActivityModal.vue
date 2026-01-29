<template>
  <BaseModal v-model="isOpen" title="Skapa aktivitet" size="lg">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-navy border-b pb-2">Grundinformation</h3>
          
          <BaseInput
            v-model="form.title"
            label="Aktivitetens titel"
            placeholder="Ange namn på aktiviteten"
            required
            :error="errors.title"
          />
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-navy">
              Typ av aktivitet <span class="text-accent">*</span>
            </label>
            <select
              v-model="form.type"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            >
              <option value="">Välj typ</option>
              <option value="social">Socialt evenemang</option>
              <option value="maintenance">Underhåll/Städning</option>
              <option value="meeting">Möte</option>
              <option value="celebration">Firande/Högtid</option>
              <option value="sports">Idrott/Motion</option>
              <option value="other">Annat</option>
            </select>
            <p v-if="errors.type" class="text-sm text-accent">{{ errors.type }}</p>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-navy">
              Beskrivning <span class="text-accent">*</span>
            </label>
            <textarea
              v-model="form.description"
              rows="4"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              placeholder="Beskriv aktiviteten i detalj..."
            ></textarea>
            <p v-if="errors.description" class="text-sm text-accent">{{ errors.description }}</p>
          </div>
        </div>
        
        <!-- Schedule and Location -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-navy border-b pb-2">Tid och plats</h3>
          
          <BaseInput
            v-model="form.date"
            label="Datum"
            type="date"
            required
            :error="errors.date"
          />
          
          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              v-model="form.startTime"
              label="Starttid"
              type="time"
              required
              :error="errors.startTime"
            />
            
            <BaseInput
              v-model="form.endTime"
              label="Sluttid"
              type="time"
              required
              :error="errors.endTime"
            />
          </div>
          
          <BaseInput
            v-model="form.location"
            label="Plats"
            placeholder="Var ska aktiviteten hållas?"
            required
            :error="errors.location"
          />
          
          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              v-model="form.maxParticipants"
              label="Max antal deltagare"
              type="number"
              min="1"
              placeholder="0 = obegränsat"
              :error="errors.maxParticipants"
            />
            
            <BaseInput
              v-model="form.cost"
              label="Kostnad (kr)"
              type="number"
              min="0"
              placeholder="0 = gratis"
              :error="errors.cost"
            />
          </div>
        </div>
      </div>
      
      <!-- Budget and Organization -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-navy border-b pb-2">Budget och organisation</h3>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-navy">Budgetkategori</label>
            <select
              v-model="form.budgetCategory"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            >
              <option value="">Välj kategori</option>
              <option value="sociala-aktiviteter">Sociala aktiviteter</option>
              <option value="underhåll">Underhåll</option>
              <option value="driftskostnader">Driftskostnader</option>
              <option value="fastighetsunderhåll">Fastighetsunderhåll</option>
              <option value="övrigt">Övrigt</option>
            </select>
          </div>
          
          <BaseInput
            v-model="form.organizer"
            label="Organisatör"
            placeholder="Vem ansvarar för aktiviteten?"
            required
            :error="errors.organizer"
          />
        </div>
        
        <!-- Requirements and Equipment -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-navy border-b pb-2">Krav och utrustning</h3>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-navy">Särskilda krav</label>
            <div class="space-y-2">
              <div v-for="(req, index) in form.requirements" :key="index" class="flex gap-2">
                <BaseInput
                  v-model="form.requirements[index]"
                  placeholder="Ange krav"
                  class="flex-1"
                />
                <BaseButton
                  type="button"
                  variant="outline"
                  size="sm"
                  @click="removeRequirement(index)"
                >
                  ✕
                </BaseButton>
              </div>
              <BaseButton
                type="button"
                variant="outline"
                size="sm"
                @click="addRequirement"
              >
                + Lägg till krav
              </BaseButton>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-navy">Utrustning som behövs</label>
            <div class="space-y-2">
              <div v-for="(eq, index) in form.equipment" :key="index" class="flex gap-2">
                <BaseInput
                  v-model="form.equipment[index]"
                  placeholder="Ange utrustning"
                  class="flex-1"
                />
                <BaseButton
                  type="button"
                  variant="outline"
                  size="sm"
                  @click="removeEquipment(index)"
                >
                  ✕
                </BaseButton>
              </div>
              <BaseButton
                type="button"
                variant="outline"
                size="sm"
                @click="addEquipment"
              >
                + Lägg till utrustning
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notes -->
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-navy">Anteckningar</label>
        <textarea
          v-model="form.notes"
          rows="3"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          placeholder="Övrig information som är viktig för aktiviteten..."
        ></textarea>
      </div>
    </form>
    
    <template #footer>
      <BaseButton variant="secondary" @click="closeModal">
        Avbryt
      </BaseButton>
      
      <BaseButton @click="handleSubmit" :loading="loading">
        Skapa aktivitet
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useActivitiesStore } from '@/stores/activities'
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

const authStore = useAuthStore()
const activitiesStore = useActivitiesStore()

const loading = ref(false)
const isOpen = ref(props.modelValue)

const form = ref({
  title: '',
  description: '',
  type: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  maxParticipants: '',
  cost: '',
  budgetCategory: '',
  organizer: '',
  requirements: [''] as string[],
  equipment: [''] as string[],
  notes: ''
})

const errors = ref({
  title: '',
  description: '',
  type: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  organizer: ''
})

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
  if (newVal) {
    // Pre-fill organizer with current user
    if (authStore.user) {
      form.value.organizer = authStore.user.name
    }
  }
})

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

const addRequirement = () => {
  form.value.requirements.push('')
}

const removeRequirement = (index: number) => {
  form.value.requirements.splice(index, 1)
}

const addEquipment = () => {
  form.value.equipment.push('')
}

const removeEquipment = (index: number) => {
  form.value.equipment.splice(index, 1)
}

const validate = () => {
  errors.value = {
    title: !form.value.title ? 'Titel krävs' : '',
    description: !form.value.description ? 'Beskrivning krävs' : '',
    type: !form.value.type ? 'Typ krävs' : '',
    date: !form.value.date ? 'Datum krävs' : '',
    startTime: !form.value.startTime ? 'Starttid krävs' : '',
    endTime: !form.value.endTime ? 'Sluttid krävs' : '',
    location: !form.value.location ? 'Plats krävs' : '',
    organizer: !form.value.organizer ? 'Organisatör krävs' : ''
  }
  
  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true

  const result = await activitiesStore.createActivity({
    title: form.value.title,
    description: form.value.description,
    type: form.value.type as any,
    date: form.value.date,
    startTime: form.value.startTime,
    endTime: form.value.endTime,
    location: form.value.location,
    maxParticipants: form.value.maxParticipants ? parseInt(form.value.maxParticipants) : undefined,
    cost: form.value.cost ? parseInt(form.value.cost) : undefined,
    budgetCategory: form.value.budgetCategory || undefined,
    organizer: form.value.organizer,
    organizerId: authStore.user?.id || 'unknown',
    status: 'planning',
    requirements: form.value.requirements.filter(req => req.trim() !== ''),
    equipment: form.value.equipment.filter(eq => eq.trim() !== ''),
    notes: form.value.notes || undefined
  })

  loading.value = false
  
  if (result.success) {
    emit('submitted')
    closeModal()
    alert('Aktivitet skapad! ✓\n\nDu kan nu bjuda in deltagare och planera vidare.')
  } else {
    alert('Kunde inte skapa aktivitet. Försök igen.')
  }
}

const closeModal = () => {
  isOpen.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    maxParticipants: '',
    cost: '',
    budgetCategory: '',
    organizer: '',
    requirements: [''],
    equipment: [''],
    notes: ''
  }
  errors.value = {
    title: '',
    description: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    organizer: ''
  }
}
</script>
