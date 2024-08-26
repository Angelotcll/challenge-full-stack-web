import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { registerPlugins } from '@/plugins'

const vuetify = createVuetify()
const app = createApp(App)
registerPlugins(app)
app.use(router)
app.use(vuetify)
app.mount('#app')
