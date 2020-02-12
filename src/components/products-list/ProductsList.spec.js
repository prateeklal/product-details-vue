import { shallowMount } from '@vue/test-utils';
import ProductsList from './ProductsList.vue';

describe('ProductsList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ProductsList);
  });

  it('should emit sortbyprice', () => {
    wrapper.setData({
      sortByAsc: false
    });

    wrapper.vm.sortPrice();
    expect(wrapper.vm.sortByAsc).toBeTruthy();
    expect(wrapper.emitted().sortPrice).toBeTruthy();
  });

  it('should emit addToCart', () => {
    wrapper.vm.addToCart();
    expect(wrapper.emitted().addToCart).toBeTruthy();
  });
});