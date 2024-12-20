<template>
  <div class="logo">
    <img style="width: 40px" src="../../../public/vite.svg" alt="Element logo" />
  </div>
  <el-menu
    class="el-menu-vertical-menu"
    :collapse="layoutStore.layout.isCollapse"
    :mode="props.mode"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    style="flex: 1"
  >
    <template v-for="item in layoutStore.menuList" :key="item.path">
      <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path">
        <i v-if="item.icon" class="el-icon"><component :is="item.icon" /></i>
        <span>{{ item.name }}</span>
      </el-menu-item>

      <el-sub-menu v-else :index="item.path">
        <template #title>
          <i v-if="item.icon" class="el-icon"><component :is="item.icon" /></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          <i v-if="child.icon" class="el-icon"><component :is="child.icon" /></i>
          <span>{{ child.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useLayoutStore } from '@/store'
import router from '@/router'

const props = defineProps({
  mode: {
    type: String,
    default: 'vertical'
  }
})
const layoutStore = useLayoutStore()
const handleSelect = (key: any, keyPath: any) => {
  console.log('Selected menu item:', key, keyPath)
  router.push(key) // 使用 Vue Router 进行页面跳转
}
const handleOpen = (key: string) => {
  console.log(key)
}
const handleClose = (key: string) => {
  console.log(key)
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
