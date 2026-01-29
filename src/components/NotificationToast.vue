<template>
  <teleport to="body">
    <div class="notification-container">
      <transition-group name="notification">
        <div
          v-for="notif in notifications"
          :key="notif.id"
          :class="['notification-toast', `notification-${notif.type}`]"
        >
          <svg class="w-5 h-5 notification-icon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(notif.type)" />
          </svg>
          <p class="notification-message">{{ notif.message }}</p>
          <button
            @click="removeNotification(notif.id)"
            class="notification-close"
            aria-label="Close notification"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications'

const { notifications, removeNotification } = useNotifications()

const getIconPath = (type: string) => {
  const paths: Record<string, string> = {
    success: 'M5 13l4 4L19 7',
    error: 'M6 18L18 6M6 6l12 12',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  }
  return paths[type] || paths.info
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  pointer-events: none;
}

.notification-toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  pointer-events: auto;
  backdrop-filter: blur(10px);
}

.notification-success {
  background: #10B981;
  color: white;
}

.notification-error {
  background: #E30613;
  color: white;
}

.notification-warning {
  background: #F59E0B;
  color: white;
}

.notification-info {
  background: #0066B3;
  color: white;
}

.notification-icon {
  flex-shrink: 0;
}

.notification-message {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
}

.notification-close {
  background: transparent;
  border: none;
  color: currentColor;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  opacity: 0.8;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.notification-close:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

/* Transitions */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-move {
  transition: transform 0.3s ease;
}

@media (max-width: 640px) {
  .notification-container {
    left: 1rem;
    right: 1rem;
  }
  
  .notification-toast {
    min-width: auto;
    max-width: none;
  }
}
</style>
