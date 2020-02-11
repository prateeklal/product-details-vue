import { shallowMount } from '@vue/test-utils'
import Overview from './Overview.vue';
const localVue = global.localVue;
const router = global.router;

describe('Overview', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Overview, { localVue, router });
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  xtest('fetchProducts when created', () => {
    console.log(wrapper.attributes());
    expect(wrapper.attributes.fetchProducts).toHaveBeenCalled();
  })
})