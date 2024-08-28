import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { registerPlugins } from '@/plugins'
import vuetify from '@/plugins/vuetify'

const app = createApp(App)
app.use(router)
app.use(vuetify)
registerPlugins(app)
app.mount('#app')
