import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Meeting } from '@/types'

export const useMeetingsStore = defineStore('meetings', () => {
  const meetings = ref<Meeting[]>([])

  const upcomingMeetings = computed(() => 
    meetings.value.filter(m => m.status === 'upcoming')
  )

  const pastMeetings = computed(() => 
    meetings.value.filter(m => m.status === 'completed')
  )

  const initDemoData = () => {
    meetings.value = []
  }

  const getMeetingById = (id: string): Meeting | undefined => {
    return meetings.value.find(m => m.id === id)
  }

  const addMeeting = (meeting: Meeting) => {
    meetings.value.unshift(meeting)
  }

  const updateMeeting = (id: string, updates: Partial<Meeting>) => {
    const index = meetings.value.findIndex(m => m.id === id)
    if (index !== -1) {
      meetings.value[index] = { ...meetings.value[index], ...updates }
    }
  }

  const deleteMeeting = (id: string) => {
    const index = meetings.value.findIndex(m => m.id === id)
    if (index !== -1) {
      meetings.value.splice(index, 1)
    }
  }

  return {
    meetings,
    upcomingMeetings,
    pastMeetings,
    initDemoData,
    getMeetingById,
    addMeeting,
    updateMeeting,
    deleteMeeting
  }
})
