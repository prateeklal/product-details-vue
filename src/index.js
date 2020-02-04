import Vue from 'vue';
import VueIcon from 'vue-icon';
import App from './App.vue'
import routes from './routes';
import './style.scss';

Vue.use(VueRouter);
Vue.use(VueIcon, 'v-icon');

import VueRouter from 'vue-router';
const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');