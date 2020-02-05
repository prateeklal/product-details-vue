<template>
  <div>
    <app-header :name="category.name"></app-header>
    <products-list
      :products="products"
      :currency="currency"
      :totalPages="category.totalPages"
      :categoryName="category.name"
      @sortPrice="sortByPrice"
    ></products-list>
    <shopping-cart></shopping-cart>
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
        products.sort((a, b) => a.priceRange.selling.low - b.priceRange.selling.low);
        if(!sortByAsc) products.reverse();
      } catch(error) {
        console.error('Sorting failed due to ', error);
      }

      this.products = products;
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
