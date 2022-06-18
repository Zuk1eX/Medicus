<template>
    <div>
        <div class="container section-stocks">
            <div class="stocks__top">
                <p class="stocks__top-item">
                    Найдено аптек: <span class="semibold">{{ formatStocksCount }}</span>
                </p>
                <p class="stocks__top-item" v-show="stocksCount">
                    Диапазон цен:
                    <span class="semibold"
                        >{{ formatPrice(minMaxPrice(0)) }} ... {{ formatPrice(minMaxPrice(1)) }} ₽</span
                    >
                </p>
            </div>
            <div class="separator-bold"></div>

            <div class="section-sort" v-show="stocksCount || sortOptions">
                <p class="sort__title">Сортировать:</p>
                <div class="radio">
                    <input
                        class="custom-radio"
                        type="radio"
                        id="sort-location"
                        name="sort"
                        :value="{ sort: 'pharmacy.distance', direction: 'asc', coords: userCoords.join(',') }"
                        :disabled="!userCoords.length"
                        v-model="sortOptions"
                        ref="locationSort"
                    />
                    <label
                        for="sort-location"
                        :title="!userCoords.length ? 'Разрешите доступ к Вашему местоположению' : ''"
                        >Сначала ближайшие</label
                    >
                </div>
                <div class="radio">
                    <input
                        class="custom-radio"
                        type="radio"
                        id="sort-minPrice"
                        name="sort"
                        :value="{ sort: 'price', direction: 'asc' }"
                        v-model="sortOptions"
                    />
                    <label for="sort-minPrice">Сначала дешевые</label>
                </div>
                <div class="radio">
                    <input
                        class="custom-radio"
                        type="radio"
                        id="sort-maxPrice"
                        name="sort"
                        :value="{ sort: 'price', direction: 'desc' }"
                        v-model="sortOptions"
                    />
                    <label for="sort-maxPrice">Сначала дорогие</label>
                </div>
            </div>

            <div class="section-filters" v-show="stocksCount || filterOptions">
                <p class="filters__title">Фильтровать:</p>
                <div class="filters__checkboxes">
                    <div class="checkbox">
                        <input
                            class="custom-checkbox"
                            type="checkbox"
                            id="filter-247"
                            name="filter-247"
                            true-value="1"
                            false-value=""
                            v-model="filterOptions.is247"
                        />
                        <label for="filter-247">Круглосуточные</label>
                    </div>
                    <div class="checkbox">
                        <input
                            class="custom-checkbox"
                            type="checkbox"
                            id="filter-discounted"
                            name="filter-discounted"
                            true-value="1"
                            false-value=""
                            v-model="filterOptions.isDiscounted"
                        />
                        <label for="filter-discounted">Со скидкой</label>
                    </div>
                </div>

                <div class="filters__metro-pharmacy">
                    <div class="filter-metro">
                        <input
                            type="search"
                            name="metroTitle"
                            placeholder="Станции метро..."
                            v-model.trim="metro"
                            @focus="showMetroDropdown"
                            ref="metroInput"
                        />
                        <div
                            style="
                                z-index: 3;
                                visibility: hidden;
                                opacity: 0;
                                transition: all 0.1s ease;
                                position: relative;
                            "
                            ref="metroDropdown"
                            :style="{
                                visibility: metroDropdownActive ? 'visible' : 'hidden',
                                opacity: metroDropdownActive ? 1 : 0,
                                top: metroDropdownActive ? '0' : '-100%',
                            }"
                        >
                            <div class="dropdown__back" @click="hideMetroDropdown"></div>
                            <div class="filter-metro__dropdown">
                                <div class="checkbox" v-for="(metro, index) in metroList" :key="index">
                                    <input
                                        class="custom-checkbox"
                                        type="checkbox"
                                        :id="`filter-metro-${index}`"
                                        name="filter-metro"
                                        :value="metro.station"
                                        v-model="metroArray"
                                    />
                                    <label :for="`filter-metro-${index}`"
                                        ><span
                                            class="metro-color"
                                            :style="`background-color: #${metro.hex_color}`"
                                        ></span
                                        >{{ metro.station }}</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="filter-pharmacy">
                        <input
                            type="search"
                            name="pharmacyTitle"
                            placeholder="Аптечная сеть..."
                            v-model.trim="filterOptions.pharmacy"
                        />
                    </div>
                </div>
                <div class="filters__prices">
                    <div class="filter-price filter-price--min">
                        <input
                            type="number"
                            name="minPrice"
                            :placeholder="minMaxPrice(0)"
                            v-model="filterOptions.minPrice"
                            @input="setMinPrice($event)"
                        />
                    </div>
                    <div class="filter-price filter-price--max">
                        <input
                            type="number"
                            name="maxPrice"
                            :placeholder="minMaxPrice(1)"
                            v-model="filterOptions.maxPrice"
                            @input="setMaxPrice($event)"
                        />
                    </div>
                </div>
                <div class="filters__buttons">
                    <button class="filter-reset" @click="resetFilters">Сбросить</button>
                    <button class="filter-apply" @click="(currentPage = 1), getStocksData()">Показать</button>
                </div>
            </div>
        </div>
        <div class="container section-stock-cards" v-show="stocksCount">
            <stock-card v-for="stock in stocksData.stocks" :key="stock['_id']" :stock-data="stock"></stock-card>
        </div>
        <div class="loader" v-show="loadingStocksData">
            <svg width="110" height="52" viewBox="-1 0 112 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    id="loader"
                    d="M12.6853 44.7343L12.7179 44.7573L12.7515 44.779C15.6129 46.6309 18.9106 47.9782 22.4221 48.3842C29.1364 49.3214 36.1371 46.9732 40.9989 42.3L41.0115 42.2879L41.0238 42.2756C42.6483 40.6586 44.2588 39.0452 45.8665 37.4346C48.1112 35.1858 50.3506 32.9424 52.6154 30.7018L52.6277 30.6896L52.6398 30.6772C53.8399 29.4481 56.1668 29.4484 57.3117 30.6385L57.3283 30.6557L57.3453 30.6726C58.9343 32.2469 60.5083 33.8243 62.0869 35.4063C63.0769 36.3984 64.0686 37.3923 65.0671 38.3884L65.0752 38.3964C65.4814 38.7971 65.8965 39.2189 66.3231 39.6525C68.4653 41.8296 70.8984 44.3022 73.9527 45.8704C81.6177 50.1231 91.7145 49.2865 98.5539 43.7687C102.87 40.4575 106.191 35.6612 107.352 30.1974C108.971 22.8639 106.766 14.6759 101.198 9.40858C97.9214 5.79629 93.4443 3.31425 88.6221 2.49039C81.78 1.23706 74.4822 3.36845 69.3833 8.0893L69.3682 8.10327L69.3534 8.11755C66.8973 10.4872 64.465 12.9333 62.0502 15.3618C60.4881 16.9327 58.9334 18.4963 57.3844 20.0269L57.3665 20.0446L57.3491 20.0627C56.1742 21.2835 53.8217 21.2829 52.6236 20.0452L52.6076 20.0286L52.5912 20.0124C50.7941 18.2394 48.9692 16.4091 47.1374 14.5719C44.9877 12.4157 42.8284 10.25 40.6929 8.15578L40.6766 8.13972L40.6598 8.12403C35.092 2.90884 26.8419 0.91108 19.5054 2.92104C13.9546 4.3146 9.45736 8.07933 6.25948 12.3699L6.24755 12.3859L6.23595 12.4021C2.38792 17.7861 1.19006 24.8571 2.89085 31.2017C4.34855 36.8375 8.13678 41.5257 12.6853 44.7343Z"
                ></path>
                <use xlink:href="#loader"></use>
            </svg>
        </div>
        <div class="section-empty" v-show="!stocksCount && !loadingStocksData && !Object.keys(filterOptions).length">
            Для данного товара предложения отсутствуют
        </div>
        <div class="section-empty" v-show="!stocksCount && !loadingStocksData && Object.keys(filterOptions).length">
            Предложений не найдено
        </div>
        <div v-intersection="loadMoreStocksData" class="observer" v-if="stocksCount && !loadingStocksData"></div>
    </div>
