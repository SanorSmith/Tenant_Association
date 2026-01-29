import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Premise } from '@/types'

export const usePremisesStore = defineStore('premises', () => {
  const premises = ref<Premise[]>([])

  const availablePremises = computed(() =>
    premises.value.filter(p => p.isAvailable)
  )

  const premisesByType = computed(() => {
    return (type: string) => premises.value.filter(p => p.type === type)
  })

  const initDemoData = () => {
    premises.value = []
  }

  const getPremiseById = (id: string): Premise | undefined => {
    return premises.value.find(p => p.id === id)
  }

  return {
    premises,
    availablePremises,
    premisesByType,
    initDemoData,
    getPremiseById
  }
})
