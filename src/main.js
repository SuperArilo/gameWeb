import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
app.use(lazyPlugin, {
    loading: '',
    error: ''
})
app.config.globalProperties.$axios = axios