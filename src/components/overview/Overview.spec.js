import { shallowMount } from '@vue/test-utils'
import Overview from './Overview.vue';
jest.mock('axios');

describe('Overview', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Overview);
  });

  xit('should fetch products and update state', () => {
    wrapper.vm.fetchProducts();
  });
})