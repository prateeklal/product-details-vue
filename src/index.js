import Vue from 'vue';
import VueIcon from 'vue-icon';
import VueLazyload from 'vue-lazyload';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import loadingImg from './assets/loading.gif';
import './style.scss';

Vue.use(VueRouter);

// For using svg icons
Vue.use(VueIcon, 'v-icon');

// Vue lazy load for images and lazy scroll
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadingImg,
  attempt: 1
});

// Currency filter
Vue.filter('currency', function (price) {
  return `$${price.toFixed(2)}`;
});

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');