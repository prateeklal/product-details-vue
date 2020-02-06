<template>
  <div class="modal-container" @click.self="closeModal">
    <div :class="{ modal: true, 'modal-open': modalOpenAnimation }">
      <figure>
        <img
          loading="eager"
          :src="currentSlide.href"
          :alt="currentSlide.alt"
          :width="currentSlide.width"
          :height="currentSlide.height"
        />
      </figure>
    </div>
    <div class="chevron">
      <div
        v-if="prevSlide"
        class="prev"
        @click="
          slideCount--;
          createSlides();
        "
      >
        <img :src="prevSlide.href" :alt="prevSlide.alt" />
        <v-icon name="chevron-left"></v-icon>
      </div>
      <div
        v-if="nextSlide"
        class="next"
        @click="
          slideCount++;
          createSlides();
        "
      >
        <img :src="nextSlide.href" :alt="nextSlide.alt" />
        <v-icon name="chevron-right"></v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "images", "products"],

  data() {
    return {
      imgGroup: this.images,
      slideCount: 0,
      currentSlide: "",
      nextSlide: "",
      prevSlide: "",
      modalOpenAnimation: false
    };
  },

  watch: {
    products(products) {
      this.getProductById(products, this.id);
    }
  },

  methods: {
    closeModal() {
      this.$router.push("/");
    },

    createSlides() {
      this.nextSlide = this.getNextSlide(this.slideCount, this.imgGroup);
      this.prevSlide = this.getPrevSlide(this.slideCount, this.imgGroup);
      this.currentSlide = this.imgGroup[this.slideCount];
    },

    getNextSlide(slideCount, images) {
      const imgLength = images.length;

      if (imgLength > 0 && slideCount < imgLength) {
        return images[slideCount + 1];
      }

      return "";
    },

    getPrevSlide(slideCount, images) {
      return slideCount > 0 ? images[slideCount - 1] : "";
    },

    getProductById(products, id) {
      let product = products.filter(product => id === product.id);
      this.imgGroup = [product[0].hero, ...product[0].images];
      this.createSlides();
    }
  },

  created() {
    return this.imgGroup && this.createSlides();
  },

  mounted() {
    setTimeout(() => {
      this.modalOpenAnimation = true;
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables";

div.modal-container::before {
  content: "";
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 3;
  width: 100%;
  height: 100%;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  z-index: 5;
  flex-direction: column;
  align-items: center;
}

.modal {
  position: relative;
  z-index: 5;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  width: 95%;
  max-height: 450px;
  box-shadow: 0 0 22px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: auto;
  transition: transform 0.3s ease-in-out;
  transform: scale(0);
}

.modal-open {
  transform: scale(1);
}

h2 {
  font-size: em(16);
  font-weight: 300;
  display: none;
}

.modal img {
  width: 100%;
  height: auto;
  vertical-align: top;
}

figure {
  width: 100%;
}

.chevron {
  position: absolute;
  top: calc(50% - 20px);
  z-index: 5;
  left: 0;
  width: 100%;
}

.chevron .icon {
  width: 50px;
  color: #fff;
  stroke-width: 1px;
}

.chevron > div {
  cursor: pointer;
  position: absolute;

  > img {
    position: absolute;
    width: 80px;
    top: -(em(14));

    @media (max-width: 767px) {
      display: none;
    }
  }
}

.chevron .prev {
  left: 0;

  > img {
    right: -80px;
  }
}

.chevron .next {
  right: 0;

  > img {
    left: -80px;
  }
}
</style>
