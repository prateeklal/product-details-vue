import Overview from "./components/overview/Overview.vue";
import ShoppingCart from './components/shopping-cart/ShoppingCart.vue';
import ProductCarousel from './components/product-carousel/ProductCarousel.vue';

export default [
  {
    path: '/',
    component: Overview,
    children: [
      {
        path: '/details/:id',
        name: 'product-carousel',
        props: true,
        component: ProductCarousel
      }
    ]
  }
]