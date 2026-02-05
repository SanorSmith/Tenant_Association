<template>
  <PublicLayout>
    <div class="container-custom">
      <div class="text-center mb-16 mt-12">
        <h1 class="text-4xl font-bold text-black mb-8">Kontakta oss</h1>
        <p class="text-xl text-textGray max-w-2xl mx-auto">Vi är här för att hjälpa dig med dina frågor</p>
      </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Contact Information -->
      <div class="lg:col-span-1">
        <BaseCard padding="md">
          <h3 class="text-lg font-semibold text-navy mb-4">Kontaktinformation</h3>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold text-navy">E-post</h4>
              <p class="text-sm text-textGray">info@grannskapet.se</p>
              <p class="text-xs text-gray-500">Svar inom 24 timmar</p>
            </div>

            <div>
              <h4 class="font-semibold text-navy">Telefon</h4>
              <p class="text-sm text-textGray">08-123 456 78</p>
              <p class="text-xs text-gray-500">Mån-Fre 09:00-17:00</p>
            </div>

            <div>
              <h4 class="font-semibold text-navy">Besöksadress</h4>
              <p class="text-sm text-textGray">Storgatan 1</p>
              <p class="text-sm text-textGray">111 22 Stockholm</p>
              <p class="text-xs text-gray-500">Endast efter tidsbokning</p>
            </div>
          </div>
        </BaseCard>

        <!-- Support Hours -->
        <BaseCard padding="md" class="mt-6">
          <h3 class="text-lg font-semibold text-navy mb-4">Supporttider</h3>
          
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-navy">Måndag - Fredag</span>
              <span class="font-semibold">09:00 - 17:00</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-navy">Lördag</span>
              <span class="font-semibold">10:00 - 14:00</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-navy">Söndag</span>
              <span class="font-semibold text-gray-400">Stängt</span>
            </div>
          </div>

          <div class="mt-4 p-3 bg-blue-50 rounded-lg">
            <p class="text-xs text-blue-800">
              <strong>Akut support:</strong> För brådskande ärenden utanför öppettider, skicka e-post med ämnet "AKUT" så återkommer vi så snart som möjligt.
            </p>
          </div>
        </BaseCard>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <BaseCard padding="md">
          <h3 class="text-lg font-semibold text-navy mb-4">Skicka meddelande</h3>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-4">
              <BaseInput
                v-model="form.firstName"
                label="Förnamn"
                placeholder="Ditt förnamn"
                required
              />
              
              <BaseInput
                v-model="form.lastName"
                label="Efternamn"
                placeholder="Ditt efternamn"
                required
              />
            </div>

            <BaseInput
              v-model="form.email"
              type="email"
              label="E-post"
              placeholder="din.epost@exempel.se"
              required
            />

            <BaseInput
              v-model="form.phone"
              type="tel"
              label="Telefon (valfritt)"
              placeholder="070-123 45 67"
            />

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ämne</label>
              <select
                v-model="form.subject"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Välj ämne</option>
                <option value="support">Teknisk support</option>
                <option value="billing">Fakturering</option>
                <option value="feature">Förslag på funktion</option>
                <option value="other">Annat</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Meddelande</label>
              <textarea
                v-model="form.message"
                rows="6"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Beskriv ditt ärende så detaljerat som möjligt..."
                required
              ></textarea>
            </div>

            <div class="flex items-center gap-2">
              <input
                v-model="form.subscribe"
                type="checkbox"
                id="subscribe"
                class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label for="subscribe" class="text-sm text-gray-700">
                Ja, jag vill ta emot nyhetsbrev och uppdateringar
              </label>
            </div>

            <div class="flex gap-4">
              <BaseButton variant="primary" type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Skickar...' : 'Skicka meddelande' }}
              </BaseButton>
              <BaseButton variant="outline" type="button" @click="resetForm">
                Rensa formulär
              </BaseButton>
            </div>
          </form>
        </BaseCard>

        <!-- FAQ Section -->
        <BaseCard padding="md" class="mt-6">
          <h3 class="text-lg font-semibold text-navy mb-4">Vanliga frågor</h3>
          
          <div class="space-y-4">
            <div class="border rounded-lg">
              <button
                @click="toggleFAQ(0)"
                class="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span class="font-medium text-navy">Hur snabbt får jag svar på mina frågor?</span>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': expandedFAQ === 0 }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="expandedFAQ === 0" class="px-4 py-3 border-t bg-gray-50">
                <p class="text-sm text-gray-700">
                  Vi strävar efter att svara på alla e-postmeddelanden inom 24 timmar på vardagar. För akuta ärenden, ring oss direkt under supporttider.
                </p>
              </div>
            </div>

            <div class="border rounded-lg">
              <button
                @click="toggleFAQ(1)"
                class="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span class="font-medium text-navy">Kan jag boka ett möte med supporten?</span>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': expandedFAQ === 1 }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="expandedFAQ === 1" class="px-4 py-3 border-t bg-gray-50">
                <p class="text-sm text-gray-700">
                  Ja! Vi erbjuder videosamtal för mer komplexa frågor. Kontakta oss via e-post för att boka en tid som passar dig.
                </p>
              </div>
            </div>

            <div class="border rounded-lg">
              <button
                @click="toggleFAQ(2)"
                class="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span class="font-medium text-navy">Vilka betalningsmetoder accepterar ni?</span>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': expandedFAQ === 2 }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="expandedFAQ === 2" class="px-4 py-3 border-t bg-gray-50">
                <p class="text-sm text-gray-700">
                  Vi accepterar banköverföring, Swish och faktura för företagskunder. Alla betalningar hanteras säkert via våra partners.
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
    </div>
  </PublicLayout>
</template>

<style scoped>
.emoji-uncolored {
  filter: hue-rotate(200deg) saturate(1.5) brightness(1.1);
}

.emoji-blue {
  filter: hue-rotate(200deg) saturate(2);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

const isSubmitting = ref(false)
const expandedFAQ = ref<number | null>(null)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  subscribe: false
})

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // In a real app, this would send the form to your backend
  alert('Meddelandet har skickats! Vi återkommer så snart som möjligt.')
  
  resetForm()
  isSubmitting.value = false
}

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    subscribe: false
  }
}

const toggleFAQ = (index: number) => {
  expandedFAQ.value = expandedFAQ.value === index ? null : index
}
</script>
