<template>
  <div class="public-page-layout min-h-screen bg-gray-50">
    <!-- Public Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container-custom">
        <div class="flex items-center justify-between h-16">
          <RouterLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">G</span>
            </div>
            <span class="text-xl font-bold text-accent">Grannskapet</span>
          </RouterLink>
          
          <div class="flex items-center gap-4">
            <RouterLink to="/login" class="text-sm text-primary hover:text-primary-600 font-medium">
              Logga in
            </RouterLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot></slot>
    </main>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheFooter from '@/components/TheFooter.vue'
</script>
