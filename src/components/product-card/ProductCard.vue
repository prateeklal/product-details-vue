<template>
  <article>
    <figure>
      <router-link :to="paramsForCarousel">
        <img
          v-lazy="hero.href"
          loading="lazy"
          :alt="hero.alt"
          :width="hero.width"
          aria-label="Main image of the product"
        />
      </router-link>
      <div class="thumbnail" @mouseleave="resetHeroImage">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image.href"
          :alt="image.alt"
          @mouseenter="updateHeroImage(image)"
        />
      </div>
    </figure>

    <div class="row article-body">
      <div class="col-8">
        <router-link :to="paramsForCarousel">
          <h3 v-html="product.name"></h3>
        </router-link>
        <p tabindex="0">
          <span>Regular Price - {{ regularPrice | currency }}</span>
        </p>
      </div>
      <div class="col-4 price">
        <em tabindex="0">
          <span>Now Price</span>
          <strong>{{ nowPrice | currency }}</strong>
        </em>
        <button aria-label="Add to cart" @click="addToCart">
          <v-icon name="shopping-cart"></v-icon>
        </button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ["product"],

  data() {
    return {
      hero: this.product.hero
    };
  },

  methods: {
    updateHeroImage(img) {
      this.hero = img;
    },
    resetHeroImage() {
      this.hero = this.product.hero;
    },
    addToCart() {
      const cartItems = {
        id: this.product.id,
        name: this.product.name,
        price: this.nowPrice,
        thumb: this.product.thumbnail
      };

      this.$emit("addToCart", cartItems);
    }
  },

  computed: {
    nowPrice() {
      return (
        this.product.priceRange &&
        this.product.priceRange.selling &&
        this.product.priceRange.selling.low
      );
    },
    regularPrice() {
      return this.product.priceRange.regular
        ? this.product.priceRange.regular.high
        : this.product.priceRange.selling.high;
    },
    paramsForCarousel() {
      return {
        name: "product-carousel",
        params: {
          id: this.product.id,
          images: [this.hero, ...this.product.images]
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/_variables";

article {
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
}

h3 {
  font-size: em(13);
  font-weight: 500;
  line-height: em(22);
}

p {
  font-size: em(12);
  margin-top: em(15);
}

.thumbnail {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: em(5) 0;
  opacity: 0.2;
  transition: opacity 0.3s;
}

.thumbnail img {
  width: 34px;
  margin: 0 em(5);
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
}

figure {
  position: relative;
}

figure:hover .thumbnail {
  opacity: 1;
}

.article-body {
  padding: em(10) em(15) em(15);
}

em {
  font-style: normal;
  display: block;
  line-height: em(18);
}

em span {
  display: block;
  font-size: em(10);
}

em strong {
  color: #bf8b2f;
  font-size: em(17);
}

.price {
  text-align: right;
}

button {
  width: 56px;
  padding: 5px 0;
  border-radius: 5px;
  border: 1px solid $primary-color;
  margin-top: em(12);
  cursor: pointer;
  background-color: #fff;
}

button:hover {
  background-color: $primary-color;
}

button:hover .icon {
  color: #fff;
}
</style>
