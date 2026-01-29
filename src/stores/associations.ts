import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Association } from '@/types'

export const useAssociationsStore = defineStore('associations', () => {
  const associations = ref<Association[]>([])
  const currentAssociation = ref<Association | null>(null)

  const initDemoData = () => {
    associations.value = []
    currentAssociation.value = null
  }

  const getAssociationById = (id: string): Association | undefined => {
    return associations.value.find(a => a.id === id)
  }

  const searchAssociations = (query: string): Association[] => {
    const lowerQuery = query.toLowerCase()
    return associations.value.filter(a => 
      a.name.toLowerCase().includes(lowerQuery) ||
      a.city.toLowerCase().includes(lowerQuery) ||
      a.address.toLowerCase().includes(lowerQuery)
    )
  }

  return {
    associations,
    currentAssociation,
    initDemoData,
    getAssociationById,
    searchAssociations
  }
})
