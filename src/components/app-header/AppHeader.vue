<template>
  <header :class="{ progress: loading }">
    <div>
      <h1 tabindex="0">
        <span>West Elm</span> | <span>{{ name }}</span>
      </h1>
      <button class="cart" @click="displayCart" aria-label="View Shopping Cart">
        <span v-if="cart.length" class="cart-item">{{ totalItems }}</span>
        <v-icon name="shopping-cart"></v-icon>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: ["name", "loading", "cart"],
  methods: {
    displayCart() {
      this.$emit("toggleCart");
    }
  },
  computed: {
    totalItems() {
      return this.cart.reduce((accumulator, product) => {
        return accumulator + product.qty;
      }, 0);
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/_variables";

header {
  background-color: #273540;
  color: #fff;
  position: fixed;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;

  @keyframes rotateText {
    from {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(180deg);
    }
    to {
      transform: rotateX(0deg);
    }
  }

  @keyframes slideText {
    from {
      transform: translateX(0);
    }
    50% {
      transform: translateX(10px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes progressBar {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }

  @keyframes hideProgressBar {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes bounceCartCount {
    from {
      transform: translateY(-30px);
    }
    80% {
      transform: translateY(5px);
    }
    to {
      transform: translateY(0);
    }
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1180px;
    margin: auto;
    padding: em(15);
    max-width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 3px;
    width: 100%;
    opacity: 0;
    background-color: $accent-color;
    transition: opacity 0.3s;
    transition-delay: 0.4s;
    transform-origin: left;
    animation-name: progressBar;
    animation-duration: 10s;
    animation-timing-function: step-start;
    animation-iteration-count: infinite;
  }

  &.progress::after {
    animation-timing-function: linear;
    opacity: 1;
  }

  h1 {
    font-weight: 300;
    font-size: em(24);

    @media (max-width: 479px) {
      font-size: em(20);
    }

    span:first-of-type {
      animation-name: rotateText;
      animation-duration: 1s;
      animation-delay: 3000ms;
    }

    span:nth-of-type(2) {
      animation-name: slideText;
      animation-duration: 1s;
      animation-delay: 4000ms;
    }

    span {
      display: inline-block;
      margin-left: 5px;
    }
  }

  .icon {
    width: 35px;
    color: #fff;

    @media (max-width: 479px) {
      width: 30px;
    }
  }

  .cart {
    cursor: pointer;
    background-color: transparent;
    border: none;
    position: relative;
  }

  .cart-item {
    position: absolute;
    min-width: 17px;
    height: 17px;
    border-radius: 12px;
    top: -7px;
    background-color: #fff;
    right: -3px;
    text-align: center;
    border: 1px solid #273540;
    padding: 0 em(3);
    font-size: em(13);
    line-height: 15px;
    font-weight: bold;
    z-index: 5;
    animation-name: bounceCartCount;
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(1, 0, 0, 1);
  }
}
</style>
