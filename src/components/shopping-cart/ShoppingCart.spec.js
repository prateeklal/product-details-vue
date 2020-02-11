import { shallowMount } from '@vue/test-utils';
import ShoppingCart from './ShoppingCart.vue';

describe('Shopping Cart', () => {
  it('should display empty cart if no items', () => {
    let wrapper = shallowMount(ShoppingCart, {
      propsData: {
        cart: [],
      }
    });
    expect(wrapper.contains('.empty-cart')).toBe(true);
    expect(wrapper.contains('.cart-total')).toBe(false);
  });

  it('should not display empty cart class if prop cart has a value', () => {
    let wrapper = shallowMount(ShoppingCart, {
      propsData: {
        cart: [{ "id": "belgian-linen-embroidery-duvet-cover-shams-white-midnight-b3026", "name": "Belgian Linen Ladder Stripe Embroidery Duvet Cover &amp; Shams - White/Midnight", "price": 35.2, "thumb": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/202003/0005/belgian-linen-ladder-stripe-embroidery-duvet-cover-shams-w-m.jpg", "height": 363 }, "qty": 1 }],
        totalItems: 0
      }
    });
    expect(wrapper.contains('.empty-cart')).toBe(false);
    expect(wrapper.contains('.cart-total')).toBe(true);
  });

  it('inc method should emit increaseQty with product obj', () => {
    let wrapper = shallowMount(ShoppingCart);
    let product = { "id": "belgian-linen-embroidery-duvet-cover-shams-white-midnight-b3026" }
    wrapper.vm.inc(product);
    expect(wrapper.emitted().increaseQty[0]).toEqual([product]);
  });

  it('dec method should emit decreaseQty with product obj', () => {
    let wrapper = shallowMount(ShoppingCart);
    let product = { "id": "belgian-linen-embroidery-duvet-cover-shams-white-midnight-b3026" }
    wrapper.vm.dec(product);
    expect(wrapper.emitted().decreaseQty[0]).toEqual([product]);
  });
});