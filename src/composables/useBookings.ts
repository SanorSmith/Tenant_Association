import { ref } from 'vue'
import { useBookingsStore } from '@/stores/bookings'
import type { Booking } from '@/types'

export function useBookings() {
  const store = useBookingsStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getBookings = () => {
    return store.bookings
  }

  const createBooking = async (bookingData: Partial<Booking>) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const conflicts = store.bookings.filter(b => 
        b.premiseId === bookingData.premiseId &&
        b.date === bookingData.date &&
        b.status !== 'cancelled' &&
        (
          (bookingData.startTime! >= b.startTime && bookingData.startTime! < b.endTime) ||
          (bookingData.endTime! > b.startTime && bookingData.endTime! <= b.endTime)
        )
      )

      if (conflicts.length > 0) {
        error.value = 'Time slot not available'
        loading.value = false
        return { success: false, error: error.value }
      }

      const newBooking: Booking = {
        id: `book-${Date.now()}`,
        premiseId: bookingData.premiseId || '',
        premiseName: bookingData.premiseName || '',
        userId: bookingData.userId || '',
        userName: bookingData.userName || '',
        date: bookingData.date || '',
        startTime: bookingData.startTime || '',
        endTime: bookingData.endTime || '',
        status: 'pending',
        purpose: bookingData.purpose,
        notes: bookingData.notes,
      }

      store.addBooking(newBooking)
      loading.value = false
      return { success: true, data: newBooking }
    } catch (err) {
      error.value = 'Failed to create booking'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const confirmBooking = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      store.updateBooking(id, { status: 'confirmed' })
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to confirm booking'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const cancelBooking = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      store.updateBooking(id, { status: 'cancelled' })
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to cancel booking'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  const deleteBooking = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      store.deleteBooking(id)
      loading.value = false
      return { success: true }
    } catch (err) {
      error.value = 'Failed to delete booking'
      loading.value = false
      return { success: false, error: error.value }
    }
  }

  return {
    loading,
    error,
    getBookings,
    createBooking,
    confirmBooking,
    cancelBooking,
    deleteBooking,
  }
}
