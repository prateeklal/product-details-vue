<template>
  <header>
    <div>
      <h1>
        <span>West Elm</span> | <span>{{ name }}</span>
      </h1>
      <div class="cart" @click="displayCart">
        <v-icon name="shopping-cart"></v-icon>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["name"],
  methods: {
    displayCart() {
      this.$emit('toggleCart');
    }
  },
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

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1180px;
    margin: auto;
    padding: em(15);
    max-width: 100%;
  }

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

  h1 {
    font-weight: 300;
    font-size: em(24);

    @media(max-width: 479px) {
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

    @media(max-width: 479px) {
      width: 30px;
    }
  }

  .cart {
    cursor: pointer;
  }
}
</style>
