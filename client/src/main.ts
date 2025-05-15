import './assets/main.css'
import { createApp } from 'vue';
import Oruga from '@oruga-ui/oruga-next/src/index.js';
import App from './App.vue';
import router from './router';
import Buefy from 'buefy';

const app = createApp(App);
app
.use(router)
.use(Buefy, {
  defaultIconPack: 'fas', // Font Awesome 5})
})
.use(Oruga)


app.mount('#app');
