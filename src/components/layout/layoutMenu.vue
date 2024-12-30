<template>
  <div
    v-if="!layoutStore.layout.isNav"
    :class="{
      logo: !layoutStore.layout.isCollapse,
      sh_logo: layoutStore.layout.isCollapse
    }"
  ></div>
  <div class="logo" style="width: 200px" v-else></div>
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
        <i v-if="item.icon" class="el-icon"
          ><component :is="getIconComponent(item.icon)"></component
        ></i>
        <span>{{ item.name }}</span>
      </el-menu-item>

      <el-sub-menu v-else :index="item.path">
        <template #title>
          <i v-if="item.icon" class="el-icon"
            ><component :is="getIconComponent(item.icon)"></component
          ></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          <i v-if="child.icon" class="el-icon"
            ><component :is="getIconComponent(child.icon)"></component
          ></i>
          <span>{{ child.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { defineProps, resolveComponent } from 'vue'
import { useLayoutStore } from '@/store'
import router from '@/router'
import * as Icons from '@element-plus/icons-vue'

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

const getIconComponent = (iconName: any) => {
  return Icons[iconName as keyof typeof Icons]
}
</script>

<style scoped lang="scss">
.logo {
  width: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid #e9e9e9;
}
.logo:after {
  position: absolute;
  content: '';
  width: 60%;
  max-width: 120px;
  height: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('@/assets/images/home/logo.png') no-repeat;
  background-size: 100% 100%;
  transition: all 0.3s ease;
}
.sh_logo {
  width: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid #e9e9e9;
}
.sh_logo:after {
  position: absolute;
  content: '';
  width: 80%;
  max-width: 50px;
  height: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('@/assets/images/home/en_logo.png') no-repeat;
  background-size: 100% 100%;
  transition: all 0.3s ease;
}
</style>
