import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BigNumber from 'bignumber.js';
import ElementUI from 'element-ui';
import install from '@/utils/met';

import 'element-ui/lib/theme-chalk/index.css';
import './common/style/index.scss';
import '@/utils/global'
import '@/utils/globalUtil'
import '@/utils/globalFilter'
// import 'lib-flexible/flexible.js'

Vue.use(ElementUI);
Vue.use(install);

Vue.config.productionTip = false;
Vue.config.silent = true;
window.BigNumber = (number: number | string) =>  new BigNumber(number)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
