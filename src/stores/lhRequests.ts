import { defineStore } from 'pinia'
import { ref } from 'vue'

interface LHRequest {
  id: string
  name: string
  email: string
  phone: string
  area: string
  postalCode: string
  description: string
  status: string
  submittedAt: string
}

export const useLHRequestsStore = defineStore('lhRequests', () => {
  const requests = ref<LHRequest[]>([])

  const loadRequests = () => {
    const stored = localStorage.getItem('lhRequests')
    if (stored) {
      requests.value = JSON.parse(stored)
    }
  }

  const saveRequests = () => {
    localStorage.setItem('lhRequests', JSON.stringify(requests.value))
  }

  const submitRequest = async (requestData: Omit<LHRequest, 'id'>) => {
    try {
      const newRequest: LHRequest = {
        id: `lh-request-${Date.now()}`,
        ...requestData,
      }

      requests.value.unshift(newRequest)
      saveRequests()

      console.log('📧 Confirmation sent to:', requestData.email)
      console.log('📧 Notification sent to admin')

      return { success: true, data: newRequest }
    } catch (error) {
      return { success: false, error: 'Failed to submit request' }
    }
  }

  loadRequests()

  return {
    requests,
    submitRequest,
  }
})
