<template>
<RouterView />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useLayoutStore, useUserStore} from "@/store";

const userStore = useUserStore()
const layoutStore = useLayoutStore()
onMounted(() => {
  userStore.loadUser()
  layoutStore.loadLayout()
})
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
