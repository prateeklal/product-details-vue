import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import ProductsList from './ProductsList.vue';

describe('ProductsList Component should mount', () => {
  it('should display the list of products', () => {
    const wrapper = shallowMount(ProductsList);
  })
});
