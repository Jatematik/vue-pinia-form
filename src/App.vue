<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { onMounted, ref } from 'vue'

import AppHeader from './components/AppHeader.vue'
import { useUserStore } from '@/stores/user'

const isLoading = ref(true)
const userStore = useUserStore()

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      console.log(user)

      userStore.userId = user.uid
    } else {
      userStore.userId = ''
    }

    isLoading.value = false
  })
})
</script>

<template>
  <app-progress v-if="isLoading" />
  <div class="container" v-else>
    <AppHeader />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
