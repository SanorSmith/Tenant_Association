<template>
  <div class="public-layout min-h-screen flex flex-col">
    <PublicNavbar />
    
    <main class="flex-1">
      <slot></slot>
    </main>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>