</template>
<script>
import metroList from "../metro";
import VueMultiselect from "vue-multiselect";
import { mapMutations, mapActions, mapGetters } from "vuex";
import StockCard from "./StockCard.vue";
export default {
    components: { StockCard, VueMultiselect },
    props: {
        productId: {
            type: String || [String],
        },
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    data() {
        return {
            currentPage: 1,
            limit: 4,

            sortOptions: { sort: "price", direction: "asc" },
            filterOptions: {},
            metro: "",
            metroArray: [],
            metroDropdownActive: false,
            metroDropdownActiveTimer: null,
        };
    },
    methods: {
        handleScroll() {
            if (this.metroDropdownActive && !this.metroDropdownActiveTimer) {
                console.log(1);
                this.metroDropdownActiveTimer = setTimeout(() => {
                    this.metroDropdownActive = false;
                }, 500);
            }
        },
        ...mapMutations(["changeLoadingStocksData", "clearStocksData", "setUserCoords"]),
        ...mapActions(["getStocksDataAPI", "getMoreStocksDataAPI"]),
        getStocksData() {
            this.clearStocksData();
            this.changeLoadingStocksData(true);
            setTimeout(() => {
                this.getStocksDataAPI([
                    this.productId,
                    {
                        limit: this.limit,
                        page: this.currentPage,
                        ...this.sortOptions,
                        ...this.filterOptions,
                    },
                ]);
            }, 1000);
        },
        loadMoreStocksData() {
            if (this.currentPage < this.pageCount) {
                if (this.currentStocksCount === this.pageOffset) {
                    this.currentPage++;
                }
                this.changeLoadingStocksData(true);
                setTimeout(() => {
                    this.getMoreStocksDataAPI([
                        this.productId,
                        {
                            limit: this.limit,
                            page: this.currentPage,
                            ...this.sortOptions,
                            ...this.filterOptions,
                        },
                    ]);
                }, 500);
            }
        },
        formatPrice(price) {
            return new Intl.NumberFormat().format(price).replace(",", ".");
        },
        minMaxPrice(price) {
            const { minPrice, maxPrice } = this.stocksData.total;
            return price === 0 ? minPrice : maxPrice;
        },
        getUserCoords() {
            navigator.geolocation.getCurrentPosition((pos) =>
                this.setUserCoords([pos.coords.longitude, pos.coords.latitude])
            );
        },
        setMaxPrice(event) {
            if (!!event.target.value && event.target.value >= 0 && event.target.value <= 999999999) {
                this.filterOptions.maxPrice = event.target.value;
            } else {
                delete this.filterOptions.maxPrice;
            }
        },
        setMinPrice(event) {
            if (!!event.target.value && event.target.value >= 0 && event.target.value <= 999999999) {
                this.filterOptions.minPrice = event.target.value;
            } else {
                delete this.filterOptions.minPrice;
            }
        },
        resetFilters() {
            this.filterOptions = {};
            this.metroArray.length = 0;
            this.currentPage = 1;
            this.getStocksData();
        },
        showMetroDropdown() {
            this.$refs.metroDropdown.style.visibility = "visible";
            this.$refs.metroDropdown.style.opacity = 1;
            this.metroDropdownActive = true;
            this.metroDropdownActiveTimer = null;
        },
        hideMetroDropdown(event) {
            if (event.target != this.$refs.metroDropdown) {
                this.$refs.metroDropdown.style.visibility = "hidden";
                this.$refs.metroDropdown.style.opacity = 0;
            }
            this.metroDropdownActive = false;
            this.metroDropdownActiveTimer = null;
            this.$refs.metroInput.blur();
        },
    },
    computed: {
        ...mapGetters(["productData", "stocksData", "loadingStocksData", "userCoords"]),
        formatStocksCount() {
            return new Intl.NumberFormat("ru-RU").format(this.stocksCount);
        },
        stocksCount() {
            return this.stocksData.total.stocksCount;
        },
        currentStocksCount() {
            return this.stocksData.stocks.length;
        },
        pageCount() {
            return Math.ceil(this.stocksCount / this.limit);
        },
        pageOffset() {
            return this.limit * this.currentPage;
        },
        metroList() {
            return metroList.filter((item) => item.station.toLowerCase().includes(this.metro));
        },
    },
    watch: {
        $route(value) {
            if (this.$route.name === "product" && value.params.id) {
                this.currentPage = 1;
                this.getStocksData();
            }
        },
        sortOptions() {
            this.currentPage = 1;
            this.clearStocksData();
            this.getStocksData();
        },
        filterOptions() {
            this.currentPage = 1;
        },
        metroArray() {
            this.filterOptions.metro = this.metroArray.join(",");
        },
        metroDropdownActive(value) {
            if (value) {
                this.$refs.metroInput.focus();
            } else {
                this.$refs.metroInput.blur();
            }
        },
    },
    mounted() {
        if (!this.stocksCount || this.productId !== this.productData?._id) {
            this.currentPage = 1;
            this.clearStocksData();
            this.getStocksData();
        } else {
            this.currentPage = Math.ceil(this.currentStocksCount / this.limit);
        }
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
    padding-top: 4px;
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

.custom-radio:disabled + label::before,
.custom-radio:disabled + label {
    border-color: #babbbf;
    color: #babbbf;
    cursor: default;
}

.section-filters {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 10px;
}

.filters__title {
    font-weight: 600;
    font-size: 18px;
}

.filters__checkboxes {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-left: 2px;
}

.custom-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.custom-checkbox + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    font-size: 18px;
    margin-top: -2px;
    cursor: pointer;
    width: 100%;
}

.custom-checkbox + label::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #5680e9;
    border-radius: 5px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 89%;
}

.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
    border-color: rgba(86, 128, 233, 0.5);
}

