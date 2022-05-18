import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
import "animate.css"
import '@/assets/fontawesome/css/all.min.css'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
app.config.globalProperties.$axios = axios