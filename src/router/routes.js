const routes = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', name: 'authenticate', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path:'', name: 'register', component: () => import('pages/RegisterPage.vue')
      }
    ]
  },
  {
    path: '/products',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'products', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
