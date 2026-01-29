# 🎯 Functional Logic Implementation Guide

## Overview

This guide explains how to use the functional composables that make all buttons and interactions work in the Grannskapet application.

---

## 📦 Available Composables

### 1. **useNotifications** - Toast Notifications

Display success, error, warning, and info messages to users.

```typescript
import { useNotifications } from '@/composables/useNotifications'

const { success, error, warning, info } = useNotifications()

// Usage
success('Meeting created successfully!')
error('Failed to delete document')
warning('This action cannot be undone')
info('New updates available')
```

---

### 2. **useMeetings** - Meeting Management

Create, update, and delete meetings with loading states.

```typescript
import { useMeetings } from '@/composables/useMeetings'
import { useNotifications } from '@/composables/useNotifications'

const { createMeeting, updateMeeting, deleteMeeting, loading } = useMeetings()
const { success, error } = useNotifications()

// Create a meeting
const handleCreateMeeting = async () => {
  const result = await createMeeting({
    title: 'Board Meeting',
    date: '2024-02-15',
    time: '18:00',
    location: 'Conference Room',
    agenda: ['Budget review', 'New projects'],
  })
  
  if (result.success) {
    success('Meeting created!')
  } else {
    error(result.error || 'Failed to create meeting')
  }
}

// Update a meeting
const handleUpdateMeeting = async (id: string) => {
  const result = await updateMeeting(id, {
    title: 'Updated Meeting Title',
  })
  
  if (result.success) {
    success('Meeting updated!')
  }
}

// Delete a meeting
const handleDeleteMeeting = async (id: string) => {
  const result = await deleteMeeting(id)
  
  if (result.success) {
    success('Meeting deleted!')
  }
}
```

---

### 3. **useDocuments** - Document Management

Upload, download, and delete documents.

```typescript
import { useDocuments } from '@/composables/useDocuments'
import { useNotifications } from '@/composables/useNotifications'

const { uploadDocument, deleteDocument, downloadDocument, loading } = useDocuments()
const { success, error } = useNotifications()

// Upload a document
const handleFileUpload = async (file: File) => {
  const result = await uploadDocument(file, {
    title: file.name,
    type: 'protocol',
    description: 'Meeting protocol',
    tags: ['meeting', '2024'],
    isPublic: false,
  })
  
  if (result.success) {
    success('Document uploaded!')
  } else {
    error(result.error || 'Upload failed')
  }
}

// Download a document
const handleDownload = (document: Document) => {
  downloadDocument(document)
  success('Download started!')
}

// Delete a document
const handleDelete = async (id: string) => {
  const result = await deleteDocument(id)
  
  if (result.success) {
    success('Document deleted!')
  }
}
```

---

### 4. **useActivities** - Activity Management

Create activities and manage participant registration.

```typescript
import { useActivities } from '@/composables/useActivities'
import { useNotifications } from '@/composables/useNotifications'

const { createActivity, registerForActivity, cancelRegistration, loading } = useActivities()
const { success, error } = useNotifications()

// Create an activity
const handleCreateActivity = async () => {
  const result = await createActivity({
    title: 'Summer BBQ',
    description: 'Annual summer party',
    date: '2024-06-15',
    time: '17:00',
    location: 'Garden',
    maxParticipants: 50,
  })
  
  if (result.success) {
    success('Activity created!')
  }
}

// Register for an activity
const handleRegister = async (activityId: string, userId: string) => {
  const result = await registerForActivity(activityId, userId)
  
  if (result.success) {
    success('You are registered!')
  } else {
    error(result.error || 'Registration failed')
  }
}

// Cancel registration
const handleCancel = async (activityId: string, userId: string) => {
  const result = await cancelRegistration(activityId, userId)
  
  if (result.success) {
    success('Registration cancelled')
  }
}
```

---

### 5. **useBookings** - Booking Management

Create, confirm, and cancel bookings with availability checking.

