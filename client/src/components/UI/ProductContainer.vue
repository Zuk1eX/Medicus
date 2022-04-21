<template>
  <div class="product-section" v-show="product.hasOwnProperty('title')">
    <h2 class="product__title">
      {{ fullTitle }}
    </h2>
    <div class="product-overview">
      <img :src="product['imageUrl']" class="product__img" />
      <div class="product-right">
        <div class="product-description">
          <p class="product__prop">
            Действующее вещество (МНН):
            <span class="bold" v-show="product['inn']">{{
              product["inn"]
            }}</span>
            <span class="bold" v-show="!product['inn']">—</span>
          </p>
          <p class="product__prop">
            Фармакологическая группа:
            <span class="bold">{{ product["pharmgroup"] }}</span>
          </p>
          <p class="product__prop">
            Производитель:
            <span class="bold" v-if="product['vendor']">
              {{ product["vendor"].title }},
              {{ product["vendor"].country }}
            </span>
          </p>
        </div>
        <div class="product-btns">
          <button class="product__favourite"></button>
          <router-link to="/" class="product__link"
            >Все формы выпуска</router-link
          >
          <router-link to="/" class="product__link">Аналоги</router-link>
          <router-link to="/" class="product__link">Синонимы</router-link>
        </div>
      </div>
    </div>
  </div>
  <product-container-sceleton v-show="isLoading"></product-container-sceleton>
</template>
<script>
import axios from "axios";
import ProductContainerSceleton from './ProductContainerSceleton.vue';
export default {
  components: { ProductContainerSceleton },
  name: "ProductContainer",
  props: ["productId"],
  data() {
    return {
      product: {},
      isLoading: false,
    };
  },
  created() {
    this.$watch(
      () => this.productId,
      () => {
        this.fetchProduct(this.productId);
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchProduct(productId) {
      try {
        this.isLoading = true;
        this.product = {};
        const response = await axios.get(
          `http://localhost:5000/api/products/product-${productId}`
        );
        setTimeout(() => {
          this.product = response.data;
          this.isLoading = false;
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    fullTitle() {
      return `${this.product.title}, ${this.product.form}, ${this.product.dosage}, ${this.product.quantity}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.bold {
  color: #000000;
}

.product {
  &__title {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 30px;
  }

  &__img {
    width: 233px;
    height: 233px;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 10px;
  }

  &__prop {
    font-size: 18px;
    color: #828282;
  }

  &__favourite {
    width: 37px;
    height: 36px;
    border: 2px solid #5680e9;
    border-radius: 50vmin;
    background: url("@/assets/img/favourite_icon.svg") center no-repeat;
    margin-right: 15px;
    transition: all 0.2s ease-in-out;
  }

  &__link {
    border: 2px solid #5680e9;
    border-radius: 50vmin;
    padding: 8px 30px;
    color: #5680e9;
    font-weight: 600;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #5680e9;
      color: #ffffff;
    }
  }
}

.product-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-overview {
  display: flex;
  gap: 90px;
  margin-bottom: 60px;
}

.product-description {
  display: flex;
  flex-direction: column;
  gap: 10px;
  line-height: 150%;
}

.product-btns {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>