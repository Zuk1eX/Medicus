<template>
  <div class="container">
    <app-header></app-header>
    <product-container :product-id="productId"></product-container>
    <pharmacy-container :product-id="productId"></pharmacy-container>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import ProductContainer from "@/components/UI/ProductContainer.vue";
import PharmacyContainer from "@/components/PharmacyContainer.vue";
export default {
  components: { AppHeader, PharmacyContainer, ProductContainer },
  data() {
    return {
      productId: this.$route.params.id,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params.id,
      () => {
        this.productId = this.$route.params.id;
      },
      { immediate: true }
    );
  },
};
</script>
<style lang="scss" scoped>
</style>