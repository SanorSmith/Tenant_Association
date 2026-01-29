import { ref } from 'vue'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

const notifications = ref<Notification[]>([])

export function useNotifications() {
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notif-${Date.now()}-${Math.random()}`
    const newNotif: Notification = {
      id,
      ...notification,
      duration: notification.duration || 3000,
    }

    notifications.value.push(newNotif)

    setTimeout(() => {
      removeNotification(id)
    }, newNotif.duration)

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const success = (message: string, duration?: number) => {
    return addNotification({ type: 'success', message, duration })
  }

  const error = (message: string, duration?: number) => {
    return addNotification({ type: 'error', message, duration })
  }

  const warning = (message: string, duration?: number) => {
    return addNotification({ type: 'warning', message, duration })
  }

  const info = (message: string, duration?: number) => {
    return addNotification({ type: 'info', message, duration })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
  }
}
