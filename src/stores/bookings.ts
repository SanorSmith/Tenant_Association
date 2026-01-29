import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Booking } from '@/types'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref<Booking[]>([])

  const pendingBookings = computed(() =>
    bookings.value.filter(b => b.status === 'pending')
  )

  const confirmedBookings = computed(() =>
    bookings.value.filter(b => b.status === 'confirmed')
  )

  const userBookings = computed(() => {
    return (userId: string) => bookings.value.filter(b => b.userId === userId)
  })

  const initDemoData = () => {
    bookings.value = []
  }

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.value.find(b => b.id === id)
  }

  const addBooking = (booking: Booking) => {
    bookings.value.unshift(booking)
  }

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    const index = bookings.value.findIndex(b => b.id === id)
    if (index !== -1) {
      bookings.value[index] = { ...bookings.value[index], ...updates }
    }
  }

  const deleteBooking = (id: string) => {
    const index = bookings.value.findIndex(b => b.id === id)
    if (index !== -1) {
      bookings.value.splice(index, 1)
    }
  }

  return {
    bookings,
    pendingBookings,
    confirmedBookings,
    userBookings,
    initDemoData,
    getBookingById,
    addBooking,
    updateBooking,
    deleteBooking
  }
})
