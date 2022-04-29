<template>
  <div class="container">
    <app-header></app-header>
    <div class="header">
      <h2 class="title">{{}}</h2>
      <p class="quantity">Найдено {{}} товаров</p>
    </div>
    <div class="separator"></div>
    <div class="sorter">
      <p class="sorter__title"></p>
      <label class="sorter__option">
        <input type="radio" name="sort" value="popular" />
        <span class="sort-text">Сначала популярные</span>
      </label>
      <label class="sorter__option">
        <input type="radio" name="sort" value="minPrice" />
        <span class="sort-text">Сначала дешевые</span>
      </label>
      <label class="sorter__option">
        <input type="radio" name="sort" value="maxPrice" />
        <span class="sort-text">Сначала дорогие</span>
      </label>
    </div>
    <div class="slider">
      <div class="slider__wrapper">
        <product-card></product-card>
        <product-card></product-card>
        <product-card></product-card>
        <product-card></product-card>
        <product-card></product-card>
        <product-card></product-card>
        <product-card></product-card>
        <product-card></product-card>
      </div>
    </div>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: { AppHeader, ProductCard },
  data() {
    return {
      productTitle: "",
      productId: "",
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.title {
  font-weight: 600;
  font-size: 28px;
  // line-height: 150%;
}

.slider {
  margin-top: 20px;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
