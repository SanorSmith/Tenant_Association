import { ref } from 'vue'
import { useActivitiesStore } from '@/stores/activities'
import type { Activity } from '@/types'

export function useActivities() {
  const store = useActivitiesStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getActivities = () => {
    return store.activities
  }

  const createActivity = async (activityData: Partial<Activity>) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        title: activityData.title || '',
        description: activityData.description || '',
        date: activityData.date || '',
        time: activityData.time || '',
        location: activityData.location || '',
        maxParticipants: activityData.maxParticipants,
        currentParticipants: 0,
        status: 'upcoming',
        imageUrl: activityData.imageUrl,
        organizer: activityData.organizer,
        category: activityData.category,
      }

      store.addActivity(newActivity)
      loading.value = false
      return { success: true, data: newActivity }
    } catch (err) {
      error.value = 'Failed to create activity'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const registerForActivity = async (activityId: string, userId: string) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const activity = store.getActivityById(activityId)
      if (!activity) {
        throw new Error('Activity not found')
      }

      if (activity.maxParticipants && activity.currentParticipants >= activity.maxParticipants) {
        error.value = 'Activity is full'
        loading.value = false
        return { success: false, error: error.value }
      }

      store.updateActivity(activityId, {
        currentParticipants: activity.currentParticipants + 1,
      })

      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to register'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const cancelRegistration = async (activityId: string, userId: string) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const activity = store.getActivityById(activityId)
      if (!activity) {
        throw new Error('Activity not found')
      }

      store.updateActivity(activityId, {
        currentParticipants: Math.max(0, activity.currentParticipants - 1),
      })

      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to cancel registration'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const deleteActivity = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      store.deleteActivity(id)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to delete activity'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  return {
    loading,
    error,
    getActivities,
    createActivity,
    registerForActivity,
    cancelRegistration,
    deleteActivity,
  }
}