.custom-checkbox:checked + label::before {
    background-color: #5680e9;
    background-image: url("@/assets/icons/check.svg");
}

.custom-checkbox:disabled + label::before {
    border-color: #babbbf;
    color: #babbbf;
    cursor: default;
}

.filters__metro-pharmacy {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: -2px;
}

.filter-metro {
    position: relative;
    width: 340px;
    height: 40px;
}

.filter-metro input::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: url("@/assets/icons/search_pharmacy--clear.svg") center no-repeat;
    cursor: pointer;
}

.filter-metro input[type="search"] {
    padding: 10px 10px 12px 45px;
    width: 100%;
    height: 100%;
    border: 2px solid #5680e9;
    border-radius: 10px;
    font-size: 18px;
    outline: none;
    z-index: 4;
    position: relative;
}

.filter-metro::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: url("@/assets/icons/search_pharmacy.svg") center no-repeat;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
}

.filter-metro__dropdown {
    position: absolute;
    height: 200px;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px rgba(86, 128, 233, 0.5);
    border-radius: 10px;
    z-index: 3;
    top: calc(100% + 9px);
    /* visibility: hidden;
    opacity: 0; */
    overflow: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: all 0.1s ease;
}

.dropdown__back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}

.metro-color {
    width: 10px;
    height: 10px;
    border-radius: 50vmin;
    margin-right: 9px;
}

