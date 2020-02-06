<template>
  <div>
    <app-header :name="category.name" @toggleCart="toggleCart"></app-header>

    <products-list
      :products="products"
      :currency="currency"
      :totalPages="category.totalPages"
      :categoryName="category.name"
      @sortPrice="sortByPrice"
    ></products-list>

    <div v-show="displayCart" class="bg-overlay" @click.self="toggleCart"></div>
    <transition name="slide-cart">
      <shopping-cart
        v-show="displayCart"
        @toggleCart="toggleCart"
      ></shopping-cart>
    </transition>

    <router-view :products="products"></router-view>
  </div>
</template>

<script>
import axios from "axios";
import AppHeader from "../app-header/AppHeader.vue";
import ProductsList from "../products-list/ProductsList.vue";
import ShoppingCart from "../shopping-cart/ShoppingCart.vue";
import ProductCarousel from "../product-carousel/ProductCarousel.vue";

export default {
  data() {
    return {
      category: [],
      products: [],
      currency: "$",
      displayCart: false
    };
  },

  components: {
    ShoppingCart,
    AppHeader,
    ProductsList,
    ProductCarousel
  },

  methods: {
    fetchProducts() {
      axios
        .get("/products")
        .then(res => {
          this.category = res.data;
          this.products = res.data.groups;
        })
        .catch(reject =>
          console.error("The request has failed due to ", reject)
        );
    },

    sortByPrice(sortByAsc) {
      let products = Array.from(this.products);

      try {
        products.sort(
          (a, b) => a.priceRange.selling.low - b.priceRange.selling.low
        );
        if (!sortByAsc) products.reverse();
      } catch (error) {
        console.error("Sorting failed due to ", error);
      }

      this.products = products;
    },

    toggleCart() {
      this.displayCart = !this.displayCart;
    }
  },

  created() {
    this.fetchProducts();
  }
};
</script>

<style lang="scss">
@import "../../scss/_variables";

.product-list {
  margin-top: em(110);

  @media(max-width: 479px) {
    margin-top: em(80); 
  }
}

.bg-overlay {
  position: fixed;
  width: 100%;
  top: 0;
  height: 100vh;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
</style>
