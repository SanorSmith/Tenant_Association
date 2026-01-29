import { ref } from 'vue'
import { useDocumentsStore } from '@/stores/documents'
import type { Document } from '@/types'

export function useDocuments() {
  const store = useDocumentsStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getDocuments = () => {
    return store.documents
  }

  const uploadDocument = async (file: File, metadata: Partial<Document>) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        title: metadata.title || file.name,
        type: metadata.type || 'other',
        uploadDate: new Date().toISOString(),
        size: `${(file.size / 1024).toFixed(1)} KB`,
        url: URL.createObjectURL(file),
        fileName: file.name,
        description: metadata.description,
        tags: metadata.tags || [],
        isPublic: metadata.isPublic || false,
        uploadedBy: metadata.uploadedBy,
      }

      store.addDocument(newDocument)
      loading.value = false
      return { success: true, data: newDocument }
    } catch (err) {
      error.value = 'Failed to upload document'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const deleteDocument = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      store.deleteDocument(id)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to delete document'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const downloadDocument = (document: Document) => {
    const link = window.document.createElement('a')
    link.href = document.url || '#'
    link.download = document.fileName || document.title
    window.document.body.appendChild(link)
    link.click()
    window.document.body.removeChild(link)
  }

  return {
    loading,
    error,
    getDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument,
  }
}
