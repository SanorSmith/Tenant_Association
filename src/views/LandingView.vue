<template>
  <PublicLayout>
    <section class="flex-grow flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-br from-gray-50 to-[#fef3ee]/30 min-h-[80vh]">
      <div class="w-full max-w-3xl text-center space-y-12 animate-fade-in-up">
        <div class="space-y-6">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Engagera dig <span class="text-[#ea580d]">lokalt</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hitta din lokala hyresgästförening (LH), se vad som händer i ditt område, och var med och påverka.
          </p>
        </div>
        <form class="relative max-w-lg mx-auto w-full" @submit.prevent="handleSearch">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 group-focus-within:text-[#ea580d] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              class="block w-full pl-10 sm:pl-12 pr-28 sm:pr-32 py-4 bg-white border border-gray-300 rounded-full shadow-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ea580d] focus:border-transparent transition-shadow text-base sm:text-lg"
              placeholder="Postnummer eller stad..."
              autocomplete="off"
              type="text"
            />
            <button
              type="submit"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ea580d] hover:bg-[#d14f0b] text-white font-bold px-4 sm:px-6 py-2.5 rounded-full transition-colors shadow-sm text-sm sm:text-base"
            >
              Sök
            </button>
          </div>
        </form>
      </div>
    </section>
  </PublicLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/hitta-avdelning?q=${encodeURIComponent(searchQuery.value)}`)
  }
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

