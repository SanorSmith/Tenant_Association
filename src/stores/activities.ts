import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Activity } from '@/types'

export const useActivitiesStore = defineStore('activities', () => {
  const activities = ref<Activity[]>([])

  const upcomingActivities = computed(() =>
    activities.value.filter(a => a.status === 'upcoming')
  )

  const activeActivities = computed(() =>
    activities.value.filter(a => a.status === 'ongoing')
  )

  const completedActivities = computed(() =>
    activities.value.filter(a => a.status === 'completed')
  )

  const initDemoData = () => {
    activities.value = []
  }

  const getActivityById = (id: string): Activity | undefined => {
    return activities.value.find(a => a.id === id)
  }

  const addActivity = (activity: Activity) => {
    activities.value.unshift(activity)
  }

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    const index = activities.value.findIndex(a => a.id === id)
    if (index !== -1) {
      activities.value[index] = { ...activities.value[index], ...updates }
    }
  }

  return {
    activities,
    upcomingActivities,
    activeActivities,
    completedActivities,
    initDemoData,
    getActivityById,
    addActivity,
    updateActivity
  }
})
