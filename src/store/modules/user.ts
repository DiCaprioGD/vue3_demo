import { defineStore } from 'pinia'
import type { UserType } from '@/types/user'
import { ref } from 'vue'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserType>({
    username: '',
    token: '',
    isLoggedIn: false
  })
  const updateUser = (obj: UserType) => {
    user.value = obj
    user.value.isLoggedIn = true
    Cookies.set('user', JSON.stringify(obj), { expires: 7 })
  }
  const logout = () => {
    user.value.token = ''
    user.value.isLoggedIn = false
    updateUser(user.value)
    if (!user.value.rememberMe) {
      user.value = {}
      Cookies.remove('user')
    }
    Cookies.remove('layoutBak')
  }
  const loadUser = () => {
    const storedUser = Cookies.get('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      user.value.isLoggedIn = true
    }
  }
  return {
    user,
    logout,
    loadUser,
    updateUser
  }
})
