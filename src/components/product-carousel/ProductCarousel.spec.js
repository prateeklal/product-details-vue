import { shallowMount } from '@vue/test-utils';
import ProductCarousel from './ProductCarousel.vue';
import products from './__mocks__/products.json'

describe('ProductCarousel', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ProductCarousel);
    wrapper.setProps({
      images: products[0].images,
      id: products[0].id,
      products
    });
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should return false if image length is 0', () => {
    let slide = wrapper.vm.getNextSlide(0, {});
    expect(slide).toBeFalsy();
  });

  it('should return next slide if there are 2 or more images', () => {
    let { images } = products[0];
    let slide = wrapper.vm.getNextSlide(0, images);
    expect(slide.href).toBe(images[1].href);
  });

  it('should not add next slide if there are no more images', () => {
    let { images } = products[0];
    let slide = wrapper.vm.getNextSlide(1, images);
    expect(slide).toBeFalsy();
  });

  it('should return previous slide if slide count > 0', () => {
    let { images } = products[0];
    let slide = wrapper.vm.getPrevSlide(2, images);
    expect(slide.href).toBe(images[1].href);
    slide = wrapper.vm.getPrevSlide(1, images);
    expect(slide.href).toBe(images[0].href);
  });

  it('should return false if slide count === 0', () => {
    let { images } = products[0];
    let slide = wrapper.vm.getPrevSlide(0, images);
    expect(slide).toBeFalsy();
  })
});