<template>
  <app-toast position="bottom-right" />
  <div class="flex justify-content-center p-2">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
        <span class="text-600 font-medium line-height-3">{{ subtitleText }}</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toggleAuth">
          {{ linkAccountText }}
        </a>
      </div>

      <form @submit.prevent="submitForm">
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <app-input-text v-model="email" id="email1" type="email" class="w-full mb-3" />

        <label for="password1" class="block text-900 font-medium mb-2">Пароль</label>
        <app-input-text v-model="password" id="password1" type="password" class="w-full mb-3" />

        <app-button
          :label="submitButtonText"
          type="submit"
          icon="pi pi-user"
          :loading="isLoading"
          class="w-full"
        ></app-button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useToast } from 'primevue/usetoast'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const isLogin = ref(true)

const toast = useToast()

const router = useRouter()
const userStore = useUserStore()

const toggleAuth = () => {
  isLogin.value = !isLogin.value
}

const submitForm = () => {
  isLoading.value = true
  if (isLogin.value) {
    signIn()
  } else {
    signUp()
  }
}

const signUp = async () => {
  try {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    router.push('/')
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
      toast.add({ severity: 'error', summary: 'Error', detail: e.message, life: 3000 })
    }
  } finally {
    isLoading.value = false
  }
}

const signIn = async () => {
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    router.push('/')
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
      toast.add({ severity: 'error', summary: 'Error', detail: e.message, life: 3000 })
    }
  } finally {
    isLoading.value = false
  }
}

const subtitleText = computed<string>(() => {
  return isLogin.value ? 'Аккаунта еще нет?' : 'Уже есть аккаунт?'
})

const linkAccountText = computed<string>(() => {
  return isLogin.value ? 'Создайте сейчас' : 'Войдите в него'
})

const submitButtonText = computed<string>(() => {
  return isLogin.value ? 'Вход' : 'Регистрация'
})
</script>
