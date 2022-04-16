<template>
  <div
    class="overlay"
    :style="{ visibility: overlayVisibility, opacity: overlayOpacity }"
    @click.stop="this.$emit('hide', $event)"
  >
    <div class="overlay__container" tabindex="0">
      <div class="overlay__suggests">
        <button class="suggests__btn">Отривин</button>
        <button class="suggests__btn">Отривин экспресс</button>
      </div>
      <div class="overlay__results">
        <div class="results__head">
          <p class="head__title head__title--name">Наименование</p>
          <p class="head__title head__title--offers">Предложений</p>
          <p class="head__title head__title--prices-range">Диапазон цен</p>
          <p class="head__title head__title--open">Открыть</p>
        </div>
        <div class="results__items">
          <overlay-product-card-sceleton></overlay-product-card-sceleton>
          <overlay-product-card
            v-for="product in 5"
            :key="product"
          ></overlay-product-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import OverlayProductCard from "./UI/OverlayProductCard.vue";
import OverlayProductCardSceleton from "./UI/OverlayProductCardSceleton.vue";
export default {
  components: { OverlayProductCard, OverlayProductCardSceleton },
  props: {
    active: {
      type: Boolean,
    },
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      products: [],
    };
  },
  methods: {
    async fetchSearchResults() {
      this.loading = true;
      //   const results = await axios.get("localhost:5000/search", {
      //     params: {
      //       text: this.searchText,
      //       limit: 5,
      //     },
      //   });
      this.products = results;
    },
  },
  computed: {
    overlayVisibility() {
      return this.active ? "visible" : "hidden";
    },
    overlayOpacity() {
      return this.active ? 1 : 0;
    },
  },
};
</script>
<style lang="scss">
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  visibility: hidden;
  transition: visibility 0.1s ease-in-out, opacity 0.1s ease-in-out;

  // &--show {
  //   visibility: visible;
  //   transition: all 1s ease-in-out;
  //   opacity: 1;
  // }

  &__container {
    background: #ffffff;
    border-radius: 16px;
    max-width: 950px;
    max-height: 416px;
    margin: 0 auto;
    margin-top: 150px;
    z-index: 13;
    max-height: 420px;
    padding: 20px;
    padding-right: 9px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 11px;
    }

    &::-webkit-scrollbar-track {
      // background-color: rgba(86, 128, 233, 0.3);
      border-top-width: 50px;
      border-bottom-width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #5680e9;
      border-top-width: 10px;
      border-bottom-width: 10px;
      border-radius: 1px;
      background-clip: content-box;
      border-right: 6px solid transparent;
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
    }
  }

  &__suggests {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    padding-bottom: 10px;
  }

  &__results {
  }
}
.suggests__btn {
  background: rgba(86, 128, 233, 0.3);
  border-radius: 16px;
  padding: 8px 15px;
  font-weight: 300;
  font-size: 16px;
}

.results {
  &__head {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__items {
    display: flex;
    flex-direction: column;
  }
}

.head {
  &__title {
    text-align: center;
  }

  &__title--name {
    flex: 50%;
  }

  &__title--offers {
    flex: calc(50% / 3);
  }

  &__title--prices-range {
    flex: calc(50% / 3);
  }

  &__title--open {
    flex: calc(50% / 5);
    visibility: hidden;
  }
}
</style>