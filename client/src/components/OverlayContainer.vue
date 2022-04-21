<template>
  <div v-show="products.length">
    <overlay-product-card
      v-for="product in products"
      :key="product.id"
      :product-id="product.id"
      :title="product.title"
      :descr="product.description"
      :offers="product.allPharmaciesCount"
      :min-price="product.minPrice"
      :max-price="product.maxPrice"
      :image-url="product.imageUrl"
    ></overlay-product-card>
  </div>
  <div v-show="!products.length && !isLoading" class="empty-results">
    Результатов по запросу не найдено
  </div>
  <div v-show="isLoading">
    <overlay-product-card-sceleton
      v-for="item in 3"
      :key="item"
    ></overlay-product-card-sceleton>
  </div>
</template>
<script>
import axios from "axios";
import { inject } from "@vue/runtime-core";
import OverlayProductCard from "./UI/OverlayProductCard.vue";
import OverlayProductCardSceleton from "./UI/OverlayProductCardSceleton.vue";

export default {
  components: { OverlayProductCard, OverlayProductCardSceleton },
  name: "OverlayContainer",
  setup() {
    const searchText = inject("searchText");
    return {
      searchText,
    };
  },
  data() {
    return {
      searchTimer: null,
      isLoading: true,
      products: [],
    };
  },
  methods: {
    async fetchSearchResults(searchText) {
      return axios.get("http://localhost:5000/api/search", {
        params: {
          text: searchText,
          limit: 5,
        },
      });
    },
  },
  watch: {
    searchText(value) {
      if (value.length) {
        this.products.length = 0;
        this.isLoading = true;
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(async () => {
          this.products = await this.fetchSearchResults(value).then(
            (response) => response.data
          );
          this.isLoading = false;
        }, 500);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.empty-results {
  display: flex;
  padding: 20px;
  border-radius: 16px;
  transition: 0.2s ease-in-out;
  font-weight: 600;
  font-size: 18px;
  justify-content: center;
  padding-top: 30px;
}
</style>