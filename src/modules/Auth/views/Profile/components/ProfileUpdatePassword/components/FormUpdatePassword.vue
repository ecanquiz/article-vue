<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  message?: string
  error?: string
  sending?: boolean
}>()

const emit = defineEmits(['submit'])
const currentPassword = ref<string>()
const password = ref<string>()
const passwordConfirm = ref<string>()

const submit = async () => {
  emit('submit', {
    current_password: currentPassword.value,
    password: password.value,
    password_confirmation: passwordConfirm.value
  })
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="mb-2">
      <label for="password" class="text-sm text-gray-500"
        >Current Password</label
      >
      <input
        type="password"
        id="current-password"
        v-model="currentPassword"
        class="password"
        data-testid="current-password-input"
      />
    </div>
    <div class="mb-2">
      <label for="password" class="text-sm text-gray-500">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="password"
        data-testid="password-input"
      />
    </div>
    <div class="mb-4">
      <label for="password-confirm" class="text-sm text-gray-500"
        >Confirm Password</label
      >
      <input
        type="password"
        id="password-confirm"
        v-model="passwordConfirm"
        class="password"
         data-testid="password-confirm-input"
      />
    </div>
    <AppButton type="submit"
      :text="props.sending ? 'Guardando...': 'Guardar'"
      :isDisabled="props.sending"
      data-testid="submit-button"
    />    
    <AppFlashMessage :message="props.message" :error="props.error" />
  </form>
</template>

<style scoped>
.password {
  @apply
    block
    w-full
    px-3
    py-2
    placeholder-gray-400
    border
    border-gray-300
    rounded-md
    shadow-sm
    appearance-none
    focus:outline-none
    focus:ring-blue-500
    focus:border-blue-500;
}
</style>
