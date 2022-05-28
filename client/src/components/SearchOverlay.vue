<template>
    <div class="search-overlay" :class="{ enabled: searchOverlayActive }">
        <div class="overlay__back" @click="disable"></div>
        <div class="overlay__body" v-scroll="handleScroll">
            <div class="overlay__top" ref="overlayTop">
                <p class="overlay__title overlay__title--50">Наименование</p>
                <p class="overlay__title overlay__title--20">Предложений</p>
                <p class="overlay__title overlay__title--20">Диапазон цен</p>
                <p class="overlay__title overlay__title--10">&nbsp;</p>
            </div>
            <div class="overlay__cards" v-show="!productsEmpty && !loadingOverlay">
                <search-overlay-card
                    v-for="product in searchProductsOverlay.results"
                    :key="product['item']['_id']"
                    :product-data="product['item']"
                ></search-overlay-card>
            </div>
            <div class="overlay__cards" v-show="loadingOverlay">
                <search-overlay-card-sceleton v-for="item in 3" :key="item"></search-overlay-card-sceleton>
            </div>
            <div class="overlay__cards--empty" v-show="productsEmpty && !loadingOverlay">
                Результатов по запросу не найдено
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SearchOverlayCard from "./SearchOverlayCard.vue";
import SearchOverlayCardSceleton from "./SearchOverlayCardSceleton.vue";
export default {
    components: { SearchOverlayCard, SearchOverlayCardSceleton },
    data() {
        return {
            searchTimer: null,
        };
    },
    methods: {
        ...mapMutations([
            "searchOverlayDisable",
            "searchOverlayEnable",
            "clearSearchProductsOverlay",
            "changeLoadingOverlay",
        ]),
        ...mapActions(["getSearchProductsOverlayAPI"]),
        disable() {
            this.searchOverlayDisable();
        },
        setLoading(value) {
            this.changeLoadingOverlay(value);
        },
        getProducts() {
            this.getSearchProductsOverlayAPI({
                text: this.searchText,
                limit: 5,
            });
        },
        handleScroll(event) {
            if (event.target.scrollTop > 7) {
                this.$refs.overlayTop.style.zIndex = 1;
            } else {
                this.$refs.overlayTop.style.zIndex = 0;
            }
        },
    },
    computed: {
        ...mapGetters(["searchOverlayActive", "searchProductsOverlay", "searchText", "loadingOverlay"]),
        productsEmpty() {
            return this.searchProductsOverlay.total.resultsCount === 0;
        },
    },
    watch: {
        searchText() {
            if (this.searchText) {
                this.setLoading(true);
                this.clearSearchProductsOverlay();
                clearTimeout(this.searchTimer);
                this.searchTimer = setTimeout(() => {
                    this.getProducts();
                }, 300);
            }
        },
    },
};
</script>
<style lang="css">
.search-overlay {
    z-index: 9;
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: -35px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.1s ease;
}

.enabled {
    opacity: 1;
    visibility: visible;
}

.overlay__back {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), rgba(86, 128, 233, 0.2);
}

.overlay__body {
    position: relative;
    max-height: 371px;
    max-width: 950px;
    background-color: #ffffff;
    border-radius: 16px;
    margin: 0 auto;
    overflow-y: auto;
    padding-bottom: 20px;
}

.overlay__body::-webkit-scrollbar {
    width: 14px;
}

.overlay__body::-webkit-scrollbar-track {
    background-color: rgba(86, 128, 233, 0.3);
    background-clip: content-box;
    border-right: 8px solid transparent;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-radius: 5px;
}

.overlay__body::-webkit-scrollbar-thumb {
    background-color: #5680e9;
    border-radius: 5px;
    background-clip: content-box;
    border-right: 8px solid transparent;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
}

.overlay__top {
    padding: 25px 25px 10px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #ffffff;
}

.overlay__title {
    font-size: 16px;
    color: #6f6f6f;
    text-align: center;
}

.overlay__title--50 {
    flex: 50%;
}

.overlay__title--20 {
    flex: calc(50% / 3);
}

.overlay__title--10 {
    flex: calc(50% / 4);
}

.overlay__cards {
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 20px;
}

.overlay__cards--empty {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    padding: 20px 0 10px;
}
</style>