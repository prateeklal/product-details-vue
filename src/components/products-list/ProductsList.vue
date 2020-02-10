<template>
  <main class="row product-list">
    <div class="col-12">
      <div class="row products-header">
        <p tabindex="0">
          <span v-if="!loading">
            Displaying {{ products && products.length }} products for
            <b>{{ categoryName }}</b>
          </span>
        </p>
        <button
          @click="sortPrice"
          :class="{ active: sortByAsc }"
          v-if="!loading"
        >
          Sort by price
          <v-icon name="trello"></v-icon>
        </button>
      </div>
      <transition-group name="shuffle" tag="div" class="row">
        <div
          class="column col-12 sm-col-6 md-col-4"
          v-for="item in products"
          :key="item.id"
        >
          <product-card
            :product="item"
            @addToCart="addToCart"
          ></product-card>
        </div>
      </transition-group>
    </div>
  </main>
</template>

<script>
import ProductCard from "../product-card/ProductCard.vue";

export default {
  props: ["products", "totalPages", "categoryName", "loading"],
  data() {
    return {
      sortByAsc: false
    };
  },
  components: {
    ProductCard
  },
  methods: {
    sortPrice() {
      this.sortByAsc = !this.sortByAsc;
      this.$emit("sortPrice", this.sortByAsc);
    },
    addToCart(cartItems) {
      this.$emit("addToCart", cartItems);
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/_variables";

.products-header {
  padding: em(10);
  align-items: flex-end;

  p {
    font-size: em(14);

    @media (max-width: 479px) {
      font-size: em(13);
    }
  }

  button {
    border: 2px solid $primary-color;
    padding: em(8) em(12);
    border-radius: 20px;
    font-size: em(12);
    display: flex;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    background-color: #fff;
    width: 120px;

    &:hover {
      background-color: $primary-color;
      color: #fff;

      .icon {
        color: #fff;
      }
    }

    &.active .icon {
      transform: rotate(-180deg);
    }
  }
}

.shuffle-move {
  transition: transform 0.5s;
}
</style>
