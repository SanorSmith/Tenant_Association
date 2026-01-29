import { defineStore } from 'pinia'
import { ref } from 'vue'

interface BookingRequest {
  id: string
  associationId?: string
  name: string
  email: string
  phone: string
  date: string
  startTime: string
  endTime: string
  purpose: string
  status: string
  submittedAt: string
  approvedAt?: string
  rejectedAt?: string
  rejectionReason?: string
}

export const useBookingRequestsStore = defineStore('bookingRequests', () => {
  const bookings = ref<BookingRequest[]>([])

  const loadBookings = () => {
    const stored = localStorage.getItem('bookingRequests')
    if (stored) {
      bookings.value = JSON.parse(stored)
    }
  }

  const saveBookings = () => {
    localStorage.setItem('bookingRequests', JSON.stringify(bookings.value))
  }

  const submitBooking = async (bookingData: Omit<BookingRequest, 'id'>) => {
    try {
      const newBooking: BookingRequest = {
        id: `booking-${Date.now()}`,
        ...bookingData,
      }

      bookings.value.unshift(newBooking)
      saveBookings()

      console.log('📧 Booking request sent to board')
      
      return { success: true, data: newBooking }
    } catch (error) {
      return { success: false, error: 'Failed to submit booking' }
    }
  }

  const approveBooking = async (bookingId: string) => {
    const booking = bookings.value.find(b => b.id === bookingId)
    if (booking) {
      booking.status = 'approved'
      booking.approvedAt = new Date().toISOString()
      saveBookings()

      const confirmationMessage = `Din bokning har godkänts för ${booking.date}. Nycklar kan hämtas kl 12:00 och ska lämnas tillbaka kl 12:00 dagen efter. Ta med hyresavtalet.`
      console.log('📧 Approval sent:', confirmationMessage)

      return { success: true }
    }
    return { success: false, error: 'Booking not found' }
  }

  const rejectBooking = async (bookingId: string, reason?: string) => {
    const booking = bookings.value.find(b => b.id === bookingId)
    if (booking) {
      booking.status = 'rejected'
      booking.rejectedAt = new Date().toISOString()
      booking.rejectionReason = reason
      saveBookings()

      console.log('📧 Rejection sent to resident')

      return { success: true }
    }
    return { success: false, error: 'Booking not found' }
  }

  loadBookings()

  return {
    bookings,
    submitBooking,
    approveBooking,
    rejectBooking,
  }
})
