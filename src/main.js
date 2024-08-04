import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import 'material-icons/iconfont/material-icons.css';

import HighchartsVue from 'highcharts-vue';

import minIx from '@/Tools/mixIn';

const app = createApp(App);

app.mixin(minIx);

app.use(store)
   .use(router)
   .use(HighchartsVue);

app.mount('#app');
