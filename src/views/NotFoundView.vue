<template>
  <div class="not-found-view min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-accent mb-4">404</h1>
      <p class="text-xl text-navy mb-8">Sidan kunde inte hittas</p>
      <button @click="goHome" class="btn-primary px-6 py-3">
        Tillbaka till startsidan
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
