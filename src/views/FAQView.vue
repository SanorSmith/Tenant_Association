<template>
  <PublicLayout>
    <div class="container-custom">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-accent mb-4">Vanliga frågor</h1>
        <p class="text-xl text-textGray max-w-2xl mx-auto">Hitta svar på de vanligaste frågorna om Grannskapet</p>
      </div>

    <!-- Search FAQ -->
    <BaseCard padding="md" class="mb-6">
      <BaseInput 
        v-model="searchQuery" 
        type="search" 
        placeholder="Sök i FAQ..." 
        class="mb-4"
      />
      <div class="flex gap-4">
        <BaseButton variant="primary" @click="searchFAQ">Sök</BaseButton>
        <BaseButton variant="outline" @click="clearSearch">Rensa</BaseButton>
      </div>
    </BaseCard>

    <!-- FAQ Categories -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <BaseButton 
        :variant="selectedCategory === 'komma-igang' ? 'primary' : 'outline'"
        @click="filterCategory('komma-igang')"
        size="sm"
      >
        Komma igång
      </BaseButton>
      <BaseButton 
        :variant="selectedCategory === 'konto' ? 'primary' : 'outline'"
        @click="filterCategory('konto')"
        size="sm"
      >
        Konto & Användare
      </BaseButton>
      <BaseButton 
        :variant="selectedCategory === 'forening' ? 'primary' : 'outline'"
        @click="filterCategory('forening')"
        size="sm"
      >
        Föreningshantering
      </BaseButton>
      <BaseButton 
        :variant="selectedCategory === 'teknisk' ? 'primary' : 'outline'"
        @click="filterCategory('teknisk')"
        size="sm"
      >
        Teknisk support
      </BaseButton>
    </div>

    <!-- FAQ Items -->
    <BaseCard padding="md">
      <h3 class="text-lg font-semibold text-navy mb-4">
        {{ selectedCategory ? getCategoryName(selectedCategory) : 'Alla frågor' }}
        ({{ filteredFAQs.length }} frågor)
      </h3>
      
      <div v-if="filteredFAQs.length === 0" class="text-center py-8 text-textGray">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>Inga frågor hittades som matchar din sökning.</p>
      </div>
      
      <div v-else class="space-y-4">
        <div 
          v-for="faq in filteredFAQs" 
          :key="faq.id"
          class="border rounded-lg overflow-hidden"
        >
          <button
            @click="toggleFAQ(faq.id)"
            class="w-full px-4 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start gap-3">
              <span class="text-2xl emoji-uncolored">{{ faq.icon }}</span>
              <div class="flex-1">
                <h4 class="font-medium text-navy">{{ faq.question }}</h4>
              </div>
            </div>
            <svg 
              class="w-5 h-5 text-gray-400 transition-transform flex-shrink-0"
              :class="{ 'rotate-180': expandedFAQ === faq.id }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div v-if="expandedFAQ === faq.id" class="px-4 py-4 border-t bg-gray-50">
            <div class="prose max-w-none text-sm text-gray-700" v-html="faq.answer"></div>
            
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center gap-4 text-xs text-gray-500">
                <span>{{ faq.helpful }} hjälpsamt</span>
                <span>{{ faq.views }} visningar</span>
                <span>{{ formatDate(faq.updatedAt) }}</span>
              </div>
              <div class="flex gap-2">
                <BaseButton variant="outline" size="sm" @click="markHelpful(faq.id)">
                  Hjälpsamt
                </BaseButton>
                <BaseButton variant="outline" size="sm" @click="reportIssue(faq.id)">
                  Rapportera problem
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Contact Support -->
    <BaseCard padding="md" class="mt-6">
      <div class="text-center">
        <h3 class="text-lg font-semibold text-navy mb-2">Hittade du inte svaret du letade efter?</h3>
        <p class="text-textGray mb-4">Vår supportteam är här för att hjälpa dig!</p>
        <div class="flex gap-3 justify-center">
          <BaseButton variant="primary" @click="$router.push('/kontakt')">
            Kontakta support
          </BaseButton>
          <BaseButton variant="outline" @click="$router.push('/hjalpcenter')">
            Besök hjälpcenter
          </BaseButton>
        </div>
      </div>
    </BaseCard>
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
import { ref, computed } from 'vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseBadge from '@/components/BaseBadge.vue'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  icon: string
  helpful: number
  views: number
  updatedAt: string
}

