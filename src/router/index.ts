import { createRouter, createWebHistory, } from 'vue-router'
import {useUserStore} from "@/store";

export const routes = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        name: 'index',
        path: '/index',
        component: () => import("@/views/index/index.vue")
    },
    {
        name: 'login',
        path: '/login',
        component: () => import("@/views/login/index.vue")
    },
    {
        name: 'home',
        path: '/home',
        component: () => import("@/views/home/index.vue")
    }

]

const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
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

export default router
