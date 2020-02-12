import { shallowMount } from '@vue/test-utils';
import AppHeader from './AppHeader.vue';

describe('AppHeader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(AppHeader);
  });

  it('should emit toggleCart', () => {
    wrapper.vm.displayCart();
    expect(wrapper.emitted().toggleCart).toBeTruthy();
  });

  it('should add totalItems correctly', () => {
    wrapper.setProps({
      cart: [
        { qty: 1 },
        { qty: 6 }
      ]
    })
    let items = wrapper.vm.totalItems;
    expect(items).toBe(7);
  });
});