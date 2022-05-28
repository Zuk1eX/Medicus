<template>
    <div class="product-card">
        <img alt="" class="card__img" :src="productData.imageUrl" />
        <button class="card__favourite" @click="toggleFavouriteProduct">
            <img :src="productFavouriteIcon" alt="" />
        </button>
        <h4 class="card__title">
            <router-link :to="{ name: 'product', params: { id: productData._id } }">
                {{ productData.fullTitle }}</router-link
            >
        </h4>
        <p class="card__vendor">{{ productData.fullVendor }}</p>
        <div class="separator"></div>
        <div class="card__pharmacies">
            <p class="pharmacies__all" v-show="productData.stocksCount">
                В наличии в <span class="bold">{{ productData.stocksCount }}</span> аптеках
            </p>
            <p class="pharmacies__all" v-show="!productData.stocksCount">Нет в наличии</p>
        </div>
        <div class="card__bottom">
            <div class="card__price" v-show="productData.minPrice">
                Цена от <span class="bold">{{ formatMinPrice }}</span>
            </div>
            <div class="card__price" v-show="!productData.minPrice"><span class="bold">Нет в наличии</span></div>
            <router-link :to="{ name: 'product', params: { id: productData._id } }">
                <button class="card__more">
                    <img :src="require('@/assets/icons/arrow-card.svg')" />
                </button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { favouriteProductMixin } from "@/mixins/generalMixin";
import { mapActions, mapGetters } from "vuex";
export default {
    props: {
        productData: {
            type: Object,
        },
    },
    mixins: [favouriteProductMixin],
    methods: {
        ...mapActions(["addFavouriteProduct", "removeFavouriteProduct"]),
    },
    computed: {
        ...mapGetters(["favouriteProducts", "checkFavouriteProduct"]),
        productFavouriteIcon() {
            if (this.favouriteProduct) {
                return require("@/assets/icons/favourite-product--active.svg");
            }
            return require("@/assets/icons/favourite-product.svg");
        },
        formatMinPrice() {
            return new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                maximumFractionDigits: 0,
            })
                .format(this.productData.minPrice)
                .replace(",", ".");
        },
    },
};
</script>
<style lang="css" scoped>
.product-card {
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    width: 304px;
    position: relative;
    cursor: default;
    z-index: 1;
    transition: all 0.3s ease;
    transition-property: filter, z-index;
}

.product-card:hover {
    filter: drop-shadow(0px 5px 40px rgba(86, 128, 233, 0.7));
    z-index: 2;
}

.product-card:hover .card__more {
    opacity: 1;
}

.card__img {
    display: block;
    width: 125px;
    height: 125px;
    border-radius: 10px;
    object-fit: contain;
    margin-bottom: 15px;
    image-rendering: -webkit-optimize-contrast;
}

.card__favourite {
    width: 36px;
    height: 36px;
    border-radius: 50vmin;
    position: absolute;
    right: 20px;
}

.favourite__icon {
}

.card__title {
    font-size: 18px;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: 10px;
    flex: 1;
}

.card__title a {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
}

.card__vendor {
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
    color: #828282;
    margin-bottom: 20px;
}

.separator {
    height: 1px;
    width: 100%;
    background-color: #5680e9;
    margin-bottom: 20px;
}

.card__pharmacies {
}

.pharmacies__all {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    margin-bottom: 17px;
}

.card__bottom {
    /* display: flex; */
}

.card__price {
    font-weight: 400;
    font-size: 24px;
    line-height: 150%;
    color: #5680e9;
}

.card__price .bold {
    font-size: 26px;
    color: inherit;
}

.card__more {
    position: absolute;
    right: 20px;
    bottom: 20px;
    opacity: 0;
    transition: opacity 0.2s ease;
}
</style>