const searchQuery = ref('')
const selectedCategory = ref('')
const expandedFAQ = ref<string | null>(null)

const faqs = ref<FAQ[]>([
  {
    id: '1',
    question: 'Hur kommer jag igång med Grannskapet?',
    answer: `
      <p>Att komma igång med Grannskapet är enkelt! Följ dessa steg:</p>
      <ol>
        <li>Skapa ett konto med din e-postadress</li>
        <li>Verifiera din e-post</li>
        <li>Logga in och fyll i din profil</li>
        <li>Bjud in andra styrelsemedlemmar</li>
        <li>Börja använda funktionerna för möten, dokument och aktiviteter</li>
      </ol>
      <p>Vi har även en <a href="/hjalpcenter">detaljerad guide</a> som tar dig igenom varje steg.</p>
    `,
    category: 'komma-igang',
    icon: '🚀',
    helpful: 45,
    views: 234,
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    question: 'Vilka roller finns det i systemet?',
    answer: `
      <p>Grannskapet har flera roller för att passa olika behov:</p>
      <ul>
        <li><strong>Ordförande:</strong> Full administratörsåtkomst, kan hantera allt i föreningen</li>
        <li><strong>Styrelsemedlem:</strong> Kan se dokument, delta i möten, skapa aktiviteter</li>
        <li><strong>Sekreterare:</strong> Kan skapa och hantera dokument och protokoll</li>
        <li><strong>Kassör:</strong> Tillgång till ekonomiska översikter och budget</li>
        <li><strong>Medlem:</strong> Kan se publika dokument och delta i aktiviteter</li>
      </ul>
    `,
    category: 'konto',
    icon: '👤',
    helpful: 38,
    views: 189,
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    question: 'Hur skapar jag ett möte?',
    answer: `
      <p>För att skapa ett möte i Grannskapet:</p>
      <ol>
        <li>Gå till "Möten" i menyn</li>
        <li>Klicka på "Skapa nytt möte"</li>
        <li>Fyll i mötesinformation (datum, tid, plats, beskrivning)</li>
        <li>Välj vilka som ska bjudas in</li>
        <li>Spara mötet - inbjudningar skickas automatiskt</li>
      </ol>
      <p>Systemet skickar automatiskt inbjudningar via e-post och påminnelser dagen innan mötet.</p>
    `,
    category: 'forening',
    icon: '📅',
    helpful: 52,
    views: 267,
    updatedAt: '2024-01-22'
  },
  {
    id: '4',
    question: 'Kan jag skapa egna dokumentmallar?',
    answer: `
      <p>Ja! Grannskapet stöder anpassade dokumentmallar:</p>
      <ul>
        <li>Gå till "Dokument" och välj "Mallar"</li>
        <li>Klicka på "Skapa ny mall"</li>
        <li>Välj dokumenttyp (agenda, protokoll, rapport etc.)</li>
        <li>Skapa din mall med platshållare för dynamiskt innehåll</li>
        <li>Spara mallen för framtida användning</li>
      </ul>
      <p>Du kan också dela mallar med andra föreningar i din organisation.</p>
    `,
    category: 'forening',
    icon: '📄',
    helpful: 29,
    views: 145,
    updatedAt: '2024-01-19'
  },
  {
    id: '5',
    question: 'Vad gör jag om jag glömt mitt lösenord?',
    answer: `
      <p>Att återställa ditt lösenord är enkelt:</p>
      <ol>
        <li>Gå till inloggningssidan</li>
        <li>Klicka på "Glömt lösenord?"</li>
        <li>Ange din e-postadress</li>
        <li>Kontrollera din inkorg för återställningslänk</li>
        <li>Följ länken och skapa ett nytt lösenord</li>
      </ol>
      <p><strong>Obs:</strong> Återställningslänken är giltig i 24 timmar. Om du inte får e-postmeddelandet, kontrollera din skräppost.</p>
    `,
    category: 'konto',
    icon: '🔐',
    helpful: 67,
    views: 423,
    updatedAt: '2024-01-25'
  },
  {
    id: '6',
    question: 'Hur fungerar bokning av lokaler?',
    answer: `
      <p>Lokalbokning i Grannskapet fungerar så här:</p>
      <ul>
        <li>Registrera era lokaler med beskrivning och regler</li>
        <li>Sätt tillgängliga tider i kalendern</li>
        <li>Medlemmar kan se tillgänglighet och skicka bokningsförfrågningar</li>
        <li>Styrelsen godkänner eller avslår förfrågningar</li>
        <li>Automatiska bekräftelser skickas till bokaren</li>
      </ul>
      <p>Systemet hanterar även konflikter och dubbelbokningar automatiskt.</p>
    `,
    category: 'forening',
    icon: '🏢',
    helpful: 41,
    views: 198,
    updatedAt: '2024-01-21'
  },
  {
    id: '7',
    question: 'Vilka webbläsare stöds?',
    answer: `
      <p>Grannskapet fungerar bäst i moderna webbläsare:</p>
      <ul>
        <li>Chrome (version 90+)</li>
        <li>Firefox (version 88+)</li>
        <li>Safari (version 14+)</li>
        <li>Edge (version 90+)</li>
      </ul>
      <p>Vi rekommenderar att alltid använda den senaste versionen av din webbläsare för bästa säkerhet och funktionalitet.</p>
    `,
    category: 'teknisk',
    icon: '🌐',
    helpful: 23,
    views: 156,
    updatedAt: '2024-01-17'
  },
  {
    id: '8',
    question: 'Hur säker är min data?',
    answer: `
      <p>Datasäkerhet är vår högsta prioritet:</p>
      <ul>
        <li>All data krypteras med SSL/TLS</li>
        <li>Regelbundna säkerhetskopior</li>
        <li>GDPR-kompatibel hantering</li>
        <li>Rollbaserad åtkomstkontroll</li>
        <li>Tvåfaktorsautentisering tillgängligt</li>
      </ul>
      <p>Vi följer alla svenska lagar och regler för personlig data och har egna servrar inom EU.</p>
    `,
    category: 'teknisk',
    icon: '🔒',
    helpful: 58,
    views: 312,
    updatedAt: '2024-01-24'
  }
])

