<template>
  <div class="setting_main">
    设置
    <div>
      <el-radio-group v-model="mode.isNav" @change="modeChange">
        <el-radio :value="false" size="large">{{ t('pages.setting.leftNav') }}</el-radio>
        <el-radio :value="true" size="large">{{ t('pages.setting.topNav') }}</el-radio>
      </el-radio-group>
    </div>
    <div>
      <el-radio-group v-model="mode.isBreadcrumb" @change="modeChange">
        <el-radio :value="false" size="large">{{ t('pages.setting.hiddenBreadcrumb') }}</el-radio>
        <el-radio :value="true" size="large">{{ t('pages.setting.showBreadcrumb') }}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLayoutStore } from '@/store'
import { t } from '../../locales'

const layoutStore = useLayoutStore()
const mode = ref({
  isNav: false,
  isBreadcrumb: false
})
watch(
  () => layoutStore.layout,
  () => {
    mode.value = {
      ...mode.value,
      ...layoutStore.layout
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const modeChange = () => {
  layoutStore.updateLayout(mode.value)
}
</script>

<style scoped lang="scss"></style>
