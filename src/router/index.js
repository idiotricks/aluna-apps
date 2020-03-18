import Vue from 'vue'
import Router from 'vue-router'
import ViewCommonUserLogin from '@/views/commons/users/ViewCommonUserLogin'
import ViewCommonCustomer from '@/views/commons/customers/ViewCommonCustomer'

Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/',
      name: 'view-common-user-signin',
      component: ViewCommonUserLogin,
      meta: {
        preventPage: true
      }
    },
    {
      path: '/customers',
      name: 'view-common-customer',
      component: ViewCommonCustomer,
      meta: {
        requiresAuth: true
      }
    }
    // {
    //   path: '/dashboard',
    //   name: 'dashboard-main-view',
    //   component: DashboardMainView,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/customers',
    //   name: 'customer-list-view',
    //   component: CustomerListView,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/suppliers',
    //   name: 'supplier-list-view',
    //   component: SupplierListView,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/products',
    //   name: 'product-list-view',
    //   component: ProductListView,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/stockins',
    //   name: 'stock-in-list-view',
    //   component: StockInListView,
    //   meta: {
    //     requiresAuth: true
    //   }
    // }
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
