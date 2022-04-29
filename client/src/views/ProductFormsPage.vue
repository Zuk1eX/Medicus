<template>
  <div class="container">
    <app-header></app-header>
    <div class="">
      <div class="header">
        <h2 class="title" v-if="productTitle || products.length">
          {{ productTitle ?? getProductTitle }}
        </h2>
        <p class="quantity">Найдено {{ productsCount }} товаров</p>
      </div>
      <div class="separator"></div>
      <div class="sorter">
        <p class="sorter__title">Сортировать:</p>
        <label class="sorter__option">
          <input
            type="radio"
            name="sort"
            value="popular"
            checked
            v-model="currentSortOption"
          />
          <span class="sort-text">Сначала популярные</span>
        </label>
        <label class="sorter__option">
          <input
            type="radio"
            name="sort"
            value="minPrice"
            v-model="currentSortOption"
          />
          <span class="sort-text">Сначала дешевые</span>
        </label>
        <label class="sorter__option">
          <input
            type="radio"
            name="sort"
            value="maxPrice"
            v-model="currentSortOption"
          />
          <span class="sort-text">Сначала дорогие</span>
        </label>
      </div>
      <div class="slider">
        <div class="slider__wrapper">
          <product-card
            v-for="product in products"
            :key="product.id"
          ></product-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";
export default {
  components: { AppHeader, ProductCard },
  data() {
    return {
      productId: this.$route.params.id,
      productTitle: "",
      products: [],
      currentSortOption: "",
    };
  },
  created() {
    this.productTitle = this.$route.params.title;
    this.$watch(
      () => this.$route.params.id,
      () => {
        this.productId = this.$route.params.id;
        this.fetchProductForms(this.productId);
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchProductForms(productId, sort = "views", direction) {
      try {
        this.isLoading = true;
        this.products = [];
        const response = await axios.get(
          `http://localhost:5000/api/products/product-${productId}/forms`,
          {
            params: {
              sort,
              direction,
            },
          }
        );
        setTimeout(() => {
          this.products = response.data;
          this.isLoading = false;
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },
    sortProducts() {
      console.log(this.currentSortOption);
      switch (this.currentSortOption) {
        case "popular":
          this.fetchProductForms(this.productId, "views", "desc");
          break;
        case "minPrice":
          this.fetchProductForms(this.productId, "price", "asc");
          break;
        case "maxPrice":
          this.fetchProductForms(this.productId, "price", "desc");
          break;
      }
    },
  },
  watch: {
    currentSortOption() {
      this.sortProducts();
    },
  },
  computed: {
    getProductTitle() {
      return this.products[0]["title"];
    },
    productsCount() {
      return this.products.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.separator {
  width: 100%;
  height: 1px;
  background: #5680e9;
  border-radius: 1px;
  margin-top: 20px;
  margin-bottom: 25px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-weight: 600;
  font-size: 28px;
  // line-height: 150%;
}

.quantity {
  font-size: 18px;
}

.sorter {
  display: flex;
  align-items: center;
  gap: 30px;

  &__title {
    font-weight: 600;
    font-size: 18px;
  }
}

.sort-text {
  font-size: 18px;
}

.sorter__radios {
  display: flex;
  align-items: center;
  gap: 20px;
}

.sorter__option > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.sorter__option > span {
  display: flex;
  align-items: center;
}

.sorter__option > span::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #5680e9;
  border-radius: 50vmin;
  margin-right: 10px;
}

.sorter__option > input:not(:disabled):not(:checked) + span:hover::before {
  border-width: 4px;
}

.sorter__option > input:checked + span::before {
  border-width: 6px;
}

.slider {
  margin-top: 20px;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
  }
}
</style>
