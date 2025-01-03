import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import router from '@/router'

export const useLayoutStore = defineStore('layout', () => {
  const layout = ref<Record<any, any>>({
    isCollapse: false,
    isNav: false,
    isBreadcrumb: false,
    systemName: 'light'
  })
  const menuList = ref()

  const light = ref([
    {
      name: '首页',
      path: '/index',
      icon: 'House',
      children: []
    },
    {
      name: '列表',
      path: 'list',
      icon: 'Tickets',
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
      icon: 'EditPen',
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
      icon: 'CopyDocument',
      children: [
        {
          name: '基础详情',
          path: '/details',
          children: []
        }
      ]
    },
    {
      name: '3D',
      path: '3D',
      icon: 'ElementPlus',
      children: [
        {
          name: '3D图形查看',
          path: '/3Dview',
          children: []
        }
      ]
    }
  ])

  const design = ref([
    {
      name: '指南',
      path: '/designAbout',
      icon: 'House',
      children: []
    },
    {
      name: '基础信息',
      icon: 'House',
      children: [
        {
          name: '基础布局',
          icon: 'House',
          path: '/designLayout',
          children: []
        },
        {
          name: '色彩',
          icon: 'House',
          path: '/designColor',
          children: []
        },
        {
          name: '字体',
          icon: 'House',
          path: '/designFont',
          children: []
        }
      ]
    }
  ])

  const sysList = ref([
    {
      name: '光伏',
      value: 'light'
    },
    {
      name: '设计',
      value: 'design'
    }
  ])

  const colorFeatures = ref([
    {
      name: 'Blue / 蓝色',
      colorList: [
        '#275DE9',
        '#1F70FC',
        '#0684FF',
        '#0093FF',
        '#21A4FF',
        '#54B5FF',
        '#8BCAFF',
        '#BADEFF',
        '#E2F3FF'
      ]
    },
    {
      name: 'Green / 绿色',
      colorList: [
        '#006A56',
        '#017A64',
        '#038A73',
        '#049780',
        '#28A792',
        '#4EB7A5',
        '#81CCBE',
        '#B2DFD7',
        '#E0F2F0'
      ]
    },
    {
      name: 'Orange / 橙色',
      colorList: [
        '#EB6503',
        '#F17402',
        '#F78501',
        '#FB9100',
        '#FCA125',
        '#FDB24B',
        '#FDC87E',
        '#FEDEB1',
        '#FFEACE'
      ]
    },
    {
      name: 'Red / 红色',
      colorList: [
        '#BC0005',
        '#CA0915',
        '#D7171E',
        '#E82523',
        '#F73222',
        '#F34742',
        '#EA6B68',
        '#F39593',
        '#FFCACE'
      ]
    },
    {
      name: 'Blue Gray / 蓝灰色',
      colorList: [
        '#1D252F',
        '#313D4B',
        '#455467',
        '#5B6D83',
        '#8D9EAE',
        '#CBD4DD',
        '#E9EFF3',
        '#F8FAFB',
        '#FFFFFF'
      ]
    },
    {
      name: 'Gray / 灰色',
      colorList: [
        '#424242',
        '#616161',
        '#757575',
        '#9E9E9E',
        '#BDBDBD',
        '#E0E0E0',
        '#EEEEEE',
        '#F5F5F5',
        '#FAFAFA'
      ]
    }
  ])
  const updateLayout = (obj: Record<any, any>) => {
    layout.value = { ...layout.value, ...obj }
    Cookies.set('layoutBak', JSON.stringify(layout.value))
  }
  const toggleCollapse = () => {
    layout.value.isCollapse = !layout.value.isCollapse
    updateLayout(layout.value)
  }
  const toggleSys = (sys: string) => {
    layout.value.systemName = sys
    menuList.value = sys === 'light' ? light.value : design.value
    updateLayout(layout.value)
    router.push(menuList.value[0].path)
  }
  const loadLayout = () => {
    const layoutJSON = Cookies.get('layoutBak')
    if (layoutJSON) {
      layout.value = {
        ...layout.value,
        ...JSON.parse(layoutJSON)
      }
      toggleSys(layout.value.systemName)
    }
  }
  return {
    layout,
    menuList,
    sysList,
    colorFeatures,
    updateLayout,
    toggleCollapse,
    loadLayout,
    toggleSys
  }
})
