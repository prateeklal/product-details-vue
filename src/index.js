import Vue from 'vue';
import './style.scss'
import App from './App.vue'
import feather from 'vue-icon'

Vue.use(feather, 'v-icon');

new Vue({
  render: h => h(App),
}).$mount('#app');