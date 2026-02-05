<template>
  <PublicLayout>
    <!-- Hero Section -->
    <section class="py-20 md:py-32 bg-gradient-to-br from-navy to-navy-800 text-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            Om <span class="text-orange-500">Hyresgästföreningen</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Sveriges största och äldsta hyresgästorganisation med över 100 års erfarenhet av att kämpa för hyresgästernas rättigheter
          </p>
        </div>
        
        <!-- Stats -->
        <div class="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-500 mb-2">500,000+</div>
            <div class="text-gray-300">Medlemmar</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-500 mb-2">100+</div>
            <div class="text-gray-300">År av erfarenhet</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-500 mb-2">290</div>
            <div class="text-gray-300">Lokala avdelningar</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-500 mb-2">95%</div>
            <div class="text-gray-300">Förhandlingsframgång</div>
          </div>
        </div>
      </div>
    </section>

    <!-- History Section -->
    <section class="py-20 bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-navy mb-6">Vår historia</h2>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hyresgästföreningen grundades 1923 under en tid när hyresgästernas villkor var extremt svåra. 
                Under efterkrigstidens bostadsbrist växte vi snabbt och blev en viktig röst för miljontals svenskar.
              </p>
              <p>
                Genom decennierna har vi drivit fram viktiga reformer som förbättrat hyresrätten, infört 
                hyresnämnder och skapat tryggare boendevillkor för hyresgäster i hela Sverige.
              </p>
              <p>
                Idag är vi en modern, professionell organisation som kombinerar över 100 års erfarenhet 
                med nutidens digitala verktyg och metoder.
              </p>
            </div>
          </div>
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                 alt="Historiskt bild från Hyresgästföreningen" 
                 class="rounded-2xl shadow-2xl w-full">
            <div class="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-xl shadow-xl">
              <div class="text-3xl font-bold">1923</div>
              <div class="text-sm">Grundades</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-navy mb-6">Vårt uppdrag</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Vi arbetar för ett samhälle där alla har tillgång till trygga, rimliga och hållbara bostäder
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-navy mb-4">Rimliga hyror</h3>
            <p class="text-gray-600">
              Vi förhandlar fram rättvisa hyror och ser till att hyresutvecklingen följer samhällets utveckling
            </p>
          </div>
          
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-navy mb-4">Bra boendestandard</h3>
            <p class="text-gray-600">
              Vi arbetar för att alla hyresbostäder ska ha god standard och vara säkra, hållbara och välskötta
            </p>
          </div>
          
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-navy mb-4">Inflytande</h3>
            <p class="text-gray-600">
              Vi ger hyresgäster inflytande över sitt boende och stärker deras ställning i samhället
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Organization Section -->
    <section class="py-20 bg-white">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <img src="https://images.unsplash.com/photo-1517048676732-a65130e97a53?w=600&h=400&fit=crop" 
                 alt="Hyresgästföreningen organisation" 
                 class="rounded-2xl shadow-2xl w-full">
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="text-4xl font-bold text-navy mb-6">Vår organisation</h2>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hyresgästföreningen är uppbyggd demokratiskt med lokala avdelningar över hela Sverige. 
                Varje avdelning har sitt eget styrelse och arbetar med lokala frågor som påverkar hyresgästerna 
                i området.
              </p>
              <p>
                På nationell nivå driver vi bostadspolitiska frågor och förhandlar om hyresvillkor med 
                fastighetsägare. Vi arbetar också för att påverka lagstiftningen till hyresgästernas fördel.
              </p>
              <p>
                Som medlem får du tillgång till juridisk rådgivning, hyresförhandlingar och ett starkt 
                nätverk av engagerade hyresgäster över hela landet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-navy text-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6">Våra värderingar</h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Vårt arbete grundas på starka principer som har guidat oss i över 100 år
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Solidaritet</h3>
            <p class="text-gray-300">
              Vi hjälper varandra och kämpar tillsammans för alla hyresgästers rättigheter
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Kunskap</h3>
            <p class="text-gray-300">
              Vi bygger på över 100 års erfarenhet och delar kunskap för att stärka hyresgäster
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Engagemang</h3>
            <p class="text-gray-300">
              Vi är engagerade i bostadsfrågor och arbetar aktivt för förändring
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Hållbarhet</h3>
            <p class="text-gray-300">
              Vi arbetar för ett hållbart samhälle med hållbara bostäder för framtida generationer
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-navy mb-6">Ledning och organisation</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Möt några av de personer som leder Hyresgästföreningens arbete
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b332c2ca?w=300&h=300&fit=crop" 
                 alt="VD" 
                 class="w-32 h-32 rounded-full mx-auto mb-6 object-cover">
            <h3 class="text-2xl font-bold text-navy mb-2">Marie Lindberg</h3>
            <p class="text-orange-500 font-semibold mb-4">Verkställande Direktör</p>
            <p class="text-gray-600">
              Har lett Hyresgästföreningen sedan 2018 med fokus på modernisering och medlemsnytta
            </p>
          </div>
          
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop" 
                 alt="Förbundsordförande" 
                 class="w-32 h-32 rounded-full mx-auto mb-6 object-cover">
            <h3 class="text-2xl font-bold text-navy mb-2">Anders Eriksson</h3>
            <p class="text-orange-500 font-semibold mb-4">Förbundsordförande</p>
            <p class="text-gray-600">
              Engagerad hyresgästaktivist i över 20 år, stark röst för hyresgästernas rättigheter
            </p>
          </div>
          
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
            <img src="https://images.unsplash.com/photo-1573496359147-b3d8f7c99ce9?w=300&h=300&fit=crop" 
                 alt="Juridisk chef" 
                 class="w-32 h-32 rounded-full mx-auto mb-6 object-cover">
            <h3 class="text-2xl font-bold text-navy mb-2">Anna Johansson</h3>
            <p class="text-orange-500 font-semibold mb-4">Juridisk Chef</p>
            <p class="text-gray-600">
              Expert på hyresrätt och förhandlingsfrågor, leder vårt juridiska team
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div class="container-custom text-center">
        <h2 class="text-4xl font-bold mb-6">Bli en del av vår rörelse</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Tillsammans kan vi göra skillnad. Bli medlem idag och få tillgång till juridisk rådgivning, 
          hyresförhandlingar och ett starkt nätverk.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton variant="primary" size="lg" class="bg-white text-orange-500 hover:bg-gray-100" @click="goToBecomeMember">
            Bli medlem nu
          </BaseButton>
          <BaseButton variant="outline" size="lg" class="border-white text-white hover:bg-white hover:text-orange-500" @click="goToContact">
            Kontakta oss
          </BaseButton>
        </div>
      </div>
    </section>
  </PublicLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const goToBecomeMember = () => {
  router.push('/bli-medlem')
}

const goToContact = () => {
  router.push('/kontakt')
}
</script>
