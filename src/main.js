import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/router'

const app = createApp(App)

// 注入路由
app.use(router)

app.use(ElementPlus)
app.mount('#app')

