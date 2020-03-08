import Vue from 'vue'
import Router from 'vue-router'
import AuthLoginView from '@/views/auths/AuthLoginView'
import DashboardMainView from '@/views/dashboards/DashboardMainView'
import CustomerListView from '@/views/customers/CustomerListView'
import SupplierListView from '@/views/suppliers/SupplierListView'

Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/',
      name: 'auth-login-view',
      component: AuthLoginView,
      meta: {
        preventPage: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard-main-view',
      component: DashboardMainView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/customers',
      name: 'customer-list-voew',
      component: CustomerListView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/suppliers',
      name: 'supplier-list-voew',
      component: SupplierListView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return false
  }

  // TODO butuh pengecekan ke API
  return true
}

const isLogin = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return true
  }

  return false
}

routes.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next('/')
      return
    }
  }

  if (to.matched.some((record) => record.meta.preventPage)) {
    if (isLogin()) {
      next('/dashboard')
      return
    }
  }

  next()
})

export default routes
