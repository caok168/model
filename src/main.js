import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './el';
import './assets/index.less';
import './assets/main.cdn.min.css';
// import './assets/css/style.css';

const dayjs = require('dayjs');

const utc = require('dayjs/plugin/utc');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc);
dayjs.extend(customParseFormat);

Vue.config.productionTip = false;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
