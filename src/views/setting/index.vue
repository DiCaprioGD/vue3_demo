<template>
  <div class="setting_main">
    设置
    <div>
      <el-radio-group v-model="mode.isNav" @change="modeChange">
        <el-radio :value="false" size="large">左侧菜单</el-radio>
        <el-radio :value="true" size="large">顶部菜单</el-radio>
      </el-radio-group>
    </div>
    <div>
      <el-radio-group v-model="mode.isBreadcrumb" @change="modeChange">
        <el-radio :value="false" size="large">不展示面包屑</el-radio>
        <el-radio :value="true" size="large">展示面包屑</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLayoutStore } from '@/store'

const layoutStore = useLayoutStore()
const mode = ref({
  isNav: false,
  isBreadcrumb: false
})
const modeChange = () => {
  layoutStore.updateLayout(mode.value)
}
</script>

<style scoped lang="scss"></style>
