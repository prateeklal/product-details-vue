<template>
  <aside>
    <h2>Shopping Cart</h2>
    <div v-if="!cart.length" class="empty-cart">
      No items in the cart.
    </div>

    <ul>
      <li v-for="product in cart" :key="product.id" class="cart-item">
        <figure class="col-3">
          <img :src="product.thumb.href" :alt="product.thumb.alt" />
        </figure>
        <div class="col-9">
          <div class="item-title" v-html="product.name"></div>
          <span class="item-qty">
            {{ product.price | currency }} x {{ product.qty }}
          </span>
          <button class="btn" @click="inc(product)">
            <v-icon name="plus"></v-icon>
          </button>
          <button class="btn" @click="dec(product)">
            <v-icon name="minus"></v-icon>
          </button>
        </div>
      </li>
    </ul>

    <div v-if="cart.length" class="cart-total">
      Total: {{ totalPrice | currency }}
    </div>
  </aside>
</template>

<script>
export default {
  props: ["cart", "totalPrice"],
  methods: {
    inc(product) {
      this.$emit("increaseQty", product);
    },

    dec(product) {
      this.$emit("decreaseQty", product);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables";

.slide-cart-enter-active,
.slide-cart-leave-active {
  transition: transform 0.2s ease;
}

.slide-cart-enter,
.slide-cart-leave-to {
  transform: translateX(100%);
  transition: transform 150ms ease-in 0;
}
aside {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  height: 100vh;
  background-color: #dfe7ed;
  z-index: 4;
  width: 300px;
  flex-direction: column;
}
h2 {
  background-color: #fff;
  padding: em(20) em(20);
  font-size: em(20);
  font-weight: 500;
  width: 100%;
  top: 0;
}

ul {
  padding: em(15) em(20);
  list-style: none;
  flex-grow: 1;
  overflow: auto;
  line-height: 1.4;
}

.cart-item {
  padding: em(15) 0;
  border-bottom: 1px solid #bdc5ca;
  display: flex;
  font-size: 13px;

  figure {
    margin-right: 8px;
    img {
      width: 100%;
    }
  }

  .item-title {
    margin-bottom: 6px;
  }

  .item-qty {
    vertical-align: middle;
    font-weight: 700;
    margin-right: 5px;
  }

  button {
    background-color: $primary-color;
    border: none;
    padding: 2px 6px;
    border-radius: 3px;
    margin: 0px 2px;
    vertical-align: middle;
    color: #fff;
    cursor: pointer;
    font-weight: 700;

    .icon {
      color: #fff;
      width: 16px;
    }
  }

  &:last-of-type {
    border: none;
  }
}

.cart-total {
  text-align: right;
  padding: em(25);
  font-size: em(14);
  font-weight: 700;
  border-top: 2px solid #bdc5ca;
}

.empty-cart {
  padding: em(25);
  font-size: em(14);
}
</style>
