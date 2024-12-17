import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Tickets, EditPen, CopyDocument, House } from '@element-plus/icons-vue'

export const useLayoutStore = defineStore('layout', () => {
  const layout = ref<Record<any, any>>({
    isCollapse: false,
    isNav: false,
    isBreadcrumb: false,
    menuList: [
      {
        name: '首页',
        path: '/index',
        icon: House,
        children: []
      },
      {
        name: '列表',
        path: 'list',
        icon: Tickets,
        children: [
          {
            name: '基础列表',
            path: '/list',
            children: []
          }
        ]
      },
      {
        name: '表单',
        path: 'form',
        icon: EditPen,
        children: [
          {
            name: '基础表单',
            path: '/form',
            children: []
          }
        ]
      },
      {
        name: '详情',
        path: 'details',
        icon: CopyDocument,
        children: [
          {
            name: '基础详情',
            path: '/details',
            children: []
          }
        ]
      }
    ]
  })
  const updateLayout = (obj: Record<any, any>) => {
    layout.value = { ...layout.value, ...obj }
  }
  const toggleCollapse = () => {
    layout.value.isCollapse = !layout.value.isCollapse
  }
  return {
    layout,
    updateLayout,
    toggleCollapse
  }
})
