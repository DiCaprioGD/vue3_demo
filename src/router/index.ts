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
    component: () => import('@/views/index/mainIndex.vue'),
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home/mainView.vue')
      },
      {
        name: 'list',
        path: '/list',
        component: () => import('@/views/list/listView.vue')
      },
      {
        name: 'setting',
        path: '/setting',
        component: () => import('@/views/setting/settingView.vue')
      },
      {
        name: 'details',
        path: '/details',
        component: () => import('@/views/details/detailsView.vue')
      },
      {
        name: '3Dview',
        path: '/3Dview',
        component: () => import('@/views/3Dview/3Dview.vue')
      },
      {
        path: '/:pathMatch(.*)',
        component: () => import('@/views/error/404View.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/loginView.vue')
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
