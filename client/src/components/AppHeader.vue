<template>
  <!-- <header class="header"> -->
  <div class="header__wrapper">
    <a class="logo" href="#">
      <img alt="medicus logo" :src="require('@/assets/img/logo.svg')" />
    </a>
    <div class="search">
      <button class="search__alphabet">А-Я</button>
      <div class="search__box">
        <form class="search__form" @submit.prevent="openResultsPage">
          <img
            alt="search icon"
            class="search__icon"
            :src="require('@/assets/img/search_icon.svg')"
          />
          <keep-alive>
            <input
              class="search__input"
              placeholder="Начните вводить наименование или штрих-код лекарства..."
              type="search"
              name="search-text"
              v-model="searchText"
              @focus="showOverlay"
              @blur.stop="hideOverlay($event)"
            />
          </keep-alive>
          <button class="search__btn" type="submit">Найти</button>
        </form>
      </div>
      <search-overlay
        :active="overlayActive"
        @hide="hideOverlay($event)"
      ></search-overlay>
      <div class="search__recent">
        <button class="recent__btn">Отривин</button>
        <button class="recent__btn">Оциллококцинум</button>
        <button class="recent__btn">Отривин</button>
      </div>
    </div>
    <button class="favourite-btn">
      <img
        :src="require('@/assets/img/favourite.svg')"
        alt=""
        class="favourite-btn__icon"
      />
    </button>
    <button class="account-btn">
      <img
        :src="require('@/assets/img/account.svg')"
        alt=""
        class="account-btn__icon"
      />
    </button>
  </div>
  <!-- </header> -->
</template>

<script>
import SearchOverlay from "./SearchOverlay.vue";
import { provide, ref } from "vue";
export default {
  components: { SearchOverlay },
  name: "HeaderView",
  setup() {
    const searchText = ref("");
    provide("searchText", searchText);
    return {
      searchText,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      overlayActive: false,
    };
  },
  methods: {
    // handleScroll(event) {
    //   if (
    //     document.body.scrollTop > 50 ||
    //     document.documentElement.scrollTop > 50
    //   ) {
    //     document.querySelector(".header__wrapper").classList.add("sticky");
    //   } else {
    //     document.getElementById(".header__wrapper").classList.remove("sticky");
    //   }
    // },
    openResultsPage() {},
    hideOverlay(event) {
      if (
        event.relatedTarget === null &&
        event.target.classList.contains("overlay")
      ) {
        this.overlayActive = false;
      }
    },
    showOverlay() {
      if (this.searchText) {
        this.overlayActive = true;
      } else {
        this.overlayActive = false;
      }
    },
  },
  watch: {
    searchText(value) {
      if (value) {
        this.overlayActive = true;
      } else {
        this.overlayActive = false;
      }
    },
    // overlayActive(value) {
    //   if (value) {
    //     // document.body.style.overflow = "hidden";
    //     console.log(1);
    //   } else {
    //     // document.body.style.overflow = "auto";
    //     console.log(2);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.header {
  // width: 100%;

  &__wrapper {
    // z-index: 1;
    // min-height: 215px;
    padding: 30px 0 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
  }
}

.search {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  // flex: 1;

  &__box {
    z-index: 13;
  }

  &__alphabet {
    font-weight: 600;
    font-size: 18px;
    color: #5680e9;
    margin: 0 auto 30px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      margin-top: 20px;
      width: 100%;
      height: 100%;
      background: url("@/assets/img/arrow.svg") center no-repeat;
    }
  }

  &__form {
    position: relative;
    margin-bottom: 15px;
  }

  &__icon {
    position: absolute;
    top: 13px;
    left: 20px;
  }

  &__input {
    max-width: 950px;
    width: 100vw;
    height: 56px;
    background: #ffffff;
    border: 4px solid #5680e9;
    box-sizing: border-box;
    border-radius: 28px;
    padding: 0 146px 0 56px;
    font-weight: 600;
    font-size: 20px;

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: url("@/assets/img/cancel.svg") center no-repeat;
      background-size: contain;
      cursor: pointer;
      margin-left: 10px;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-family: "Mont";
      font-weight: 600;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  &__btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 142px;
    height: 56px;
    background: #5680e9;
    border-radius: 28px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
  }

  &__recent {
    display: flex;
    gap: 10px;
    max-width: 950px;
  }
}

.recent__btn {
  background: rgba(86, 128, 233, 0.3);
  border-radius: 16px;
  padding: 8px 15px;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
}

.favourite-btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #5680e9;

  &__icon {
    margin-top: 4px;
    display: inline-block;
    text-align: center;
  }
}

.account-btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #5680e9;

  &__icon {
    display: inline-block;
    text-align: center;
  }
}
</style>