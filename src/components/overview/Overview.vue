<template>
  <div>
    <app-header
      tabindex="0"
      :name="category.name"
      :cart="cart"
      :loading="loading"
      @toggleCart="toggleCart"
    />

    <products-list
      :products="products"
      :total-pages="category.totalPages"
      :category-name="category.name"
      :loading="loading"
      @sortPrice="sortByPrice"
      @addToCart="addToCart"
    />

    <div
      v-show="displayCart"
      class="bg-overlay"
      @click.self="toggleCart"
    />
    <transition name="slide-cart">
      <shopping-cart
        v-show="displayCart"
        :cart="cart"
        :total-price="totalPrice"
        @toggleCart="toggleCart"
        @increaseQty="increaseQty"
        @decreaseQty="decreaseQty"
      />
    </transition>

    <transition name="fade-snack">
      <snack-bar
        v-if="notifyMsg"
        :notify-msg="notifyMsg"
      />
    </transition>

    <router-view :products="products" />
  </div>
</template>

<script>
import axios from "axios";
import AppHeader from "../app-header/AppHeader.vue";
import ProductsList from "../products-list/ProductsList.vue";
import ShoppingCart from "../shopping-cart/ShoppingCart.vue";
import SnackBar from "../snackbar/SnackBar.vue";

export default {
  components: {
    ShoppingCart,
    AppHeader,
    ProductsList,
    SnackBar
  },
  data() {
    return {
      category: [],
      products: [],
      cart: [],
      totalPrice: 0,
      notifyMsg: "",
      displayCart: false,
      loading: true
    };
  },

  created() {
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      axios
        .get("/products")
        .then(res => {
          this.category = res.data;
          this.products = this.resetGroupsByPrice(res.data.groups);
          this.loading = false;
        })
        .catch(reject =>
          console.error("The request has failed due to ", reject)
        );
    },

    resetGroupsByPrice(products) {
      // Setting price property to all the products
      // as not handling product collection in this case
      return products.map(product => {
        if (product.priceRange && !product.price) {
          product.price = {
            selling: product.priceRange.selling.low,
            regular: product.priceRange.regular
              ? product.priceRange.regular.high
              : product.priceRange.selling.high
          };
        }
        return product;
      });
    },

    sortByPrice(sortByAsc) {
      let products = Array.from(this.products);

      try {
        products.sort(
          (a, b) => a.price.selling - b.price.selling
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
