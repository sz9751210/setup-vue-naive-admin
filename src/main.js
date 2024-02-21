import '@/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'
import { setupRouter } from './router'
import App from './App.vue'

const app = createApp(App)

setupRouter(app)

app.mount('#app')
