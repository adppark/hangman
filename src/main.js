import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { router } from './router/index.js';
import store from './store.js';

const app = createApp(App);
// app.config.globalProperties.$store = stores;
app.use(router);
app.use(store);
app.mount('#app');
