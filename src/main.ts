import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";

import App from './App.vue'
import { router } from '@/router'

import 'uno.css'
// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import './styles/index.scss'
// if you do not need ssg:

const app = createApp(App)
app.use(router)
app.use(ElementPlus);
app.mount("#app");
