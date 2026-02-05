<template>
  <PublicLayout>
    <section class="py-16 md:py-24 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12 md:mb-16">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Våra <span class="text-cta">tjänster</span>
          </h1>
          <p class="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto">
            Vi erbjuder ett brett utbud av tjänster för att stärka dina rättigheter som hyresgäst
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <div v-for="service in services" :key="service.title" class="service-card">
            <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
              <component :is="service.icon" class="w-8 h-8 text-primary" />
            </div>
            <h2 class="text-2xl font-bold text-text-primary mb-4">{{ service.title }}</h2>
            <p class="text-text-muted leading-relaxed mb-6">{{ service.description }}</p>
            <ul class="space-y-3">
              <li v-for="item in service.items" :key="item" class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-text-secondary">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-16 text-center">
          <BaseButton variant="primary" size="lg" class="!bg-cta hover:!bg-cta-600" @click="goToBecomeMember">
            Bli medlem idag
          </BaseButton>
        </div>
      </div>
    </section>
  </PublicLayout>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const ScaleIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' })
])

const ShieldIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const GiftIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' })
])

const BookIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])

const services = [
  {
    title: 'Hyresförhandlingar',
    description: 'Vi förhandlar om hyror och villkor för att säkerställa rimliga kostnader och bra boendeförhållanden för alla medlemmar.',
    icon: ScaleIcon,
    items: [
      'Årliga hyresförhandlingar',
      'Granskning av hyreshöjningar',
      'Förhandling om underhåll och reparationer',
      'Kollektiva avtal med hyresvärdar'
    ]
  },
  {
    title: 'Juridisk rådgivning',
    description: 'Få professionell juridisk hjälp vid tvister med hyresvärden. Vi har lång erfarenhet av hyresrätt och står på din sida.',
    icon: ShieldIcon,
    items: [
      'Kostnadsfri juridisk rådgivning',
      'Hjälp vid tvister och konflikter',
      'Representation i hyresnämnden',
      'Stöd vid uppsägningar'
    ]
  },
  {
    title: 'Medlemsförmåner',
    description: 'Tillgång till rabatter, försäkringar och andra förmåner som gör ditt boende tryggare och billigare.',
    icon: GiftIcon,
    items: [
      'Hemförsäkring med rabatt',
      'Rabatter hos samarbetspartners',
      'Rättsskydd vid hyrestvister',
      'Tillgång till medlemstidning'
    ]
  },
  {
    title: 'Utbildning & Information',
    description: 'Kurser, seminarier och information om dina rättigheter och skyldigheter som hyresgäst.',
    icon: BookIcon,
    items: [
      'Kurser om hyresrätt',
      'Informationsmöten',
      'Digital kunskapsbank',
      'Personlig rådgivning'
    ]
  }
]

const goToBecomeMember = () => {
  router.push('/bli-medlem')
}
</script>

<style scoped>
.service-card {
  @apply p-8 bg-background-secondary rounded-2xl border border-border hover:border-primary-300 hover:shadow-lg transition-all duration-300 ease-smooth;
}
</style>
