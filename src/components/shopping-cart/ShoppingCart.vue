<template>
  <aside>
    I am a shopping cart!
  </aside>
</template>

<script>
export default {};
</script>

<style lang="scss">
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
  height: 100vh;
  background-color: $secondary-color;
  z-index: 4;
  width: 300px;
  padding: 15px;
}
</style>
