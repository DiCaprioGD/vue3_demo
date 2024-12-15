<template>
<div>
  index
  <el-button @click="logout">退出登录</el-button>
</div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store";
import router from "@/router";

const userStore = useUserStore()
const logout = () => {
  userStore.logout();
  router.push('/login')
}
</script>

<style scoped lang="scss">

</style>