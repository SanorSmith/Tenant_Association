<template>
  <PublicLayout>
    <div class="login-container min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <span class="text-white font-bold text-2xl">G</span>
          </div>
          <h1 class="text-3xl font-bold text-accent mb-2">Välkommen tillbaka</h1>
          <p class="text-textGray">Logga in på ditt konto</p>
        </div>

        <BaseCard padding="lg" shadow="lg">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <BaseInput
              v-model="email"
              type="email"
              label="E-postadress"
              placeholder="din@email.se"
              required
              :error="errors.email"
            />

            <BaseInput
              v-model="password"
              type="password"
              label="Lösenord"
              placeholder="••••••••"
              required
              :error="errors.password"
            />

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span class="text-sm text-navy">Kom ihåg mig</span>
              </label>
              <a href="#" class="text-sm text-primary hover:text-primary-600 transition-colors">
                Glömt lösenord?
              </a>
            </div>

            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              full-width
              :loading="loading"
            >
              Logga in
            </BaseButton>

            <div v-if="errors.general" class="p-4 bg-accent-50 border border-accent-200 rounded-lg">
              <p class="text-sm text-accent-700">{{ errors.general }}</p>
            </div>
          </form>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-sm font-medium text-blue-900 mb-2">Demo-inloggning</p>
              <p class="text-xs text-blue-700 mb-3">
                Fyll i valfri e-postadress och lösenord för att logga in i demo-läge.
              </p>
              <div class="space-y-1 text-xs text-blue-600">
                <p><strong>E-post:</strong> Din e-postadress</p>
                <p><strong>Lösenord:</strong> Ditt lösenord</p>
                <p class="mt-2 text-blue-500">✅ Alla kombinationer fungerar för demo</p>
              </div>
              
              <button 
                @click="clearAuthState"
                class="mt-3 w-full text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
              >
                Rensa autentisering (test)
              </button>
            </div>
          </div>
        </BaseCard>

        <p class="text-center mt-6 text-sm text-textGray">
          Har du inget konto?
          <a href="#" class="text-primary hover:text-primary-600 font-medium transition-colors">
            Kontakta din förening
          </a>
        </p>
      </div>
    </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PublicLayout from '@/layouts/PublicLayout.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const errors = ref({
  email: '',
  password: '',
  general: ''
})

const handleLogin = async () => {
  errors.value = { email: '', password: '', general: '' }

  if (!email.value) {
    errors.value.email = 'E-postadress krävs'
    return
  }

  if (!password.value) {
    errors.value.password = 'Lösenord krävs'
    return
  }

  loading.value = true

  setTimeout(() => {
    const success = authStore.login(email.value, password.value)
    
    if (success) {
      router.push('/dashboard')
    } else {
      errors.value.general = 'Inloggningen misslyckades. Försök igen.'
    }
    
    loading.value = false
  }, 1000)
}

const clearAuthState = () => {
  authStore.clearAuth()
  email.value = ''
  password.value = ''
  errors.value = { email: '', password: '', general: '' }
}
</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