.filter-metro__dropdown::-webkit-scrollbar {
    width: 14px;
}

.filter-metro__dropdown::-webkit-scrollbar-track {
    /* background-color: rgba(86, 128, 233, 0.3); */
    background-clip: content-box;
    border-right: 8px solid transparent;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-radius: 5px;
}

.filter-metro__dropdown::-webkit-scrollbar-thumb {
    background-color: #5680e9;
    /* border-radius: 5px; */
    background-clip: content-box;
    border-right: 8px solid transparent;
    border-top: 0 solid transparent;
    border-bottom: 0 solid transparent;
}

.filter-pharmacy {
    position: relative;
    width: 340px;
    height: 40px;
}

.filter-pharmacy input::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: url("@/assets/icons/search_pharmacy--clear.svg") center no-repeat;
    cursor: pointer;
}

.filter-pharmacy input {
    padding: 10px 10px 12px 45px;
    width: 100%;
    height: 100%;
    border: 2px solid #5680e9;
    border-radius: 10px;
    font-size: 18px;
    outline: none;
}

.filter-pharmacy::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: url("@/assets/icons/search_pharmacy.svg") center no-repeat;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
}

.filters__prices {
    display: flex;
    gap: 10px;
    margin-top: -2px;
}

.filter-price {
    position: relative;
    width: 140px;
    height: 40px;
}

.filter-price--min::before {
    content: "от";
}

.filter-price--max::before {
    content: "до";
}

.filter-price input {
    padding: 10px 35px 12px 45px;
    width: 100%;
    height: 100%;
    border: 2px solid #5680e9;
    border-radius: 10px;
    font-size: 18px;
    outline: none;
}

.filter-price::before {
    position: absolute;
    font-size: 18px;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
}

.filter-price::after {
    content: "₽";
    position: absolute;
    font-size: 18px;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.filters__buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: auto;
    margin-top: -2px;
}

.filter-reset,
.filter-apply {
    width: 150px;
    height: 40px;
    border: 2px solid #5680e9;
    border-radius: 10px;
    color: #5680e9;
    font-weight: 500;
    font-size: 18px;
}

.filter-apply {
    background-color: #5680e9;
    color: #ffffff;
}
</style>