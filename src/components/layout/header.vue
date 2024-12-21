<template>
  <div class="nav-main">
    <div class="logo" style="margin-right: var(--size-5)">
      <img style="width: 40px" src="../../../public/vite.svg" alt="Element logo" />
    </div>
    <div
      v-if="!layoutStore.layout.isNav"
      class="nav-item nav-icon-item"
      style="margin-left: var(--size-5)"
    >
      <el-tooltip content="收缩菜单" placement="bottom" effect="light">
        <el-icon @click="collapseUpdate" size="16"><SetUp /></el-icon>
      </el-tooltip>
    </div>
    <template v-if="layoutStore.layout.isNav">
      <layout-menu v-if="layoutStore.layout.isNav" style="flex: 1" :mode="'horizontal'" />
    </template>
    <template v-else>
      <div style="flex: 1"></div>
    </template>
    <div class="nav-item nav-icon-item">
      <el-tooltip content="设置" placement="bottom" effect="light">
        <el-icon @click="router.push('/setting')"><Setting /></el-icon>
      </el-tooltip>
    </div>
    <el-dropdown trigger="click">
      <div class="el-dropdown-link nav-item nav-item-text" style="width: auto">
        <i class="el-icon" v-if="!userStore.user.avatar"><User /></i>
        <span style="margin: 0 var(--size-4)">{{ userStore.user.username }}</span>
        <i class="el-icon" v-if="!userStore.user.avatar"><ArrowDown /></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="User">个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout" :icon="SwitchButton"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Setting, SetUp, User, SwitchButton, ArrowDown } from '@element-plus/icons-vue'
import { useLayoutStore, useUserStore } from '@/store'
import router from '@/router'
import LayoutMenu from '@/components/layout/layoutMenu.vue'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const activeIndex = ref()

const logout = () => {
  userStore.logout()
  router.push('/login')
}

const collapseUpdate = () => {
  layoutStore.toggleCollapse()
}
</script>

<style scoped lang="scss">
.nav-main {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 var(--padding-LR-5);
  border-bottom: 1px solid #e9e9e9;
  :deep(.el-menu) {
    border-right: none;
  }
}
</style>
