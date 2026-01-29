import { ref } from 'vue'
import { useMeetingsStore } from '@/stores/meetings'
import type { Meeting } from '@/types'

export function useMeetings() {
  const store = useMeetingsStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getMeetings = () => {
    return store.meetings
  }

  const getMeetingById = (id: string) => {
    return store.getMeetingById(id)
  }

  const createMeeting = async (meetingData: Partial<Meeting>) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const newMeeting: Meeting = {
        id: `meeting-${Date.now()}`,
        title: meetingData.title || '',
        description: meetingData.description || '',
        date: meetingData.date || '',
        time: meetingData.time || '',
        location: meetingData.location || '',
        type: 'board',
        status: 'upcoming',
        attendees: 0,
        maxAttendees: meetingData.maxAttendees,
        agenda: [],
        documents: [],
        createdBy: 'current-user', // This would come from auth store
        createdAt: new Date().toISOString(),
      }

      store.addMeeting(newMeeting)
      loading.value = false
      return { success: true, data: newMeeting }
    } catch (err) {
      error.value = 'Failed to create meeting'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const updateMeeting = async (id: string, data: Partial<Meeting>) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      store.updateMeeting(id, data)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to update meeting'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const deleteMeeting = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      store.deleteMeeting(id)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to delete meeting'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  return {
    loading,
    error,
    getMeetings,
    getMeetingById,
    createMeeting,
    updateMeeting,
    deleteMeeting,
  }
}