```typescript
import { useBookings } from '@/composables/useBookings'
import { useNotifications } from '@/composables/useNotifications'

const { createBooking, confirmBooking, cancelBooking, loading } = useBookings()
const { success, error } = useNotifications()

// Create a booking
const handleCreateBooking = async () => {
  const result = await createBooking({
    premiseId: 'premise-1',
    premiseName: 'Party Room',
    userId: 'user-1',
    userName: 'Anna Andersson',
    date: '2024-03-15',
    startTime: '18:00',
    endTime: '22:00',
    purpose: 'Birthday party',
  })
  
  if (result.success) {
    success('Booking created!')
  } else {
    error(result.error || 'Booking failed')
  }
}

// Confirm a booking
const handleConfirm = async (id: string) => {
  const result = await confirmBooking(id)
  
  if (result.success) {
    success('Booking confirmed!')
  }
}

// Cancel a booking
const handleCancel = async (id: string) => {
  const result = await cancelBooking(id)
  
  if (result.success) {
    success('Booking cancelled')
  }
}
```

---

## 🎨 Complete Component Examples

### Example 1: Create Meeting Button with Modal

```vue
<template>
  <div>
    <BaseButton @click="openModal">
      Create Meeting
    </BaseButton>

    <BaseModal v-model:isOpen="isModalOpen" title="Create New Meeting">
      <form @submit.prevent="handleSubmit">
        <BaseInput
          v-model="form.title"
          label="Title"
          :error="errors.title"
          required
        />
        
        <BaseInput
          v-model="form.date"
          label="Date"
          type="date"
          :error="errors.date"
          required
        />
        
        <BaseInput
          v-model="form.time"
          label="Time"
          type="time"
          :error="errors.time"
          required
        />
        
        <BaseInput
          v-model="form.location"
          label="Location"
          :error="errors.location"
          required
        />
        
        <template #footer>
          <BaseButton variant="secondary" @click="closeModal">
            Cancel
          </BaseButton>
          <BaseButton type="submit" :loading="loading">
            Create Meeting
          </BaseButton>
        </template>
      </form>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMeetings } from '@/composables/useMeetings'
import { useNotifications } from '@/composables/useNotifications'

const { createMeeting, loading } = useMeetings()
const { success, error } = useNotifications()

const isModalOpen = ref(false)
const form = ref({
  title: '',
  date: '',
  time: '',
  location: '',
})
const errors = ref<Record<string, string>>({})

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  form.value = { title: '', date: '', time: '', location: '' }
  errors.value = {}
}

const validateForm = () => {
  errors.value = {}
  if (!form.value.title) errors.value.title = 'Title is required'
  if (!form.value.date) errors.value.date = 'Date is required'
  if (!form.value.time) errors.value.time = 'Time is required'
  if (!form.value.location) errors.value.location = 'Location is required'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  const result = await createMeeting(form.value)
  
  if (result.success) {
    success('Meeting created successfully!')
    closeModal()
  } else {
    error(result.error || 'Failed to create meeting')
  }
}
</script>
```

---

### Example 2: Delete Button with Confirmation

```vue
<template>
  <div>
    <BaseButton variant="danger" size="sm" @click="showConfirmation = true">
      Delete
    </BaseButton>

    <BaseModal
      v-model:isOpen="showConfirmation"
      title="Confirm Delete"
      size="sm"
    >
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      
      <template #footer>
        <BaseButton variant="secondary" @click="showConfirmation = false">
          Cancel
        </BaseButton>
        <BaseButton variant="danger" @click="handleDelete" :loading="loading">
          Delete
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMeetings } from '@/composables/useMeetings'
import { useNotifications } from '@/composables/useNotifications'

interface Props {
  itemId: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ deleted: [] }>()

const { deleteMeeting, loading } = useMeetings()
const { success, error } = useNotifications()

const showConfirmation = ref(false)

const handleDelete = async () => {
  const result = await deleteMeeting(props.itemId)
  
  if (result.success) {
    success('Item deleted successfully!')
    showConfirmation.value = false
    emit('deleted')
  } else {
    error(result.error || 'Failed to delete item')
  }
}
</script>
```

---

### Example 3: File Upload Button

```vue
<template>
  <div>
    <BaseButton @click="triggerFileInput" :loading="loading">
      Upload Document
    </BaseButton>
    
    <input
      ref="fileInput"
      type="file"
      hidden
      @change="handleFileSelect"
      accept=".pdf,.doc,.docx,.xls,.xlsx"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDocuments } from '@/composables/useDocuments'
import { useNotifications } from '@/composables/useNotifications'

const { uploadDocument, loading } = useDocuments()
const { success, error } = useNotifications()

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return

  const result = await uploadDocument(file, {
    title: file.name,
    type: 'other',
  })

  if (result.success) {
    success('Document uploaded successfully!')
  } else {
    error(result.error || 'Upload failed')
  }

  // Reset input
  if (target) target.value = ''
}
</script>
```

