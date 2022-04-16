<template>
  <overlay-product-card
    v-for="product in products"
    :key="product.id"
    :title="product.title"
    :descr="product.description"
    :offers="product.allPharmaciesCount"
    :min-price="product.minPrice"
    :max-price="product.maxPrice"
    :image-url="product.imageUrl"
  ></overlay-product-card>
</template>
<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { inject } from "@vue/runtime-core";
import OverlayProductCard from "./UI/OverlayProductCard.vue";

const fetchSearchResults = async (searchText) => {
  return axios.get("http://localhost:5000/api/search", {
    params: {
      text: searchText,
      limit: 5,
    },
  });
};

export default {
  components: { OverlayProductCard },
  name: "OverlayContainer",
  //   props: {
  //     searchText: {
  //       type: String,
  //     },
  //   },
  async setup() {
    const searchText = inject("searchText");
    const products = ref([]);
    return {
      searchText,
      products,
    };
  },
  data() {
    return {
      searchTimer: null,
    };
  },
  //   inject: ["searchText"],
  methods: {
    // async fetchSearchResults() {
    //   //   this.loading = true;
    //   return axios.get("http://localhost:5000/api/search", {
    //     params: {
    //       text: this.searchText.value,
    //       limit: 5,
    //     },
    //   });
    //   //   this.products = results;
    // },
  },
  watch: {
    searchText() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(async () => {
        this.products = await fetchSearchResults(this.searchText).then(
          (response) => response.data
        );
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>