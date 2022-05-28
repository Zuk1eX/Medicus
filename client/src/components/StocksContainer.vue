<template>
    <div>
        <div class="container section-stocks">
            <div class="stocks__top">
                <p class="stocks__top-item">
                    Найдено аптек: <span class="semibold">{{ formatStocksCount }}</span>
                </p>
                <p class="stocks__top-item">// Диапазон цен: <span class="semibold">259.50 ... 840 ₽</span></p>
            </div>
            <div class="separator-bold"></div>

            <div class="section-sort" v-show="stocksCount">
                <p class="sort__title">Сортировать:</p>
                <div class="radio">
                    <input class="custom-radio" type="radio" id="sort-location" name="sort" value="location" />
                    <label for="sort-location">Сначала ближайшие</label>
                </div>
                <div class="radio">
                    <input class="custom-radio" type="radio" id="sort-minPrice" name="sort" value="price-min" />
                    <label for="sort-minPrice">Сначала дешевые</label>
                </div>
                <div class="radio">
                    <input class="custom-radio" type="radio" id="sort-maxPrice" name="sort" value="price-max" />
                    <label for="sort-maxPrice">Сначала дорогие</label>
                </div>
            </div>

            <div class="section-filters" v-show="stocksCount">
                <p class="filters__title">Фильтровать:</p>
            </div>
        </div>
        <div class="container section-stock-cards" v-show="stocksCount">
            <stock-card v-for="stock in stocksData.stocks" :key="stock['_id']" :stock-data="stock"></stock-card>
        </div>
        <div class="section-empty" v-show="!stocksCount">Для данного товара предложения отсутствуют</div>
    </div>
</template>
<script>
// import { favouritePharmacyMixin } from "@/mixins/generalMixin";
import { mapActions, mapGetters, mapMutations } from "vuex";
import StockCard from "./StockCard.vue";
export default {
    components: { StockCard },
    name: "StocksContainer",
    props: {
        // productId: {
        //     type: String || [String],
        // },
        stocksData: {
            type: Object,
        },
    },
    // mixins: [favouritePharmacyMixin],
    methods: {
        // ...mapActions(["addFavouriteProduct", "removeFavouriteProduct"]),
    },
    computed: {
        // ...mapGetters(["favouriteProducts", "checkFavouriteProduct"]),
        // pharmacyFavouriteIcon() {
        //     if (this.favourite) {
        //         return require("@/assets/icons/favourite-productpage--active.svg");
        //     }
        //     return require("@/assets/icons/favourite-productpage.svg");
        // },
        formatStocksCount() {
            return new Intl.NumberFormat("ru-RU").format(this.stocksCount);
        },
        // formatPrice() {
        //     return new Intl.NumberFormat("ru-RU", {
        //         style: "currency",
        //         currency: "RUB",
        //         minimumFractionDigits: 2,
        //     })
        //         .format(this.productData.minPrice)
        //         .replace(",", ".");
        // },
        // formatPhone() {
        //     return this.phone.replace(/(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 ($2) $3 $4 $5");
        // },
        // formatMetro() {
        //     return this.metro.join(", ");
        // },
        stocksCount() {
            return this.stocksData.total.stocksCount;
        },
    },
};
</script>
<style lang="css" scoped>
.section-stocks {
    margin-bottom: 30px;
}

.stocks__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.stocks__top-item {
    font-size: 18px;
}

.separator {
    width: 100%;
    height: 2px;
    background-color: #5680e9;
    border-radius: 1px;
}

.section-stock-cards {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-bottom: 60px;
}

/* fdasjokgmnlekampvlaeqlrvkjpakewolvp;aerjovkpaerjovckaspvhjpawkpvj;akswvojas'[vkoa[vkjoaervl[jaeovkparhejfv,mqaoehlawkrepvhraewvkpoahejwpvlkea */

.section-sort {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;
}

.sort__title {
    font-weight: 600;
    font-size: 18px;
}

.custom-radio {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.custom-radio + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    font-size: 18px;
    padding-top: 2px;
    cursor: pointer;
}

.custom-radio + label::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #5680e9;
    border-radius: 50vmin;
    margin-right: 10px;
}

.custom-radio:not(:disabled):not(:checked) + label:hover::before {
    border-color: rgba(86, 128, 233, 0.5);
}

.custom-radio:checked + label::before {
    border-width: 6px;
}

.custom-radio:disabled + label::before {
    background-color: #e9ecef;
}

.section-filters {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
}

.filters__title {
    font-weight: 600;
    font-size: 18px;
}
</style>