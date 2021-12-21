import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'animate.css'
// import axios from 'axios'
import mitt from 'mitt'
import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin"
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, { Hljs: hljs});
VMdEditor.use(githubTheme, {Hljs: hljs,});

const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter
app.use(VueMasonryPlugin)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
app.use(VMdPreview)
app.use(VMdEditor)
app.config.globalProperties.$axios = axios