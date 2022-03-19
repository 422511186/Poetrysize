import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'


import '@/assets/font/font.css'

const app = createApp(App)

app.config.globalProperties.$axios = axios

// 注入路由
app
    .use(router)
    .use(ElementPlus)
    // .use(axios)

app.mount('#app')

