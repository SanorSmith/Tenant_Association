<template>
  <div class="association-detail-page">
    <!-- Simple header for now -->
    <div class="container-custom py-8">
      <button 
        @click="goBack"
        class="flex items-center gap-2 text-primary mb-4 hover:underline"
      >
        ← Tillbaka till sökning
      </button>
      
      <div v-if="association" class="bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-4xl font-bold text-accent mb-4">
          {{ association.name }}
        </h1>
        
        <p class="text-lg text-textGray mb-2">
          📍 {{ association.address }}, {{ association.city }}
        </p>
        
        <p class="text-navy mb-6">
          {{ association.description }}
        </p>
        
        <div class="flex gap-8 text-sm text-textGray">
          <div>
            <strong class="text-navy">{{ association.totalApartments }}</strong> lägenheter
          </div>
          <div>
            <strong class="text-navy">{{ association.totalMembers }}</strong> medlemmar
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-xl text-textGray">Föreningen hittades inte</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAssociationsStore } from '@/stores/associations';

const route = useRoute();
const router = useRouter();

const association = ref<any>(null);

onMounted(() => {
  const id = route.params.id as string;
  const associationsStore = useAssociationsStore();
  
  // Get association from store
  association.value = associationsStore.getAssociationById(id);
  
  if (!association.value) {
    console.error('Association not found:', id);
  }
});

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.association-detail-page {
  min-height: calc(100vh - 200px);
  background: #f8f9fa;
}
</style>
