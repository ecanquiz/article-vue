<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useAuthStore } from "@/modules/Auth/stores"
 
const props = defineProps<{
  message?: string
  error?: string
  sending?: boolean
}>()
   
const emit = defineEmits(['submit'])

const store = useAuthStore()  
const name = ref<string>()
const email = ref<string>()
  
const submit = async () => {
  emit('submit', {
    name: name.value,
    email: email.value
  })
}

onMounted(() => {
  name.value = store.authUser.name
  email.value = store.authUser.email
})
</script>

<template>
  <form @submit.prevent="submit">
    <AppInput
      type="text"
      label="Nombre"
      name="name"
      v-model="name"
      class="mb-2"
      data-testid="name-input"
    />
    <AppInput
      type="email"
      label="Correo"
      name="email"
      v-model="email"
      autocomplete="email"
      placeholder="luke@jedi.com"
      class="mb-4"
      data-testid="email-input"
    />
    <AppButton
      type="submit"
      :text="props.sending ? 'Guardando...': 'Guardar'"
      :isDisabled="props.sending"
      data-testid="submit-button"
    />
    <AppFlashMessage :message="props.message" :error="props.error" />
  </form>
</template>
