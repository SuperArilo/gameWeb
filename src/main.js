import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'animate.css'
// import axios from 'axios'
import mitt from 'mitt'
import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin"
const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter
app.use(VueMasonryPlugin)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
app.config.globalProperties.$axios = axios