import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(less);

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/img/placeholder.png'),
  error: require('./assets/img/placeholder.png')
})

import toast from '@/components/common/toast/index';
Vue.use(toast)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
