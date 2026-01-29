import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Document } from '@/types'

export const useDocumentsStore = defineStore('documents', () => {
  const documents = ref<Document[]>([])

  const documentsByType = computed(() => {
    return (type: string) => documents.value.filter(d => d.type === type)
  })

  const publicDocuments = computed(() => 
    documents.value.filter(d => d.isPublic)
  )

  const initDemoData = () => {
    documents.value = []
  }

  const getDocumentById = (id: string): Document | undefined => {
    return documents.value.find(d => d.id === id)
  }

  const addDocument = (document: Document) => {
    documents.value.unshift(document)
  }

  const searchDocuments = (query: string): Document[] => {
    const lowerQuery = query.toLowerCase()
    return documents.value.filter(d =>
      d.title.toLowerCase().includes(lowerQuery) ||
      d.description?.toLowerCase().includes(lowerQuery) ||
      d.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  const deleteDocument = (id: string) => {
    const index = documents.value.findIndex(d => d.id === id)
    if (index !== -1) {
      documents.value.splice(index, 1)
    }
  }

  return {
    documents,
    documentsByType,
    publicDocuments,
    initDemoData,
    getDocumentById,
    addDocument,
    searchDocuments,
    deleteDocument
  }
})
