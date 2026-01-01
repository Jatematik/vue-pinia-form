import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'
import Datatable from 'primevue/datatable'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import InlineMessage from 'primevue/inlinemessage'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Radiobutton from 'primevue/radiobutton'
import Badge from 'primevue/badge'
import Tooltip from 'primevue/tooltip'
import Chart from 'primevue/chart'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './styles.css'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyArbz12By03S076yg9pBfgN1NkzRtWOZwQ',
  authDomain: 'interviews-ec65c.firebaseapp.com',
  projectId: 'interviews-ec65c',
  storageBucket: 'interviews-ec65c.firebasestorage.app',
  messagingSenderId: '292504406730',
  appId: '1:292504406730:web:36629ac66173384c8b4233',
}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.directive('tooltip', Tooltip)
app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-toast', Toast)
app.component('app-progress', ProgressSpinner)
app.component('app-card', Card)
app.component('app-datatable', Datatable)
app.component('app-column', Column)
app.component('app-dialog', ConfirmDialog)
app.component('app-message', InlineMessage)
app.component('app-input-number', InputNumber)
app.component('app-textarea', Textarea)
app.component('app-calendar', Calendar)
app.component('app-radio', Radiobutton)
app.component('app-badge', Badge)
app.component('app-chart', Chart)

app.mount('#app')
