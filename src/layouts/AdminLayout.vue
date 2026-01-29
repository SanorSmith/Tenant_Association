<template>
  <div class="admin-layout min-h-screen flex">
    <TheSidebar />
    
    <div class="flex-1 flex flex-col lg:ml-64">
      <TheNavbar />
      
      <main class="flex-1 p-6 bg-gray-50">
        <slot />
      </main>
      
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheSidebar from '@/components/TheSidebar.vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>
