import axios from 'axios';
import { shallowMount } from '@vue/test-utils'
import Overview from './Overview.vue';
import category from './__mocks__/category.json';

jest.mock('axios');
axios.get.mockResolvedValue(category[0]);

describe('Overview', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Overview);
  });

  it('should update state correctly', () => {
    expect(wrapper.vm.products).toEqual(category[0].data.groups);
    expect(wrapper.vm.category).toEqual(category[0].data);
  });

  it('should set the loading state as false when success', () => {
    wrapper.setData({
      loading: true
    });
    wrapper.vm.fetchProducts();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.loading).toBeFalsy();
    });
  })

  it('should sort products in ascending order', () => {
    const sortByAsc = true;
    wrapper.setData({
      products: [
        { priceRange: { selling: { low: 12 } } },
        { priceRange: { selling: { low: 13 } } },
        { priceRange: { selling: { low: 16 } } },
        { priceRange: { selling: { low: 11 } } },
      ]
    });

    wrapper.vm.sortByPrice(sortByAsc);
    expect(wrapper.vm.products[0].priceRange.selling.low).toBe(11);
    expect(wrapper.vm.products[2].priceRange.selling.low).toBe(13);
  });

  it('should sort products in descending order', () => {
    const sortByAsc = false;
    wrapper.setData({
      products: [
        { priceRange: { selling: { low: 12 } } },
        { priceRange: { selling: { low: 13 } } },
        { priceRange: { selling: { low: 16 } } },
        { priceRange: { selling: { low: 11 } } },
      ]
    });

    wrapper.vm.sortByPrice(sortByAsc);
    expect(wrapper.vm.products[0].priceRange.selling.low).toBe(16);
    expect(wrapper.vm.products[1].priceRange.selling.low).toBe(13);
    expect(wrapper.vm.products[2].priceRange.selling.low).toBe(12);
  });

  it('should toggle displayCart', () => {
    wrapper.vm.toggleCart();
    expect(wrapper.vm.displayCart).toBeTruthy();

    wrapper.vm.toggleCart();
    expect(wrapper.vm.displayCart).toBeFalsy();
  });

  it('should add items to the cart', () => {
    const cartItems = { "id": "belgian-linen-embroidery-duvet-cover-shams-white-flax-b3025", "name": "Belgian Linen Ladder Stripe Embroidery Duvet Cover &amp; Shams - White/Flax", "price": 35.2, "thumb": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/202003/0005/belgian-linen-ladder-stripe-embroidery-duvet-cover-shams-w-8-m.jpg", "height": 363 } };
    const expectedCart = [{ ...cartItems, qty: 1 }];
    wrapper.vm.addToCart(cartItems);
    expect(wrapper.vm.cart).toEqual(expectedCart);
  });

  it('should increase the total price of the cart', () => {
    const cartItems = { "id": "belgian-linen-embroidery-duvet-cover-shams-white-flax-b3025", "name": "Belgian Linen Ladder Stripe Embroidery Duvet Cover &amp; Shams - White/Flax", "price": 35, "thumb": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/202003/0005/belgian-linen-ladder-stripe-embroidery-duvet-cover-shams-w-8-m.jpg", "height": 363 } };
    wrapper.vm.addToCart(cartItems);
    expect(wrapper.vm.totalPrice).toBe(35);

    wrapper.vm.addToCart(cartItems);
    expect(wrapper.vm.totalPrice).toBe(70);
  });

  it('should increase the qty if product exists in cart', () => {
    const cartItems = { "id": "belgian-linen-embroidery-duvet-cover-shams-white-flax-b3025", "name": "Belgian Linen Ladder Stripe Embroidery Duvet Cover &amp; Shams - White/Flax", "price": 35 };
    wrapper.vm.addToCart(cartItems);
    wrapper.vm.addToCart(cartItems);
    expect(wrapper.vm.cart[0].qty).toBe(2);
    expect(wrapper.vm.cart.length).toBe(1);
  });

  it('should increase the quantity of cart item', () => {
    const product = { qty: 1, price: 10 };
    wrapper.vm.increaseQty(product);
    expect(product.qty).toBe(2);
    expect(wrapper.vm.totalPrice).toBe(10);

    wrapper.vm.increaseQty(product);
    expect(wrapper.vm.totalPrice).toBe(20);
  });

  it('should decrease the quantity of cart item', () => {
    const product = { qty: 2, price: 10 };
    wrapper.setData({
      totalPrice: 40
    });
    wrapper.vm.decreaseQty(product);
    expect(product.qty).toBe(1);
    expect(wrapper.vm.totalPrice).toBe(30);
  });

  it('should not decrease the quantity if the cart item qty is 1 instead remove the item', () => {
    const product = { qty: 1, price: 10 };
    wrapper.vm.decreaseQty(product);
    expect(wrapper.vm.cart.length).toBe(0);
  });

})