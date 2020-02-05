<template>
  <header>
    <div>
      <h1>West Elm | {{ name }}</h1>
      <div>
        <v-icon name="shopping-cart"></v-icon>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["name"]
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

  h1 {
    font-weight: 300;
    font-size: em(24);
  }

  .icon {
    width: 35px;
    color: #fff;
  }
}
</style>
