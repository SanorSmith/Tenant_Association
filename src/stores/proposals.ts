import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Proposal {
  id: string
  associationId?: string
  name: string
  email: string
  phone: string
  proposal: string
  status: string
  submittedAt: string
}

export const useProposalsStore = defineStore('proposals', () => {
  const proposals = ref<Proposal[]>([])

  const loadProposals = () => {
    const stored = localStorage.getItem('proposals')
    if (stored) {
      proposals.value = JSON.parse(stored)
    }
  }

  const saveProposals = () => {
    localStorage.setItem('proposals', JSON.stringify(proposals.value))
  }

  const submitProposal = async (proposalData: Omit<Proposal, 'id'>) => {
    try {
      const newProposal: Proposal = {
        id: `proposal-${Date.now()}`,
        ...proposalData,
      }

      proposals.value.unshift(newProposal)
      saveProposals()

      console.log('📧 Notification sent to board:', newProposal)

      return { success: true, data: newProposal }
    } catch (error) {
      return { success: false, error: 'Failed to submit proposal' }
    }
  }

  const getProposalsByAssociation = (associationId: string) => {
    return proposals.value.filter(p => p.associationId === associationId)
  }

  loadProposals()

  return {
    proposals,
    submitProposal,
    getProposalsByAssociation,
  }
})
