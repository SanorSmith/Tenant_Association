<template>
  <nav class="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-start gap-1 cursor-pointer group">
          <img alt="Hyresgästföreningen" class="hidden sm:block h-8 w-auto object-contain" src="https://hyresgaestfoereningen-lokalt.vercel.app/HGF_logo_RGB_POS.png">
          <img alt="Hyresgästföreningen" class="sm:hidden h-8 w-auto object-contain" src="https://hyresgaestfoereningen-lokalt.vercel.app/logo_mobil.png">
          <span class="text-[10px] font-semibold text-gray-400 mt-0.5 tracking-wide">Grannskapet</span>
        </RouterLink>

        <div class="hidden md:flex items-center gap-8">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/om-oss" class="nav-link">Om oss</RouterLink>
          <RouterLink to="/kontakt" class="nav-link">Kontakt</RouterLink>
        </div>

        <div class="flex items-center gap-3">
          <BaseButton variant="outline" size="md" @click="goToLogin" class="hidden md:block">
              Logga in
            </BaseButton>
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-background-tertiary transition-colors"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div v-if="showMobileMenu" class="md:hidden border-t border-border bg-white">
        <div class="container-custom py-4 space-y-2">
          <RouterLink to="/" class="mobile-nav-link" @click="toggleMobileMenu">Home</RouterLink>
          <RouterLink to="/om-oss" class="mobile-nav-link" @click="toggleMobileMenu">Om oss</RouterLink>
          <RouterLink to="/kontakt" class="mobile-nav-link" @click="toggleMobileMenu">Kontakt</RouterLink>
          <BaseButton variant="outline" size="md" class="w-full" @click="goToLoginMobile">
              Logga in
            </BaseButton>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'

const router = useRouter()
const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const goToLogin = () => {
  router.push('/login')
}

const goToLoginMobile = () => {
  showMobileMenu.value = false
  router.push('/login')
}

const navigateToSection = (sectionId: string) => {
  // If we're already on the landing page, just scroll to the section
  if (router.currentRoute.value.path === '/') {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    // Navigate to landing page with hash
    router.push(`/#${sectionId}`)
  }
}

const navigateToSectionMobile = (sectionId: string) => {
  showMobileMenu.value = false
  navigateToSection(sectionId)
}
</script>

<style scoped>
.nav-link {
  @apply text-navy font-medium hover:text-primary transition-colors duration-200;
}

.mobile-nav-link {
  @apply block text-navy font-medium hover:text-primary hover:bg-background-tertiary transition-colors duration-200 py-3 px-4 rounded-lg;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  max-height: 0;
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>
