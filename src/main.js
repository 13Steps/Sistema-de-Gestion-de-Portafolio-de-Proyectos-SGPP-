import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import 'material-icons/iconfont/material-icons.css';

import HighchartsVue from 'highcharts-vue';

const app = createApp(App);

app.use(store)
   .use(router)
   .use(HighchartsVue);

app.mount('#app');
