export const DesignRoutes = [
  {
    path: '/designAbout',
    name: 'About',
    component: () => import('@/views/design/aboutView.vue')
  },
  {
    path: '/designLayout',
    name: 'Layout',
    component: () => import('@/views/design/layoutView.vue')
  },
  {
    path: '/designColor',
    name: 'color',
    component: () => import('@/views/design/colorView.vue')
  },
  {
    path: '/designFont',
    name: 'font',
    component: () => import('@/views/design/fontView.vue')
  }
]
