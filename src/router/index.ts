import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
    meta: { public: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { public: true }
  },
  {
    path: '/association/:id',
    name: 'association-detail',
    component: () => import('@/views/public/AssociationDetailView.vue'),
    meta: { public: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/meetings',
    name: 'meetings',
    component: () => import('@/views/MeetingsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/documents',
    name: 'documents',
    component: () => import('@/views/DocumentsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/budget',
    name: 'budget',
    component: () => import('@/views/BudgetView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/activities',
    name: 'activities',
    component: () => import('@/views/ActivitiesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/premises',
    name: 'premises',
    component: () => import('@/views/PremisesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: () => import('@/views/BookingsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('grannskapet_auth') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
