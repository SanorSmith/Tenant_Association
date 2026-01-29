import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

export interface ActivityData {
  id: string
  title: string
  description: string
  type: 'social' | 'maintenance' | 'meeting' | 'celebration' | 'sports' | 'other'
  date: string
  startTime: string
  endTime: string
  location: string
  maxParticipants?: number
  currentParticipants: number
  cost?: number
  budgetCategory?: string
  organizer: string
  organizerId: string
  status: 'planning' | 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  image?: string
  requirements?: string[]
  equipment?: string[]
  notes?: string
  participants: ActivityParticipant[]
  createdAt: string
  updatedAt: string
}

export interface ActivityParticipant {
  id: string
  name: string
  email: string
  phone?: string
  apartment?: string
  status: 'registered' | 'confirmed' | 'declined' | 'attended' | 'no-show'
  registeredAt: string
  notes?: string
}

export const useActivitiesStore = defineStore('activities', () => {
  const authStore = useAuthStore()
  const activities = ref<ActivityData[]>([])
  const isLoading = ref(false)

  // Load activities from localStorage
  const loadActivities = () => {
    try {
      const stored = localStorage.getItem('association-activities')
      if (stored) {
        activities.value = JSON.parse(stored)
      } else {
        // Initialize with demo data
        initDemoData()
      }
    } catch (error) {
      console.error('Error loading activities:', error)
      initDemoData()
    }
  }

  // Save activities to localStorage
  const saveActivities = () => {
    try {
      localStorage.setItem('association-activities', JSON.stringify(activities.value))
    } catch (error) {
      console.error('Error saving activities:', error)
    }
  }

  // Initialize demo data
  const initDemoData = () => {
    activities.value = [
      {
        id: 'activity-1',
        title: 'Sommarfest 2024',
        description: 'Stor grillkväll i gården med musik och lekar för hela familjen. Vi grillar korv och burgare, barnen kan leka på gräsmattan och vi har musik från 70-talet.',
        type: 'social',
        date: '2024-06-15',
        startTime: '17:00',
        endTime: '22:00',
        location: 'Gården',
        maxParticipants: 100,
        currentParticipants: 45,
        cost: 5000,
        budgetCategory: 'sociala-aktiviteter',
        organizer: 'Anna Andersson',
        organizerId: 'user-1',
        status: 'scheduled',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
        requirements: ['Grill', 'Musikanläggning', 'Bord och stolar'],
        equipment: ['Grill', 'Högtalare', 'Bord', 'Stolar', 'Kylväska'],
        notes: 'Köpa in mat och dryck 3 dagar innan',
        participants: [
          {
            id: 'p1',
            name: 'Erik Nilsson',
            email: 'erik@example.com',
            phone: '070-1234567',
            apartment: 'Lägenhet 101',
            status: 'confirmed',
            registeredAt: '2024-05-01T10:00:00Z'
          },
          {
            id: 'p2',
            name: 'Maria Karlsson',
            email: 'maria@example.com',
            phone: '070-2345678',
            apartment: 'Lägenhet 205',
            status: 'confirmed',
            registeredAt: '2024-05-02T14:30:00Z'
          }
        ],
        createdAt: '2024-04-15T09:00:00Z',
        updatedAt: '2024-05-15T10:00:00Z'
      },
      {
        id: 'activity-2',
        title: 'Städdag',
        description: 'Gemensam städning av gården, fasader och gemensamma utrymmen. Alla hjälper till att göra vårt bostadsområde fint inför sommaren.',
        type: 'maintenance',
        date: '2024-05-22',
        startTime: '09:00',
        endTime: '12:00',
        location: 'Hela området',
        maxParticipants: 30,
        currentParticipants: 28,
        cost: 800,
        budgetCategory: 'underhåll',
        organizer: 'Styrelsen',
        organizerId: 'user-2',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
        requirements: ['Städmaterial', 'Säkerhetsutrustning'],
        equipment: ['Hinkar', 'moppar', 'borstar', 'handskar', 'säckar'],
        notes: 'Fika och dryck finns tillgängligt för alla deltagare',
        participants: [
          {
            id: 'p3',
            name: 'Johan Lindberg',
            email: 'johan@example.com',
            apartment: 'Lägenhet 303',
            status: 'attended',
            registeredAt: '2024-05-10T08:00:00Z'
          }
        ],
        createdAt: '2024-04-20T11:00:00Z',
        updatedAt: '2024-05-22T12:00:00Z'
      },
      {
        id: 'activity-3',
        title: 'Julmarknad',
        description: 'Traditionell julmarknad med försäljning av hantverk, glögg och pepparkakor. Barnaktiviteter och tomtebesök.',
        type: 'celebration',
        date: '2024-12-10',
        startTime: '11:00',
        endTime: '15:00',
        location: 'Gården',
        maxParticipants: 150,
        currentParticipants: 67,
        cost: 3000,
        budgetCategory: 'sociala-aktiviteter',
        organizer: 'Julmarknadskommittén',
        organizerId: 'user-3',
        status: 'planning',
        image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
        requirements: ['Bord för försäljare', 'Tomtedräkt', 'Ljudsystem'],
        equipment: ['Bord', 'stolar', 'ljudsystem', 'belysning'],
        notes: 'Behöver volontärer för att hjälpa till med barnaktiviteter',
        participants: [],
        createdAt: '2024-01-15T13:00:00Z',
        updatedAt: '2024-01-20T09:00:00Z'
      }
    ]
    saveActivities()
  }

  // Computed properties for filtering
  const upcomingActivities = computed(() => 
    activities.value.filter(activity => 
      activity.status === 'scheduled' && 
      new Date(activity.date) > new Date()
    )
  )

  const pastActivities = computed(() => 
    activities.value.filter(activity => 
      activity.status === 'completed' || 
      new Date(activity.date) < new Date()
    )
  )

  const planningActivities = computed(() => 
    activities.value.filter(activity => activity.status === 'planning')
  )

  const activitiesByType = computed(() => {
    const grouped: Record<string, ActivityData[]> = {}
    activities.value.forEach(activity => {
      if (!grouped[activity.type]) {
        grouped[activity.type] = []
      }
      grouped[activity.type].push(activity)
    })
    return grouped
  })

  const totalActivities = computed(() => activities.value.length)
  const totalParticipants = computed(() => 
    activities.value.reduce((sum, activity) => sum + activity.currentParticipants, 0)
  )
  const totalBudget = computed(() => 
    activities.value.reduce((sum, activity) => sum + (activity.cost || 0), 0)
  )

  // CRUD operations
  const createActivity = async (activityData: Omit<ActivityData, 'id' | 'participants' | 'createdAt' | 'updatedAt' | 'currentParticipants'>) => {
    isLoading.value = true
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      const newActivity: ActivityData = {
        ...activityData,
        id: `activity-${Date.now()}`,
        participants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentParticipants: 0
      }
      
      activities.value.push(newActivity)
      saveActivities()
      
      return { success: true, data: newActivity }
    } catch (error) {
      console.error('Error creating activity:', error)
      return { success: false, error: 'Kunde inte skapa aktivitet' }
    } finally {
      isLoading.value = false
    }
  }

  const updateActivity = async (id: string, updates: Partial<ActivityData>) => {
    isLoading.value = true
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    try {
      const index = activities.value.findIndex(activity => activity.id === id)
      if (index === -1) {
        return { success: false, error: 'Aktivitet hittades inte' }
      }
      
      activities.value[index] = {
        ...activities.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      saveActivities()
      return { success: true, data: activities.value[index] }
    } catch (error) {
      console.error('Error updating activity:', error)
      return { success: false, error: 'Kunde inte uppdatera aktivitet' }
    } finally {
      isLoading.value = false
    }
  }

  const deleteActivity = async (id: string) => {
    isLoading.value = true
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    try {
      const index = activities.value.findIndex(activity => activity.id === id)
      if (index === -1) {
        return { success: false, error: 'Aktivitet hittades inte' }
      }
      
      activities.value.splice(index, 1)
      saveActivities()
      
      return { success: true }
    } catch (error) {
      console.error('Error deleting activity:', error)
      return { success: false, error: 'Kunde inte ta bort aktivitet' }
    } finally {
      isLoading.value = false
    }
  }

  // Participant management
  const addParticipant = async (activityId: string, participant: Omit<ActivityParticipant, 'id' | 'registeredAt'>) => {
    try {
      const activity = activities.value.find(a => a.id === activityId)
      if (!activity) {
        return { success: false, error: 'Aktivitet hittades inte' }
      }
      
      // Check if participant already exists
      const existingParticipant = activity.participants.find(p => p.email === participant.email)
      if (existingParticipant) {
        return { success: false, error: 'Deltagaren är redan registrerad' }
      }
      
      // Check max participants
      if (activity.maxParticipants && activity.currentParticipants >= activity.maxParticipants) {
        return { success: false, error: 'Aktiviteten är fullbokad' }
      }
      
      const newParticipant: ActivityParticipant = {
        ...participant,
        id: `participant-${Date.now()}`,
        registeredAt: new Date().toISOString()
      }
      
      activity.participants.push(newParticipant)
      activity.currentParticipants = activity.participants.filter(p => p.status !== 'declined').length
      activity.updatedAt = new Date().toISOString()
      
      saveActivities()
      return { success: true, data: newParticipant }
    } catch (error) {
      console.error('Error adding participant:', error)
      return { success: false, error: 'Kunde inte lägga till deltagare' }
    }
  }

  const updateParticipantStatus = async (activityId: string, participantId: string, status: ActivityParticipant['status']) => {
    try {
      const activity = activities.value.find(a => a.id === activityId)
      if (!activity) {
        return { success: false, error: 'Aktivitet hittades inte' }
      }
      
      const participant = activity.participants.find(p => p.id === participantId)
      if (!participant) {
        return { success: false, error: 'Deltagare hittades inte' }
      }
      
      participant.status = status
      activity.currentParticipants = activity.participants.filter(p => p.status !== 'declined').length
      activity.updatedAt = new Date().toISOString()
      
      saveActivities()
      return { success: true }
    } catch (error) {
      console.error('Error updating participant status:', error)
      return { success: false, error: 'Kunde inte uppdatera deltagarstatus' }
    }
  }

  const removeParticipant = async (activityId: string, participantId: string) => {
    try {
      const activity = activities.value.find(a => a.id === activityId)
      if (!activity) {
        return { success: false, error: 'Aktivitet hittades inte' }
      }
      
      const index = activity.participants.findIndex(p => p.id === participantId)
      if (index === -1) {
        return { success: false, error: 'Deltagare hittades inte' }
      }
      
      activity.participants.splice(index, 1)
      activity.currentParticipants = activity.participants.filter(p => p.status !== 'declined').length
      activity.updatedAt = new Date().toISOString()
      
      saveActivities()
      return { success: true }
    } catch (error) {
      console.error('Error removing participant:', error)
      return { success: false, error: 'Kunde inte ta bort deltagare' }
    }
  }

  // Initialize store
  loadActivities()

  return {
    // State
    activities,
    isLoading,
    
    // Computed
    upcomingActivities,
    pastActivities,
    planningActivities,
    activitiesByType,
    totalActivities,
    totalParticipants,
    totalBudget,
    
    // Actions
    createActivity,
    updateActivity,
    deleteActivity,
    addParticipant,
    updateParticipantStatus,
    removeParticipant,
    
    // Utilities
    loadActivities,
    saveActivities
  }
})
