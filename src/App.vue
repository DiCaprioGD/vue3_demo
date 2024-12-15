<template>
<RouterView />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useUserStore} from "@/store";

const userStore = useUserStore()
onMounted(() => {
  userStore.loadUser()
})
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
