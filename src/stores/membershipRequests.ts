import { defineStore } from 'pinia'
import { ref } from 'vue'

interface MembershipRequest {
  id: string
  associationId?: string
  name: string
  email: string
  phone: string
  interests: string[]
  message: string
  status: string
  submittedAt: string
}

export const useMembershipRequestsStore = defineStore('membershipRequests', () => {
  const requests = ref<MembershipRequest[]>([])

  const loadRequests = () => {
    const stored = localStorage.getItem('membershipRequests')
    if (stored) {
      requests.value = JSON.parse(stored)
    }
  }

  const saveRequests = () => {
    localStorage.setItem('membershipRequests', JSON.stringify(requests.value))
  }

  const submitRequest = async (requestData: Omit<MembershipRequest, 'id'>) => {
    try {
      const newRequest: MembershipRequest = {
        id: `membership-${Date.now()}`,
        ...requestData,
      }

      requests.value.unshift(newRequest)
      saveRequests()

      const confirmationMessage = `Hej ${requestData.name}! Vi är glada att du vill engagera dig i ditt område. Vi hör av oss inom kort.`
      console.log('📧 Confirmation:', confirmationMessage)
      console.log('📧 Notification sent to board')

      return { success: true, data: newRequest }
    } catch (error) {
      return { success: false, error: 'Failed to submit request' }
    }
  }

  const getRequestsByAssociation = (associationId: string) => {
    return requests.value.filter(r => r.associationId === associationId)
  }

  loadRequests()

  return {
    requests,
    submitRequest,
    getRequestsByAssociation,
  }
})
