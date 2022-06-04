<template>
    <search-header></search-header>
    <div class="container section-results">
        <div class="results__top">
            <h3 class="results__title">{{ productTitle || productActionResultsProperty.title }}</h3>
            <p class="results__description" v-show="!loadingState && !pageUnloaded">
                {{ nounForm(productsCount, searchNounsForms) }}
                <span class="semibold">{{ productActionResultsData.total.resultsCount }}</span>
                {{ nounForm(productsCount, productNounsForms) }}
            </p>
        </div>
        <div class="separator-bold"></div>
        <div class="section-sort" v-show="productsCount && !loadingState">
            <p class="sort__title">Сортировать:</p>
            <div class="radio">
                <input class="custom-radio" type="radio" id="sort-location" name="sort" value="location" />
                <label for="sort-location">Сначала популярные</label>
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
    </div>
    <div class="container section-product-cards" v-show="productsCount">
        <product-card
            v-for="product in productActionResultsData.results"
            :key="product['_id']"
            :product-data="product"
            :type="'product'"
        ></product-card>
    </div>
    <div class="loader" v-show="loadingState">
        <svg width="110" height="52" viewBox="-1 0 112 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                id="loader"
                d="M12.6853 44.7343L12.7179 44.7573L12.7515 44.779C15.6129 46.6309 18.9106 47.9782 22.4221 48.3842C29.1364 49.3214 36.1371 46.9732 40.9989 42.3L41.0115 42.2879L41.0238 42.2756C42.6483 40.6586 44.2588 39.0452 45.8665 37.4346C48.1112 35.1858 50.3506 32.9424 52.6154 30.7018L52.6277 30.6896L52.6398 30.6772C53.8399 29.4481 56.1668 29.4484 57.3117 30.6385L57.3283 30.6557L57.3453 30.6726C58.9343 32.2469 60.5083 33.8243 62.0869 35.4063C63.0769 36.3984 64.0686 37.3923 65.0671 38.3884L65.0752 38.3964C65.4814 38.7971 65.8965 39.2189 66.3231 39.6525C68.4653 41.8296 70.8984 44.3022 73.9527 45.8704C81.6177 50.1231 91.7145 49.2865 98.5539 43.7687C102.87 40.4575 106.191 35.6612 107.352 30.1974C108.971 22.8639 106.766 14.6759 101.198 9.40858C97.9214 5.79629 93.4443 3.31425 88.6221 2.49039C81.78 1.23706 74.4822 3.36845 69.3833 8.0893L69.3682 8.10327L69.3534 8.11755C66.8973 10.4872 64.465 12.9333 62.0502 15.3618C60.4881 16.9327 58.9334 18.4963 57.3844 20.0269L57.3665 20.0446L57.3491 20.0627C56.1742 21.2835 53.8217 21.2829 52.6236 20.0452L52.6076 20.0286L52.5912 20.0124C50.7941 18.2394 48.9692 16.4091 47.1374 14.5719C44.9877 12.4157 42.8284 10.25 40.6929 8.15578L40.6766 8.13972L40.6598 8.12403C35.092 2.90884 26.8419 0.91108 19.5054 2.92104C13.9546 4.3146 9.45736 8.07933 6.25948 12.3699L6.24755 12.3859L6.23595 12.4021C2.38792 17.7861 1.19006 24.8571 2.89085 31.2017C4.34855 36.8375 8.13678 41.5257 12.6853 44.7343Z"
            ></path>
            <use xlink:href="#loader"></use>
        </svg>
    </div>
    <p class="section-empty" v-show="!productsCount && !loadingState && !pageUnloaded">
        Результатов по запросу не найдено
    </p>
    <div v-intersection="loadMoreForms" class="observer" v-if="productsCount && !loadingState"></div>
</template>
<script>
import { nounMixin } from "@/mixins/generalMixin";
import { mapMutations, mapActions, mapGetters } from "vuex";
import SearchHeader from "@/components/SearchHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
export default {
    mixins: [nounMixin],
    components: { SearchHeader, ProductCard },
    data() {
        return {
            pageUnloaded: false,
            productNounsForms: ["товар", "товара", "товаров"],
            searchNounsForms: ["Найден", "Найдено", "Найдено"],
            productId: this.$route.params.id,
            currentPage: 1,
            limit: 12,
        };
    },
    methods: {
        ...mapMutations(["changeLoadingState", "clearProductActionResults"]),
        ...mapActions(["getProductFormsAPI", "getMoreProducFormsAPI"]),
        getProductForms() {
            this.changeLoadingState(true);
            setTimeout(() => {
                this.getProductFormsAPI([
                    this.productId,
                    {
                        limit: this.limit,
                        page: this.currentPage,
                    },
                ]).catch((e) => {
                    if (e.response.status === 404) {
                        this.$router.push({ name: "notFound" });
                    }
                });
            }, 1000);
        },
        loadMoreForms() {
            if (this.currentPage < this.pageCount) {
                if (this.currentProductsCount === this.pageOffset) {
                    this.currentPage++;
                }
                this.changeLoadingState(true);
                setTimeout(() => {
                    this.getMoreProducFormsAPI([
                        this.productId,
                        {
                            limit: this.limit,
                            page: this.currentPage,
                        },
                    ]);
                }, 500);
            }
        },
    },
    computed: {
        ...mapGetters([
            "productActionResults",
            "loadingState",
            "productActionResultsProperty",
            "productActionResultsData",
        ]),
        productTitle() {
            return this.$route.params.title ?? "";
        },
        productVendor() {
            return this.$route.params.vendor ?? "";
        },
        productsCount() {
            return this.productActionResultsData.total.resultsCount;
        },
        productDataEmpty() {
            return !this.productActionResultsData.results.length;
        },
        currentProductsCount() {
            return this.productActionResultsData.results.length;
        },
        pageCount() {
            return Math.ceil(this.productsCount / this.limit);
        },
        pageOffset() {
            return this.limit * this.currentPage;
        },
    },
    watch: {
        $route(value) {
            if (this.$route.name === "productForms" && value.params.id) {
                this.productId = this.$route.params.id;
                this.currentPage = 1;
                this.getProductForms();
            }
        },
    },
    mounted() {
        if (
            this.productDataEmpty ||
            this.productTitle !== this.productActionResultsProperty.title ||
            this.productVendor !== this.productActionResultsProperty.vendor
        ) {
            this.currentPage = 1;
            this.getProductForms();
        }
    },
};
</script>
<style lang="css" scoped>
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

.section-results {
    margin-bottom: 30px;
}

.results__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    gap: 20px;
}

.results__title {
    /* font-weight: 600;
    font-size: 28px; */
    font-weight: 600;
    font-size: 28px;
    line-height: 100%;
}

.results__description {
    font-size: 18px;
    white-space: nowrap;
}

.separator-bold {
    width: 100%;
    height: 2px;
    background-color: #5680e9;
    border-radius: 1px;
    margin-bottom: 15px;
}

.section-product-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 60px;
}
</style>
