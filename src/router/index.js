import Vue from 'vue'
import Router from 'vue-router'
import ViewCommonUser from '@/views/commons/users/ViewCommonUser'
import ViewCommonUserLogin from '@/views/commons/users/ViewCommonUserLogin'
import ViewCommonCustomer from '@/views/commons/customers/ViewCommonCustomer'
import ViewCommonSupplier from '@/views/commons/suppliers/ViewCommonSupplier'
import ViewCommonProduct from '@/views/commons/products/ViewCommonProduct'
import ViewCommonStockIn from '@/views/commons/stockins/ViewCommonStockIn'
import ViewCommonStockOut from '@/views/commons/stockouts/ViewCommonStockOut'
import ViewCommonStockCard from '@/views/commons/stockcards/ViewCommonStockCard'

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
      path: '/user',
      name: 'view-common-user',
      component: ViewCommonUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/customers',
      name: 'view-common-customer',
      component: ViewCommonCustomer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/suppliers',
      name: 'view-common-supplier',
      component: ViewCommonSupplier,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'view-common-product',
      component: ViewCommonProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stock-ins',
      name: 'view-common-stock-ins',
      component: ViewCommonStockIn,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stock-outs',
      name: 'view-common-stock-outs',
      component: ViewCommonStockOut,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stock-cards',
      name: 'view-common-stock-cards',
      component: ViewCommonStockCard,
      meta: {
        requiresAuth: true
      }
    }
    // {
    //   path: '/user',
    //   name: 'user-main-view',
    //   component: UserMainView,
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
      next('/user')
      return
    }
  }

  next()
})

export default routes