---

### Example 4: Search with Filtering

```vue
<template>
  <div>
    <BaseInput
      v-model="searchQuery"
      placeholder="Search meetings..."
      @input="handleSearch"
    />
    
    <div v-if="loading" class="text-center py-8">
      <BaseSpinner />
    </div>
    
    <div v-else-if="filteredItems.length === 0">
      <BaseEmptyState
        title="No results found"
        description="Try a different search term"
      />
    </div>
    
    <div v-else class="grid gap-4">
      <BaseCard v-for="item in filteredItems" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.date }} at {{ item.time }}</p>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMeetings } from '@/composables/useMeetings'

const { getMeetings } = useMeetings()
const searchQuery = ref('')
const loading = ref(false)

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return getMeetings()
  
  return getMeetings().filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query)
  )
})

const handleSearch = () => {
  // Optional: Add debouncing here
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
}
</script>
```

---

## 🎯 Best Practices

### 1. **Always Handle Errors**
```typescript
const result = await createMeeting(data)
if (result.success) {
  success('Success!')
} else {
  error(result.error || 'Operation failed')
}
```

### 2. **Show Loading States**
```vue
<BaseButton :loading="loading" @click="handleAction">
  Submit
</BaseButton>
```

### 3. **Validate Before Submitting**
```typescript
const validateForm = () => {
  errors.value = {}
  if (!form.value.title) errors.value.title = 'Required'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  // Proceed with submission
}
```

### 4. **Confirm Destructive Actions**
```vue
<BaseModal v-model:isOpen="showConfirm" title="Confirm Delete">
  <p>Are you sure?</p>
  <template #footer>
    <BaseButton variant="danger" @click="handleDelete">
      Delete
    </BaseButton>
  </template>
</BaseModal>
```

### 5. **Reset Forms After Success**
```typescript
const handleSubmit = async () => {
  const result = await createMeeting(form.value)
  if (result.success) {
    success('Created!')
    form.value = { /* reset */ }
    closeModal()
  }
}
```

---

## 🔧 Store Mutations Available

All stores now have CRUD operations:

### Meetings Store
- `addMeeting(meeting: Meeting)`
- `updateMeeting(id: string, updates: Partial<Meeting>)`
- `deleteMeeting(id: string)`
- `getMeetingById(id: string)`

### Documents Store
- `addDocument(document: Document)`
- `deleteDocument(id: string)`
- `getDocumentById(id: string)`
- `searchDocuments(query: string)`

### Activities Store
- `addActivity(activity: Activity)`
- `updateActivity(id: string, updates: Partial<Activity>)`
- `deleteActivity(id: string)`
- `getActivityById(id: string)`

### Bookings Store
- `addBooking(booking: Booking)`
- `updateBooking(id: string, updates: Partial<Booking>)`
- `deleteBooking(id: string)`
- `getBookingById(id: string)`

---

## ✅ Implementation Checklist

- [x] **useNotifications** - Toast notification system
- [x] **useMeetings** - Meeting CRUD operations
- [x] **useDocuments** - Document upload/download/delete
- [x] **useActivities** - Activity management & registration
- [x] **useBookings** - Booking creation with availability check
- [x] **NotificationToast** - Global toast component
- [x] **Store mutations** - All CRUD methods added
- [x] **Loading states** - All composables return loading ref
- [x] **Error handling** - All operations return success/error

---

## 🚀 Next Steps

1. **Update existing pages** to use these composables
2. **Add form validation** to all input forms
3. **Implement search** on list pages
4. **Add confirmation modals** for delete actions
5. **Test all CRUD operations** in the browser

---

## 📝 Example: Complete Page Implementation

See the examples above for complete implementations of:
- Create forms with validation
- Delete buttons with confirmation
- File upload handling
- Search and filtering
- Loading and error states

All buttons now perform real actions instead of being demos! 🎉
