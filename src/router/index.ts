import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
export const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    name: 'index',
    path: '/index',
    component: () => import('@/views/index/index.vue'),
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home/index.vue')
      },
      {
        name: 'list',
        path: '/list',
        component: () => import('@/views/list/list.vue')
      },
      {
        name: 'setting',
        path: '/setting',
        component: () => import('@/views/setting/index.vue')
      },
      {
        path: '/:pathMatch(.*)',
        component: () => import('@/views/error/404.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const store = useUserStore()
  if (!store.user.token) {
    if (to.name === 'login') {
      return next()
    } else {
      return next({ name: 'login' })
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
