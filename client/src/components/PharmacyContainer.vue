<template>
  <div class="pharmacies-section">
    <p class="pharmacies__text">
      Найдено аптек: <span class="bold">{{ stocks.length }}</span>
    </p>
    <div class="separator"></div>
    <div class="pharmacies-container" v-show="stocks.length">
      <pharmacy-card
        v-for="stock in stocks"
        :key="stock.id"
        :title="stock.pharmacy.title"
        :region="stock.pharmacy.region"
        :address="stock.pharmacy.address"
        :metro="stock.pharmacy.metro"
        :is-all-day="isAllDay(stock.pharmacy.workingHours)"
        :phone="stock.pharmacy.phone"
        :site="stock.pharmacy.site"
        :price="stock.price"
        :is-discounted="stock.isDiscounted"
      ></pharmacy-card>
    </div>
    <div v-show="!stocks.length && !isLoading" class="empty-results">
      Для данного товара предложения отсутствуют
    </div>
    <div class="pharmacies-container" v-show="isLoading">
      <pharmacy-card-sceleton
        v-for="item in 3"
        :key="item"
      ></pharmacy-card-sceleton>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import PharmacyCard from "./UI/PharmacyCard.vue";
import PharmacyCardSceleton from "./UI/PharmacyCardSceleton.vue";
export default {
  components: { PharmacyCard, PharmacyCardSceleton },
  props: ["productId"],
  data() {
    return {
      stocks: [],
      isLoading: false,
    };
  },
  created() {
    this.$watch(
      () => this.productId,
      () => {
        this.fetchStocks(this.productId);
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchStocks(productId) {
      try {
        this.isLoading = true;
        this.stocks.length = 0;
        const response = await axios.get("http://localhost:5000/api/stocks", {
          params: {
            productId: productId,
          },
        });
        setTimeout(() => {
          this.stocks = response.data;
          this.isLoading = false;
        }, 2000);
      } catch (e) {
        console.log(e);
      }
    },
    isAllDay({ 1: monday }) {
      if (monday.open === monday.close) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.pharmacies-section {
  margin-bottom: 50px;
}

.pharmacies-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pharmacies {
  &__text {
    font-size: 20px;
    margin-bottom: 20px;
  }
}

.separator {
  height: 2px;
  background: #5680e9;
  border-radius: 50vmin;
  margin-bottom: 30px;
}

.empty-results {
}
</style>