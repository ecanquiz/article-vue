<script setup lang="ts">
import { useAuthStore } from "@/modules/Auth/stores"
import FormVerifyEmail from "./components/FormVerifyEmail.vue"

const store = useAuthStore()
</script>

<template>
  <div v-if="store.authUser">
    <transition name="fade">
      <img
        v-if="store.authUser && store.authUser.avatar"
        :src="store.authUserAvatar"
        class="w-16 h-16 rounded-full lg:w-20 lg:h-20"
        alt=""
      />
    </transition>
    <ul>
      <li class="mb-1 font-bold">{{ store.authUser.name }}</li>
      <li>Email: {{ store.authUser.email }}</li>
      <li v-if="store.authUser.emailVerified" class="text-gray-500">
        Emailed Verified
      </li>
    </ul>
    <FormVerifyEmail v-if="!store.authUser.emailVerified" class="mt-4" />
  </div>
</template>

