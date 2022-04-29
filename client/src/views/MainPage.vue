<template>
  <div class="container">
    <app-header></app-header>
    <section class="popular">
      <h2 class="title">Популярное на сервисе</h2>
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
    </section>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: { AppHeader, ProductCard },
  methods: {
    // hideOverlay(event) {
    //   if (event.target.classList.contains('overlay__container')) {
    //     this.$
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.popular {
  // margin-top: 20px;
}

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
