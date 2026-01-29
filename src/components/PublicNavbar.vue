<template>
  <nav class="public-navbar bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">G</span>
          </div>
          <span class="text-xl font-bold text-accent">Grannskapet</span>
        </RouterLink>

        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="nav-link">Funktioner</a>
          <a href="#about" class="nav-link">Om oss</a>
          <a href="#contact" class="nav-link">Kontakt</a>
        </div>

        <div class="flex items-center gap-3">
          <RouterLink to="/login">
            <BaseButton variant="outline" size="md">
              Logga in
            </BaseButton>
          </RouterLink>
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 bg-white">
        <div class="container-custom py-4 space-y-2">
          <a href="#features" class="mobile-nav-link" @click="showMobileMenu = false">Funktioner</a>
          <a href="#about" class="mobile-nav-link" @click="showMobileMenu = false">Om oss</a>
          <a href="#contact" class="mobile-nav-link" @click="showMobileMenu = false">Kontakt</a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

<style scoped>
.nav-link {
  @apply text-navy font-medium hover:text-primary transition-colors;
}

.mobile-nav-link {
  @apply block text-navy font-medium hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-primary-50;
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