const filteredFAQs = computed(() => {
  let filtered = faqs.value

  if (selectedCategory.value) {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    'komma-igang': 'Komma igång',
    'konto': 'Konto & Användare',
    'forening': 'Föreningshantering',
    'teknisk': 'Teknisk support'
  }
  return names[category] || category
}

const getCategoryVariant = (category: string) => {
  const variants: Record<string, string> = {
    'komma-igang': 'success',
    'konto': 'info',
    'forening': 'warning',
    'teknisk': 'danger'
  }
  return variants[category] || 'info'
}

const filterCategory = (category: string) => {
  selectedCategory.value = selectedCategory.value === category ? '' : category
}

const searchFAQ = () => {
  // Search is handled by computed property
}

const clearSearch = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

const toggleFAQ = (id: string) => {
  expandedFAQ.value = expandedFAQ.value === id ? null : id
  
  // Increment views when FAQ is opened
  if (expandedFAQ.value === id) {
    const faq = faqs.value.find(f => f.id === id)
    if (faq) {
      faq.views++
    }
  }
}

const markHelpful = (id: string) => {
  const faq = faqs.value.find(f => f.id === id)
  if (faq) {
    faq.helpful++
    alert('Tack för din feedback! Detta hjälper oss att förbättra vårt innehåll.')
  }
}

const reportIssue = (id: string) => {
  const faq = faqs.value.find(f => f.id === id)
  if (faq) {
    alert(`Tack för att du rapporterar ett problem med: "${faq.question}". Vi kommer att granska detta så snart som möjligt.`)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('sv-SE')
}
</script>
