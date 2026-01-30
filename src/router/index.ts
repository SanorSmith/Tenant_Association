import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

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
    path: '/hjalpcenter',
    name: 'help-center',
    component: () => import('@/views/HelpCenterView.vue'),
    meta: { public: true }
  },
  {
    path: '/kontakt',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { public: true }
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/FAQView.vue'),
    meta: { public: true }
  },
  {
    path: '/anvandarguide',
    name: 'user-guide',
    component: () => import('@/views/UserGuideView.vue'),
    meta: { public: true }
  },
  {
    path: '/integritetspolicy',
    name: 'privacy-policy',
    component: () => import('@/views/PrivacyPolicyView.vue'),
    meta: { public: true }
  },
  {
    path: '/anvandarvillkor',
    name: 'terms',
    component: () => import('@/views/TermsView.vue'),
    meta: { public: true }
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('@/views/CookiesView.vue'),
    meta: { public: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    // If navigating to a hash (like #features), scroll to that element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // Otherwise, scroll to top
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated, initAuth } = useAuth()
  
  // Initialize auth state
  initAuth()
  
  // Allow public pages to pass through
  if (to.meta.public) {
    next()
    return
  }
  
  // Check if authentication is required
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.name === 'login' && isAuthenticated.value) {
    // Redirect to dashboard if already authenticated
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
