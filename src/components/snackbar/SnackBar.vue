<template>
  <div :class="{ snackbar: true, 'hide-snack': !showSnack }">
    <p v-html="notifyMsg" />
  </div>
</template>

<script>
export default {
  props: ["notifyMsg"],
  data() {
    return {
      showSnack: true,
      activeTimeout: "",
      timeout: 3000
    };
  },
  watch: {
    notifyMsg() {
      this.showSnack = true;
      this.setSnackTimeout();
    }
  },
  mounted() {
    this.setSnackTimeout();
  },
  methods: {
    setSnackTimeout() {
      window.clearTimeout(this.activeTimeout);

      this.activeTimeout = window.setTimeout(() => {
        this.showSnack = false;
      }, this.timeout);
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/_variables";

.snackbar {
  position: fixed;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  bottom: 12px;
  right: 12px;
  width: 300px;
  background-color: $primary-color;
  padding: 12px 14px;
  border-radius: 4px;
  font-size: em(13);
  color: $secondary-color;
  line-height: 1.5;
  transition: transform 0.5s;

  @media (max-width: 479px) {
    right: auto;
    left: 12px;
  }

  span {
    color: $accent-color;
  }
}

.fade-snack-enter-active,
.fade-snack-leave-active {
  transition: transform 0.5s;
}
.fade-snack-enter,
.fade-snack-leave-to,
.hide-snack {
  transform: translateX(350px);

  @media (max-width: 479px) {
    transform: translateY(350px);
  }
}
</style>
