import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface BookingData {
  id: string
  premiseId: string
  premiseName: string
  associationId: string
  associationName: string
  date: string
  startTime: string
  endTime: string
  name: string
  email: string
  phone: string
  address: string
  purpose: string
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  notes?: string
}

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref<BookingData[]>([])
  const isLoading = ref(false)

  // Load bookings from localStorage
  const loadBookings = () => {
    const stored = localStorage.getItem('premise-bookings')
    if (stored) {
      try {
        bookings.value = JSON.parse(stored)
      } catch (error) {
        console.error('Error loading bookings:', error)
        bookings.value = []
      }
    } else {
      // Initialize with demo data
      bookings.value = [
        {
          id: 'booking-1',
          premiseId: 'premise-1',
          premiseName: 'Stora salen',
          associationId: 'assoc-1',
          associationName: 'Solhöjden BRF',
          date: '2026-02-15',
          startTime: '18:00',
          endTime: '22:00',
          name: 'Anna Svensson',
          email: 'anna@example.com',
          phone: '0701234567',
          address: 'Testvägen 123',
          purpose: 'Barnkalas för min dotter',
          status: 'pending',
          submittedAt: new Date().toISOString(),
        },
        {
          id: 'booking-2',
          premiseId: 'premise-3',
          premiseName: 'Gym',
          associationId: 'assoc-1',
          associationName: 'Solhöjden BRF',
          date: '2026-02-10',
          startTime: '06:00',
          endTime: '08:00',
          name: 'Erik Nilsson',
          email: 'erik@example.com',
          phone: '0709876543',
          address: 'Testgatan 456',
          purpose: 'Morgonträning',
          status: 'confirmed',
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'Admin',
        },
        {
          id: 'booking-3',
          premiseId: 'premise-2',
          premiseName: 'Tvättstuga',
          associationId: 'assoc-1',
          associationName: 'Solhöjden BRF',
          date: '2026-02-08',
          startTime: '10:00',
          endTime: '12:00',
          name: 'Maria Karlsson',
          email: 'maria@example.com',
          phone: '0701111111',
          address: 'Provvägen 789',
          purpose: 'Tvätt',
          status: 'pending',
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ]
      saveBookings()
    }
  }

  // Save bookings to localStorage
  const saveBookings = () => {
    localStorage.setItem('premise-bookings', JSON.stringify(bookings.value))
  }

  // Computed properties
  const pendingBookings = computed(() => 
    bookings.value.filter(b => b.status === 'pending')
  )

  const confirmedBookings = computed(() => 
    bookings.value.filter(b => b.status === 'confirmed')
  )

  const todayBookings = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return bookings.value.filter(b => b.date === today && b.status === 'confirmed')
  })

  const upcomingBookings = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return bookings.value.filter(
      b => b.date >= today && b.status === 'confirmed'
    ).sort((a, b) => a.date.localeCompare(b.date))
  })

  // Get bookings by association
  const getBookingsByAssociation = (associationId: string) => {
    return bookings.value.filter(b => b.associationId === associationId)
  }

  // Get booking by ID
  const getBookingById = (id: string) => {
    return bookings.value.find(b => b.id === id)
  }

  // Create booking
  const createBooking = async (bookingData: Omit<BookingData, 'id' | 'status' | 'submittedAt'>) => {
    isLoading.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const newBooking: BookingData = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      }

      bookings.value.unshift(newBooking)
      saveBookings()

      return { success: true, data: newBooking }
    } catch (error) {
      console.error('Error creating booking:', error)
      return { success: false, error: 'Failed to create booking' }
    } finally {
      isLoading.value = false
    }
  }

  // Confirm booking
  const confirmBooking = async (id: string, reviewedBy: string, notes?: string) => {
    isLoading.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const booking = bookings.value.find(b => b.id === id)
      if (!booking) {
        throw new Error('Booking not found')
      }

      booking.status = 'confirmed'
      booking.reviewedAt = new Date().toISOString()
      booking.reviewedBy = reviewedBy
      if (notes) booking.notes = notes

      saveBookings()

      return { success: true, data: booking }
    } catch (error) {
      console.error('Error confirming booking:', error)
      return { success: false, error: 'Failed to confirm booking' }
    } finally {
      isLoading.value = false
    }
  }

  // Reject booking
  const rejectBooking = async (id: string, reviewedBy: string, notes?: string) => {
    isLoading.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const booking = bookings.value.find(b => b.id === id)
      if (!booking) {
        throw new Error('Booking not found')
      }

      booking.status = 'rejected'
      booking.reviewedAt = new Date().toISOString()
      booking.reviewedBy = reviewedBy
      if (notes) booking.notes = notes

      saveBookings()

      return { success: true, data: booking }
    } catch (error) {
      console.error('Error rejecting booking:', error)
      return { success: false, error: 'Failed to reject booking' }
    } finally {
      isLoading.value = false
    }
  }

  // Cancel booking
  const cancelBooking = async (id: string) => {
    isLoading.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const booking = bookings.value.find(b => b.id === id)
      if (!booking) {
        throw new Error('Booking not found')
      }

      booking.status = 'cancelled'

      saveBookings()

      return { success: true, data: booking }
    } catch (error) {
      console.error('Error cancelling booking:', error)
      return { success: false, error: 'Failed to cancel booking' }
    } finally {
      isLoading.value = false
    }
  }

  // Delete booking
  const deleteBooking = async (id: string) => {
    isLoading.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const index = bookings.value.findIndex(b => b.id === id)
      if (index === -1) {
        throw new Error('Booking not found')
      }

      bookings.value.splice(index, 1)
      saveBookings()

      return { success: true }
    } catch (error) {
      console.error('Error deleting booking:', error)
      return { success: false, error: 'Failed to delete booking' }
    } finally {
      isLoading.value = false
    }
  }

  // Initialize
  loadBookings()

  return {
    bookings,
    isLoading,
    pendingBookings,
    confirmedBookings,
    todayBookings,
    upcomingBookings,
    getBookingsByAssociation,
    getBookingById,
    createBooking,
    confirmBooking,
    rejectBooking,
    cancelBooking,
    deleteBooking,
  }
})
