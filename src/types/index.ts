export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'board'
  associationId: string
  avatar?: string
  phone?: string
  apartment?: string
  joinedDate: string
}

export interface Association {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  organizationNumber: string
  totalApartments: number
  totalMembers: number
  description: string
  image?: string
  boardMembers: string[]
  contactEmail: string
  contactPhone: string
  website?: string
}

export interface Meeting {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'annual' | 'board' | 'extra'
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  attendees: number
  maxAttendees?: number
  agenda?: string[]
  documents?: string[]
  createdBy: string
  createdAt: string
}

export interface Document {
  id: string
  title: string
  description?: string
  type: 'protocol' | 'report' | 'policy' | 'contract' | 'other'
  category: string
  fileUrl: string
  fileSize: number
  fileType: string
  uploadedBy: string
  uploadedAt: string
  tags: string[]
  isPublic: boolean
}

export interface Activity {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: 'social' | 'maintenance' | 'education' | 'sport' | 'culture'
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  organizer: string
  participants: number
  maxParticipants?: number
  image?: string
  registrationDeadline?: string
  cost?: number
  createdAt: string
}

export interface Premise {
  id: string
  name: string
  description: string
  type: 'laundry' | 'gym' | 'party' | 'workshop' | 'storage' | 'other'
  capacity?: number
  size?: number
  floor: string
  amenities: string[]
  images: string[]
  bookingRules: string[]
  pricePerHour?: number
  availableHours: string
  isAvailable: boolean
}

export interface Booking {
  id: string
  premiseId: string
  userId: string
  date: string
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  purpose: string
  participants?: number
  notes?: string
  totalCost?: number
  createdAt: string
  confirmedAt?: string
}

export interface BudgetItem {
  id: string
  category: string
  subcategory: string
  type: 'income' | 'expense'
  amount: number
  budgeted: number
  month: number
  year: number
  description?: string
  date: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  read: boolean
  link?: string
  createdAt: string
}

export interface Statistics {
  totalMembers: number
  totalApartments: number
  occupancyRate: number
  upcomingMeetings: number
  activeActivities: number
  pendingBookings: number
  documentsThisMonth: number
  budgetStatus: {
    income: number
    expenses: number
    balance: number
  }
}
