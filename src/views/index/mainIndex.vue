<template>
  <div class="main">
    <div v-if="!useLayout.layout.isNav" class="content_menu">
      <LayoutMenu></LayoutMenu>
    </div>
    <div class="content">
      <header>
        <Header></Header>
      </header>
      <div class="content_main">
        <div class="breadcrumb" v-if="useLayout.layout.isBreadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="(item, index) in breadcrumbList"
              :key="index"
              :to="item.path"
            >
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="card">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useUserStore, useLayoutStore } from '@/store'
import Header from '@/components/layout/header.vue'
import LayoutMenu from '@/components/layout/layoutMenu.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const userStore = useUserStore()
const useLayout = useLayoutStore()
const breadcrumbList = ref<any>([])
onMounted(() => {
  breadcrumbList.value = findBreadcrumb(useLayout.menuList, route.path)
})
watch(
  () => route.path,
  (newPath) => {
    breadcrumbList.value = findBreadcrumb(useLayout.menuList, route.path)
    if (route.path === '/setting') {
      breadcrumbList.value = [
        {
          name: '设置',
          path: '/setting'
        }
      ]
    }
  }
)
const findBreadcrumb = (menu: any, path: any, breadcrumb = []): any => {
  for (const item of menu) {
    const newBreadcrumb: any = [...breadcrumb, { name: item.name, path: item.path }]
    if (item.path === path) {
      return newBreadcrumb
    }
    if (item.children && item.children.length > 0) {
      const childBreadcrumb = findBreadcrumb(item.children, path, newBreadcrumb)
      if (childBreadcrumb) {
        return childBreadcrumb
      }
    }
  }
  return null
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    header {
      width: 100%;
    }
    .content_main {
      overflow: auto;
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      padding: var(--padding-LR-2);
      background-color: var(--card-bg-color-1);
      .breadcrumb {
        height: 3%;
      }
      .card {
        width: 100%;
        height: 100%;
        overflow: auto;
        :deep(.el-card) {
          box-shadow: none;
        }
        :deep(.el-card__body) {
          width: 100%;
          height: 100%;
        }
      }
    }
    .content_main::-webkit-scrollbar {
      width: 8px;
      background: transparent;
    }

    .content_main::-webkit-scrollbar-thumb {
      border-radius: 6px;
      border: 2px solid transparent;
      background-clip: content-box;
      background-color: var(--scrollbar-color);
    }
  }
  .content_menu {
    height: 100%;
    :deep(.el-menu) {
      border-right: none;
    }
    :deep(.el-menu-vertical-menu:not(.el-menu--collapse)) {
      width: 200px;
      min-height: 400px;
    }
    :deep(.el-icon svg) {
      width: 1em;
      height: 1em;
      vertical-align: middle;
    }
  }

  :deep(.el-icon) {
    font-size: var(--size-7);
  }
}
</style>
