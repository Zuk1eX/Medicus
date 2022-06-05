<template>
    <search-header></search-header>
    <product-container
        :product-id="productId"
        :product-data="productData"
        v-show="!loadingProductData"
    ></product-container>
    <product-container-sceleton v-show="loadingProductData"></product-container-sceleton>
    <!-- <stocks-container :stocks-data="stocksData" v-show="!loadingStocksData"></stocks-container> -->
    <stocks-container :product-id="productId"></stocks-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SearchHeader from "@/components/SearchHeader.vue";
import ProductContainerSceleton from "@/components/ProductContainerSceleton.vue";
import ProductContainer from "@/components/ProductContainer.vue";
import StocksContainer from "@/components/StocksContainer.vue";
export default {
    components: { SearchHeader, ProductContainerSceleton, ProductContainer, StocksContainer },
    data() {
        return {
            productId: this.$route.params.id,
        };
    },
    methods: {
        ...mapMutations(["changeLoadingProductData", "clearProductData", "changeLoadingStocksData", "clearStocksData"]),
        ...mapActions(["getProductDataAPI", "getStocksDataAPI", "incrementProductViews", "addHistoryProduct"]),
        getProductData() {
            this.clearProductData();
            this.changeLoadingProductData(true);
            setTimeout(() => {
                this.getProductDataAPI(this.productId).catch((e) => {
                    if (e.response.status === 404) {
                        this.$router.push({ name: "notFound" });
                    }
                });
            }, 1000);
        },
        getStocksData() {
            this.clearStocksData();
            this.changeLoadingStocksData(true);
            setTimeout(() => {
                this.getStocksDataAPI(this.productId);
            }, 1000);
        },
        plusProductView() {
            this.incrementProductViews(this.productId);
        },
        async addProductToHistory() {
            while (!this.productData.title) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
            this.addHistoryProduct({
                _id: this.productId,
                title: this.productData.title,
                description: this.productData.description,
            });
        },
    },
    computed: {
        ...mapGetters(["productData", "loadingProductData", "stocksData", "loadingStocksData", "historyProducts"]),
        productDataEmpty() {
            return !Object.getOwnPropertyNames(this.productData).length;
        },
    },
    watch: {
        $route(value) {
            if (this.$route.name === "product" && value.params.id) {
                this.productId = this.$route.params.id;
                this.getProductData();
                // this.getStocksData();
                this.plusProductView();
            }
        },
        loadingProductData(value) {
            if (!value) {
                this.plusProductView();
            }
        },
    },
    mounted() {
        if (this.productDataEmpty || this.productId !== this.productData?._id) {
            this.getProductData();
            // this.getStocksData();
        }
        this.addProductToHistory();
    },
};
</script>
<style lang="css" scoped>
</style>