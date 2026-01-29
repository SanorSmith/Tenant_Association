<template>
  <div id="app" class="page-wrapper">
    <RouterView />
    <NotificationToast />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import NotificationToast from '@/components/NotificationToast.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
