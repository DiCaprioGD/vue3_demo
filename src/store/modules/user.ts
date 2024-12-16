import { defineStore } from "pinia";
import type { UserType } from "@/types/user";
import { ref } from 'vue';

export const useUserStore = defineStore("user", () => {
    const user = ref<UserType>(
        {
            name: '',
            token: '',
            isLoggedIn: false
        });
    const updateUser = (obj: UserType) => {
        user.value = obj;
        user.value.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(obj));
    };
    const logout = () => {
        user.value.token = ''
        user.value.isLoggedIn = false
        updateUser(user.value);
        if (!user.value.rememberMe) {
            user.value = {}
            localStorage.removeItem('user')
        }
    };
    const loadUser = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user.value = JSON.parse(storedUser);
            user.value.isLoggedIn = true;
        }
    };
    return {
        user,
        logout,
        loadUser,
        updateUser
    }
});