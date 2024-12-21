<template>
  <div class="main">
    <video class="bg-video" autoplay loop muted>
      <source src="@/assets/bg.mp4" type="video/mp4" />
    </video>
    <div class="login_header">
      <img src="@/assets/vue.svg" alt="" />
      <div class="options_container">
        <i @click="btnHref('https://github.com/DiCaprioGD/vue3_demo')"><svg
          t="1734247938277"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1446"
          width="30"
          height="30"
        >
          <path
            d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
            p-id="1447"
          ></path>
        </svg></i>
      </div>
    </div>
    <div class="login_container">
      <div class="title">登录</div>
      <div class="title">Vue+Ts模板</div>
      <div class="register_container">
        <template v-if="!isRegister"> <span style="color: var(--font-color-gray-3)">没有账号吗? </span><span style="cursor: pointer" @click="isRegister = !isRegister">注册新账号</span> </template>
        <template v-else> <span style="color: var(--font-color-gray-3)">已有账号? </span><span style="cursor: pointer" @click="isRegister = !isRegister">登录</span> </template>
      </div>
      <div class="form_container">
        <FormatForm @confirm="login" ref="form" :form-item="loginItem" />
        <el-button @click="btnConfirm" style="width: 100%;" type="primary">{{ isRegister ? '注册' : '登录'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import FormatForm from '@/components/formatForm/index.vue'
import {useUserStore} from "@/store";
import router from "@/router";

const isRegister = ref(false)
const form = ref()
const store = useUserStore()
const loginItem = ref([
  {
    key: 'username',
    itemType: 'input',
    placeholder: '请输入您的用户名',
    required: true,
    icon: User,
    prefixIcon: 'prefix-icon',
    contentWidth: '100%'
  },
  {
    key: 'password',
    itemType: 'input',
    type: 'password',
    placeholder: '请输入您的密码',
    required: true,
    showPassword: true,
    icon: Lock,
    prefixIcon: 'prefix-icon',
    contentWidth: '100%'
  },
  {
    key: 'repassword',
    itemType: 'input',
    type: 'password',
    placeholder: '请再次输入您的密码',
    required: true,
    showPassword: true,
    icon: Lock,
    prefixIcon: 'prefix-icon',
    contentWidth: '100%',
    isHidden: true
  },
  {
    label: '记住密码',
    key: 'rememberMe',
    itemType: 'checkbox',
    isHidden: false
  }
])
watch(() => isRegister.value, () => {
    loginItem.value.map(item => Object.keys(item).indexOf('isHidden') >= 0 ? item.isHidden = !item.isHidden : '')
})
const btnConfirm = () => {
  form.value.saveFn()
}
const login = (form: Record<any, any>) => {
  let obj = {
    ...form,
    token: '111'
  }
  store.updateUser(obj)
  router.push('/index')
}
const btnHref = (link: string) => {
  if (!link) return
  window.open(link)
}
onMounted(() => {
  if (store.user.token) {
    router.push('/index')
  }
  if (store.user.rememberMe) {
    loginItem.value[0].value = store.user.username
    loginItem.value[1].value = store.user.password
    loginItem.value[3].value = store.user.rememberMe
  }
})
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: var(--font-color-gray-1);
  .bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  .login_header {
    height: 56px;
    padding: 0 var(--size-8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    color: var(--font-color-gray-1);
    z-index: 2;
    .options_container {
      i {
        cursor: pointer;
      }
    }
  }
  .login_container {
    position: absolute;
    top: 22%;
    left: 5%;
    line-height: 22px;
    padding: var(--padding-LR-5) var(--padding-LR-3);
    display: flex;
    flex-direction: column;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border-radius: var(--radius-medium);
    z-index: 2;
    .title {
      font-size: 35px;
      line-height: 35px;
      font-weight: bold;
      color: var(--font-color-gray-2);
    }
    .register_container {
      margin-top: 20px;
    }
    .form_container {
      width: 400px;
      margin-top: 48px;
    }
  }
}
</style>
