import Vue from 'vue';
import { createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
global.localVue = createLocalVue();

global.localVue.use(VueRouter);
global.router = new VueRouter();

Vue.component('v-icon', () => { });

Vue.filter('currency', function (price) {
  return `$${price.toFixed(2)}`;
});

