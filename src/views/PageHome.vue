<template>
  <div class="content-interview">
    <app-card>
      <template #title>Новое собеседование</template>
      <template #content>
        <app-input-text class="input mb-3" placeholder="Компания" v-model="company" />
        <app-input-text
          v-model="vacancyLink"
          class="input mb-3"
          placeholder="Описание вакансии (ссылка)"
        />
        <app-input-text v-model="hrName" class="input mb-3" placeholder="Контакт (имя)" />
        <app-input-text
          v-model="contactTelegram"
          class="input mb-3"
          placeholder="Telegram username HR"
        />
        <app-input-text
          v-model="contactWhatsApp"
          class="input mb-3"
          placeholder="WhatsApp телефон HR"
        />
        <app-input-text v-model="contactPhone" class="input mb-3" placeholder="Телефон HR" />
        <app-button
          @click="addNewInterview"
          label="Создать собеседование"
          :disabled="disabledSaveButton"
          :loading="loading"
        ></app-button>
      </template>
    </app-card>
  </div>
</template>

<script setup lang="ts">
import type { IInterview } from '@/interfaces'
import { computed, ref } from 'vue'
// import { getAuth } from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const company = ref('')
const vacancyLink = ref('')
const hrName = ref('')
const contactTelegram = ref('')
const contactWhatsApp = ref('')
const contactPhone = ref('')
const loading = ref(false)

const router = useRouter()
const userStore = useUserStore()

const disabledSaveButton = computed(() => {
  return !(company.value && vacancyLink.value && hrName)
})

const addNewInterview = async () => {
  loading.value = true
  const payload: IInterview = {
    id: uuidv4(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactWhatsApp: contactWhatsApp.value,
    contactPhone: contactPhone.value,
    createdAt: new Date(),
  }

  // const userId = getAuth().currentUser?.uid ИЛИ
  const userId = userStore.userId

  if (userId) {
    const db = getFirestore()
    await setDoc(doc(db, `users/${userId}/interviews`, payload.id), payload).then(() => {
      router.push('/list')
    })
  }

  loading.value = false
}
</script>

<style scoped></style>

<style scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: auto;
}
</style>
