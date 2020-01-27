<template>
  <div>
    <h1>{{ products.name }}</h1>
    <div class="row">
      <div class="column" v-for="item in products.groups" :key="item.id">
        <figure>
          <a :href="item.links.www" target="_blank">
            <img :src="item.hero.href" :alt="item.hero.alt" />
            <figcaption v-html="item.name" :title="item.name"></figcaption>
          </a>
        </figure>
        <strong>
          {{ `${currency}${item.priceRange.selling.high}` }}
        </strong>
        <sup><s>{{`${currency}${item.priceRange.regular.high}`}}</s></sup>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      currency: "$"
    };
  },
  methods: {
    fetchProducts() {
      axios
        .get("/products")
        .then(res => {
          this.products = res.data;
        })
        .catch(reject =>
          console.error("The request has failed due to ", reject)
        );
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style lang="scss" scoped>
.row {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .column {
    width: 33.33%;
    padding: 15px 10px;
    box-sizing: border-box;

    img {
      max-width: 100%;
    }

    figcaption {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 96%;
      white-space: nowrap;
    }
  }
}
</style>
