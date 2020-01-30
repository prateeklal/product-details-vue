<template>
  <!-- <div>
    <a :href="product.links.www" target="_blank">
      <figure>
        <img :src="product.hero.href" :alt="product.hero.alt" />
        <div>
          <img
            v-for="(image, index) in product.images"
            :key="index"
            :src="image.href"
            :alt="image.alt"
            class="thumb-img"
          />
        </div>
        <figcaption v-html="product.name" :title="product.name"></figcaption>
      </figure>
    </a>
    <strong>
      {{ `${currency}${product.priceRange.selling.high}` }}
    </strong>
    <sup v-if="product.priceRange.regular">
      <s>{{ `${currency}${product.priceRange.regular.high}` }}</s>
    </sup>
  </div>-->
  <article>
    <figure>
      <img :src="product.hero.href" alt="product.hero.alt" />
      <div class="thumbnail">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image.href"
          :alt="image.alt"
        />
      </div>
    </figure>
    <div class="row">
      <div class="col-8">
        <h3 v-html="product.name"></h3>
        <p>
          <span v-if="product.priceRange.regular"
            >Before {{ `${currency}${product.priceRange.regular.high}` }}</span
          >
          <span v-else>
            Low price
            {{ `${currency}${product.priceRange.selling.low}` }}
          </span>
        </p>
      </div>
      <div class="col-4 price">
        <em>
          <span>Now Price</span>
          <strong>{{ `${currency}${product.priceRange.selling.high}` }}</strong>
        </em>
        <button>
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
      currency: "$"
    };
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
  padding: 5px 0;
  opacity: 0.2;
  transition: opacity 0.3s;
}

.thumbnail img {
  width: 34px;
  margin: 0 1px;
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

figure + div {
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
}

button:hover {
  background-color: $primary-color;
}

button:hover .icon {
  color: #fff;
}
</style>
