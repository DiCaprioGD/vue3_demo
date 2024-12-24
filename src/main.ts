import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/variable.scss'
import router from './router'
import Pinia from './store'
import i18n from './locales'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(Pinia)
app.use(i18n)
app.mount('#app')
