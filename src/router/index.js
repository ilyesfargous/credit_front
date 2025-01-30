import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AuthView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt')

  if (to.name === 'login' && token) {
    next({ name: 'home' })
  } 
  else if (to.name !== 'login' && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
