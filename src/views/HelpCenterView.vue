<template>
  <PublicLayout>
    <div class="container-custom">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-accent mb-4">Hjälpcenter</h1>
        <p class="text-xl text-textGray max-w-2xl mx-auto">Hitta svar på dina frågor och få support</p>
      </div>

    <!-- Search Help -->
    <BaseCard padding="md" class="mb-6">
      <BaseInput 
        v-model="searchQuery" 
        type="search" 
        placeholder="Sök hjälpartiklar..." 
        class="mb-4"
      />
      <div class="grid md:grid-cols-3 gap-4">
        <BaseButton variant="primary" @click="searchHelp">Sök</BaseButton>
        <BaseButton variant="outline" @click="searchQuery = ''">Rensa</BaseButton>
        <BaseButton variant="outline" @click="showContactForm = true">Kontakta support</BaseButton>
      </div>
    </BaseCard>

    <!-- Help Categories -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <BaseCard padding="md" hover class="cursor-pointer" @click="filterCategory('komma-igang')">
        <h3 class="text-lg font-semibold text-navy mb-2">Komma igång</h3>
        <p class="text-sm text-textGray">Snabbstartsguide för nya användare</p>
      </BaseCard>

      <BaseCard padding="md" hover class="cursor-pointer" @click="filterCategory('managing-association')">
        <h3 class="text-lg font-semibold text-navy mb-2">Föreningshantering</h3>
        <p class="text-sm text-textGray">Administrera din bostadsrättsförening</p>
      </BaseCard>

      <BaseCard padding="md" hover class="cursor-pointer" @click="filterCategory('documents')">
        <h3 class="text-lg font-semibold text-navy mb-2">Dokument</h3>
        <p class="text-sm text-textGray">Skapa och hantera dokument</p>
      </BaseCard>

      <BaseCard padding="md" hover class="cursor-pointer" @click="filterCategory('meetings')">
        <h3 class="text-lg font-semibold text-navy mb-2">Möten</h3>
        <p class="text-sm text-textGray">Planera och genomföra möten</p>
      </BaseCard>

      <BaseCard padding="md" hover class="cursor-pointer" @click="filterCategory('activities')">
        <h3 class="text-lg font-semibold text-navy mb-2">Aktiviteter</h3>
        <p class="text-sm text-textGray">Organisera gemensamma aktiviteter</p>
      </BaseCard>

      <BaseCard padding="md" hover class="cursor-pointer" @click="filterCategory('technical-support')">
        <h3 class="text-lg font-semibold text-navy mb-2">Teknisk support</h3>
        <p class="text-sm text-textGray">Hjälp med tekniska problem</p>
      </BaseCard>
    </div>

    <!-- Help Articles -->
    <BaseCard padding="md">
      <h3 class="text-lg font-semibold text-navy mb-4">Hjälpartiklar</h3>
      
      <div v-if="filteredArticles.length === 0" class="text-center py-8 text-textGray">
        Inga hjälpartiklar hittades.
      </div>
      
      <div v-else class="space-y-4">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          @click="openArticle(article)"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-semibold text-navy">{{ article.title }}</h4>
            <BaseBadge :variant="article.category === 'komma-igang' ? 'success' : 'info'" size="sm">
              {{ getCategoryName(article.category) }}
            </BaseBadge>
          </div>
          <p class="text-sm text-textGray mb-2">{{ article.excerpt }}</p>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span>{{ article.views }} visningar</span>
            <span>{{ formatDate(article.updatedAt) }}</span>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Contact Form Modal -->
    <BaseModal v-model="showContactForm" title="Kontakta support" size="md">
      <form @submit.prevent="submitContact" class="space-y-4">
        <BaseInput
          v-model="contactForm.name"
          label="Namn"
          placeholder="Ditt namn"
          required
        />
        
        <BaseInput
          v-model="contactForm.email"
          type="email"
          label="E-post"
          placeholder="din.epost@exempel.se"
          required
        />
        
        <BaseInput
          v-model="contactForm.subject"
          label="Ämne"
          placeholder="Vad gäller det?"
          required
        />
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Meddelande</label>
          <textarea
            v-model="contactForm.message"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Beskriv ditt ärende..."
            required
          ></textarea>
        </div>
      </form>
      
      <template #footer>
        <div class="flex gap-3">
          <BaseButton variant="secondary" @click="showContactForm = false">
            Avbryt
          </BaseButton>
          <BaseButton variant="primary" @click="submitContact">
            Skicka meddelande
          </BaseButton>
        </div>
      </template>
    </BaseModal>
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
import BaseModal from '@/components/BaseModal.vue'
import BaseBadge from '@/components/BaseBadge.vue'

interface HelpArticle {
  id: string
  title: string
  excerpt: string
  category: string
  content: string
  views: number
  updatedAt: string
}

const searchQuery = ref('')
const selectedCategory = ref('')
const showContactForm = ref(false)

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const helpArticles = ref<HelpArticle[]>([
  {
    id: '1',
    title: 'Komma igång med Grannskapet',
    excerpt: 'En snabbguide för att komma igång med plattformen och skapa ditt konto.',
    category: 'komma-igang',
    content: 'Detaljerad instruktion för att komma igång...',
    views: 245,
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Skapa din första agenda',
    excerpt: 'Lär dig hur du skapar och hanterar mötesagendor med våra mallar.',
    category: 'documents',
    content: 'Steg-för-steg guide för agenda...',
    views: 189,
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Boka lokaler för möten',
    excerpt: 'Så här bokar du föreningens lokaler för möten och aktiviteter.',
    category: 'managing-association',
    content: 'Guide för lokalbokning...',
    views: 156,
    updatedAt: '2024-01-18'
  },
  {
    id: '4',
    title: 'Planera och skapa aktiviteter',
    excerpt: 'Organisera föreningens aktiviteter och bjöd in medlemmar.',
    category: 'activities',
    content: 'Aktivitetsplanering guide...',
    views: 134,
    updatedAt: '2024-01-22'
  },
  {
    id: '5',
    title: 'Felsökning: Inloggning fungerar inte',
    excerpt: 'Vanliga problem och lösningar för inloggningsproblem.',
    category: 'technical',
    content: 'Felsökningsguide för inloggning...',
    views: 98,
    updatedAt: '2024-01-25'
  }
])

const filteredArticles = computed(() => {
  let articles = helpArticles.value

  if (selectedCategory.value) {
    articles = articles.filter(article => article.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    articles = articles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query)
    )
  }

  return articles
})

const getCategoryName = (category: string) => {
  const names: Record<string, string> = {
    'komma-igang': 'Komma igång',
    'managing-association': 'Föreningshantering',
    'documents': 'Dokument',
    'meetings': 'Möten',
    'activities': 'Aktiviteter',
    'technical': 'Teknisk support'
  }
  return names[category] || category
}

const filterCategory = (category: string) => {
  selectedCategory.value = category
}

const searchHelp = () => {
  // Search is handled by computed property
}

const openArticle = (article: HelpArticle) => {
  // In a real app, this would navigate to the article
  alert(`Öppnar artikel: ${article.title}`)
}

const submitContact = () => {
  // In a real app, this would send the form
  alert('Supportärende har skickats! Vi återkommer så snart som möjligt.')
  showContactForm.value = false
  contactForm.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('sv-SE')
}
</script>
