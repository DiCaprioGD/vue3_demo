import { defineStore } from "pinia";
import type { UserType } from "../types/user";
import { ref } from 'vue';

export const useUserStore = defineStore("user", () => {
    const user = ref<UserType>(
        {
            name: "cs"
        });
    const updateUser = (obj: UserType) => {
        user.value.name = obj.name;
    };

    return {
        user,
        updateUser
    }
});