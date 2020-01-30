<template>
  <div>
    <app-header :name="products.name"></app-header>
    <div class="row product-list">
      <div class="column col-4" v-for="item in products.groups" :key="item.id">
        <product-card :product="item"></product-card>
      </div>
    </div>
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "../product-card/ProductCard.vue";
import AppHeader from "../app-header/AppHeader.vue";
import ShoppingCart from "../shopping-cart/ShoppingCart.vue";

export default {
  data() {
    return {
      products: []
    };
  },
  components: {
    ProductCard,
    ShoppingCart,
    AppHeader
  },
  methods: {
    fetchProducts() {
      axios
        .get("/products")
        .then(res => {
          this.products = res.data;
        })
        .catch(reject =>
          console.error("The request has failed due to ", reject)
        );
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style lang="scss">
.product-list {
  margin-top: 110px;
}
</style>
