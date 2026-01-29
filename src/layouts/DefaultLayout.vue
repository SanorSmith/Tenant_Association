<template>
  <div class="default-layout min-h-screen flex">
    <TheSidebar />
    
    <div class="flex-1 flex flex-col lg:ml-64">
      <TheNavbar />
      
      <main class="main-content flex-1 bg-gray-50">
        <div class="container-custom py-6">
          <slot></slot>
        </div>
      </main>
      
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>
