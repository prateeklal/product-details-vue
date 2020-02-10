<template>
  <div>
    <app-header
      tabindex="0"
      :name="category.name"
      :cart="cart"
      @toggleCart="toggleCart"
      :loading="loading"
    ></app-header>

    <products-list
      :products="products"
      :totalPages="category.totalPages"
      :categoryName="category.name"
      @sortPrice="sortByPrice"
      @addToCart="addToCart"
      :loading="loading"
    ></products-list>

    <div v-show="displayCart" class="bg-overlay" @click.self="toggleCart"></div>
    <transition name="slide-cart">
      <shopping-cart
        v-show="displayCart"
        @toggleCart="toggleCart"
        :cart="cart"
        :totalPrice="totalPrice"
        @increaseQty="increaseQty"
        @decreaseQty="decreaseQty"
      ></shopping-cart>
    </transition>

    <transition name="fade-snack">
      <snack-bar v-if="notifyMsg" :notifyMsg="notifyMsg"> </snack-bar>
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
import SnackBar from "../snackbar/SnackBar.vue";

export default {
  data() {
    return {
      category: [],
      products: [],
      cart: [],
      totalPrice: 0,
      notifyMsg: "",
      displayCart: false,
      loading: false
    };
  },

  components: {
    ShoppingCart,
    AppHeader,
    ProductsList,
    ProductCarousel,
    SnackBar
  },

  methods: {
    fetchProducts() {
      this.loading = true;
      axios
        .get("/products")
        .then(res => {
          this.category = res.data;
          this.products = res.data.groups;
          this.loading = false;
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
        if (!sortByAsc) {
          products.reverse();
        }
      } catch (error) {
        console.error("Sorting failed due to ", error);
      }

      this.products = products;
    },

    toggleCart() {
      this.displayCart = !this.displayCart;
    },

    addToCart(cartItems) {
      const { id, price } = cartItems;
      this.totalPrice += price;

      // this.increaseQty();
      for (let product of this.cart) {
        if (product.id === id) {
          product.qty++;
          this.notifyMsg = `Quantity updated for - <span>${product.name}</span> x ${product.qty}.`;
          return;
        }
      }

      this.cart.push({
        ...cartItems,
        qty: 1
      });
      this.notifyMsg = `Product added to the cart - <span>${cartItems.name}</span>.`;
    },

    increaseQty(product) {
      product.qty++;
      this.totalPrice += product.price;
    },

    decreaseQty(product) {
      product.qty--;
      this.totalPrice -= product.price;

      if (product.qty <= 0) {
        let productPosition = this.cart.indexOf(product);
        this.cart.splice(productPosition, 1);
      }
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

  @media (max-width: 479px) {
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
