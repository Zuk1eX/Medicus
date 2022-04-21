<template>
  <router-link class="results-item" :to="productUrl">
    <div class="results-item__left">
      <img :src="imageUrl" alt="" class="results-item__img" />
      <div class="results-item__text">
        <h3 class="results-item__title">{{ title }}</h3>
        <p class="results-item__description">
          {{ descr }}
        </p>
      </div>
    </div>
    <p class="results-item__offers" v-if="offers">{{ offers }}</p>
    <p class="results-item__offers" v-else>Нет в наличии</p>
    <p class="results-item__prices-range" v-if="minPrice">
      {{ minPrice }} ... {{ maxPrice }}
    </p>
    <p class="results-item__prices-range" v-else>—</p>
    <a class="results-item__btn"></a>
  </router-link>
</template>
<script>
export default {
  name: "OverlayProductCard",
  props: {
    productId: {
      type: String,
    },
    title: {
      type: String,
    },
    descr: {
      type: String,
    },
    offers: {
      type: Number,
    },
    minPrice: {
      type: Number,
    },
    maxPrice: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },
  computed: {
    productUrl() {
      return `/products/product-${this.productId}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.results-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-radius: 16px;
  transition: 0.2s ease-in-out;

  &__left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    flex: 50%;
  }

  &__img {
    width: 80px;
    height: 80px;
    background-size: contain;
    border-radius: 10px;
  }

  &__text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
  }

  &__description {
    color: rgba(0, 0, 0, 0.7);
  }

  &__offers {
    text-align: center;
    font-weight: 600;

    flex: calc(50% / 3);
  }

  &__prices-range {
    text-align: center;
    font-weight: 600;
    flex: calc(50% / 3);
  }

  &__btn {
    width: 15px;
    height: 28px;
    background-image: url("@/assets/img/arrow_mini.svg");
    background-position: center;
    background-repeat: no-repeat;
    flex: calc(50% / 5);
  }

  &:hover {
    background-color: rgba(86, 128, 233, 0.3);
  }
}
</style>