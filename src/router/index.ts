import { createRouter, createWebHistory, } from 'vue-router'

export const routes = [
    {
        path: '/',
        redirect: '/login',
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
    next()
})

export default router
