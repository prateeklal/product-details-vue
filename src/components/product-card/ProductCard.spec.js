import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import ProductCard from './ProductCard.vue';
const localVue = global.localVue;
const router = global.router;


describe('ProductCard', () => {
  let wrapper;
  let sandbox = sinon.createSandbox();

  beforeEach(() => {
    wrapper = shallowMount(ProductCard, {
      localVue,
      router,
      propsData: {
        product: { "id": "belgian-linen-embroidery-duvet-cover-shams-slate-white-b3024", "name": "Belgian Linen Ladder Stripe Embroidery Duvet Cover &amp; Shams - Slate/White", "links": { "www": "https://www.westelm.com/products/belgian-linen-embroidery-duvet-cover-shams-slate-white-b3024/" }, "price": { "regular": 329, "selling": 44 }, "thumbnail": { "size": "m", "meta": "", "alt": "", "rel": "thumbnail", "width": 363, "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/202003/0005/belgian-linen-ladder-stripe-embroidery-duvet-cover-shams-s-m.jpg", "height": 363 }, "hero": { "size": "m", "meta": "", "alt": "", "rel": "hero", "width": 363, "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/202003/0005/belgian-linen-ladder-stripe-embroidery-duvet-cover-shams-s-m.jpg", "height": 363 }, "images": [{ "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/202003/0005/belgian-linen-ladder-stripe-embroidery-duvet-cover-shams-6-m.jpg", "height": 363 }, { "size": "m", "meta": "", "alt": "", "rel": "althero", "width": 363, "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/202003/0012/belgian-linen-ladder-stripe-embroidery-duvet-cover-shams-m.jpg", "height": 363 }], "swatches": [], "messages": [], "flags": [{ "bopisSuppress": false, "rank": 3, "id": "newcore" }, { "bopisSuppress": false, "rank": 9, "id": "fairTrade" }], "reviews": { "recommendationCount": 0, "likelihood": 0, "reviewCount": 0, "averageRating": 0, "id": "belgian-linen-embroidery-duvet-cover-shams-slate-white-b3024", "type": "GROUP_REVIEWS" } }
      }
    });
    wrapper.setData({
      hero: { "size": "m", "meta": "", "alt": "", "rel": "hero", "width": 363, "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/202003/0005/belgian-linen-ladder-stripe-embroidery-duvet-cover-shams-s-m.jpg", "height": 363 }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should emit addtocart with correct cartitems object', () => {
    wrapper.find('button').trigger('click');
    const emittedObj = wrapper.emitted().addToCart[0][0];
    const expectedProps = ['id', 'name', 'price', 'thumb'];
    const receivedProps = Object.keys(emittedObj);
    expect(receivedProps).toEqual(expectedProps);
  });

  it('should update hero image on mouseover', () => {
    sandbox.spy(wrapper.vm, 'updateHeroImage');
    wrapper.find('.thumbnail img').trigger('mouseenter');
    expect(wrapper.vm.updateHeroImage.calledOnce).toBeTruthy();
    expect(wrapper.vm.$data.hero.href).toEqual(wrapper.vm.updateHeroImage.getCall(0).args[0].href)
  });

  it('should update hero image on mouseleave', () => {
    wrapper.vm.resetHeroImage();
    expect(wrapper.vm.$data.hero.href).toEqual(wrapper.vm.product.hero.href);
  });
});