<template>
  <div class="nav-main">
    <div
      v-if="!layoutStore.layout.isNav"
      class="nav-item nav-icon-item"
      style="margin-left: var(--size-5)"
      @click="collapseUpdate"
    >
      <el-tooltip :content="t('layout.header.collapse')" placement="bottom" effect="light">
        <el-icon><SetUp /></el-icon>
      </el-tooltip>
    </div>
    <template v-if="layoutStore.layout.isNav">
      <layout-menu v-if="layoutStore.layout.isNav" :mode="'horizontal'" />
    </template>
    <template v-else>
      <div style="flex: 1"></div>
    </template>
    <el-tooltip :content="t('layout.header.message')" placement="bottom" effect="light">
      <el-badge :value="3" class="item" style="margin-right: 10px">
        <span class="nav-item nav-icon-item">
          <el-icon><ChatLineRound /></el-icon>
        </span>
      </el-badge>
    </el-tooltip>
    <el-dropdown
      style="margin-right: 10px"
      trigger="click"
      @command="
        (val: string) => {
          changeLang(val)
        }
      "
    >
      <div class="el-dropdown-link nav-item nav-icon-item">
        <el-icon
          ><svg
            t="1734510102732"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6204"
            width="95"
            height="95"
          >
            <path
              d="M425.6 668.928c-88.32 73.6-195.2 132.48-320 176-13.44 3.2-20.48 5.12-21.12 5.12-5.76 0-10.88-7.68-17.28-22.4-8.96-25.6-22.4-47.36-40.32-66.56 138.24-42.24 247.68-95.36 328.32-158.72-73.6-79.36-131.2-187.52-174.08-325.12h-17.28l-113.92 1.92c-4.48 0-7.68-0.64-8.32-1.92a18.368 18.368 0 0 1-1.28-7.68v-72.96c0-4.48 0.64-7.68 1.92-8.32s3.84-1.28 7.68-1.28l113.92 1.92h206.08v-42.88c0-44.16-2.56-78.72-7.04-103.04 44.8 1.28 78.08 3.2 99.2 6.4 9.6 0 14.72 3.2 14.72 9.6 0 3.2-1.92 9.6-5.12 17.92-3.2 6.4-5.12 28.8-5.12 67.2v44.8h220.8l113.92-1.92c5.12 0 8.32 0.64 9.6 1.92 0.64 1.28 1.28 3.84 1.28 7.68v72.96c0 4.48-0.64 7.68-1.92 8.32a23.68 23.68 0 0 1-8.96 1.28l-113.92-1.92h-20.48c-37.12 134.4-93.44 242.56-168.32 324.48m62.72-324.48H278.4c33.28 107.52 82.56 194.56 147.84 261.76 60.8-62.72 105.6-149.76 135.04-261.76z"
              fill="#000"
              p-id="6205"
            ></path>
            <path
              d="M997.12 981.248h-97.92l-48.64-136.96h-211.2l-46.72 136.96H495.36l201.6-537.6h100.48l199.68 537.6z m-170.24-209.28l-74.88-214.4c-2.56-7.04-4.48-18.56-7.04-33.92h-1.28c-2.56 14.08-4.48 25.6-7.68 33.92l-73.6 214.4h164.48z"
              fill="#000"
              p-id="6206"
            ></path></svg
        ></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(lang, index) in langList" :key="index" :command="lang.value">{{
            lang.content
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="nav-item nav-icon-item" style="margin-right: 10px" @click="router.push('/setting')">
      <el-tooltip :content="t('layout.header.setting')" placement="bottom" effect="light">
        <el-icon><Setting /></el-icon>
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
          <el-dropdown-item :icon="User"> {{ t('constants.user.personalInfo') }} </el-dropdown-item>
          <el-dropdown-item @click="logout" :icon="SwitchButton">
            {{ t('constants.user.logout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Setting,
  SetUp,
  User,
  SwitchButton,
  ArrowDown,
  ChatLineRound
} from '@element-plus/icons-vue'
import { useLayoutStore, useUserStore } from '@/store'
import router from '@/router'
import LayoutMenu from '@/components/layout/layoutMenu.vue'
import { langList } from '@/locales'
import { useLocale } from '@/locales/useLocale'
import { t } from '@/locales'

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

const { changeLocale } = useLocale()
const changeLang = (lang: string) => {
  changeLocale(lang)
}
</script>

<style scoped lang="scss">
.nav-main {
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #e9e9e9;
  padding: 0 10px;
  :deep(.el-menu) {
    border-right: none;
  }
}
</style>
