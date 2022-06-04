<template>
    <div class="container section-product">
        <h2 class="product__title">{{ productData.fullTitle }}</h2>
        <div class="product__block">
            <div class="product__picture" @mouseenter="scalePicture" @mouseleave="unscalePicture">
                <img :src="productData.imageUrl" alt="" class="product__img" ref="picture" />
            </div>
            <div class="product__info">
                <div class="product__description">
                    <p class="product__prop">
                        Действующее вещество (МНН):
                        <span class="bold" v-show="productData.inn">{{ productData.inn }}</span>
                        <span class="bold" v-show="!productData.inn">—</span>
                    </p>
                    <p class="product__prop">
                        Фармакологическая группа:
                        <span class="bold">{{ productData.pharmgroup }}</span>
                    </p>
                    <p class="product__prop">
                        Производитель:
                        <span class="bold">{{ productData.fullVendor }}</span>
                    </p>
                </div>
                <div class="product__btns">
                    <button class="product__favourite" @click="toggleFavouriteProduct">
                        <img :src="productFavouriteIcon" alt="" />
                    </button>
                    <router-link
                        :to="{
                            name: 'productForms',
                            params: { id: productId, title: productData.title, vendor: productData.vendor?.title },
                        }"
                        class="product__link"
                        >Все формы выпуска</router-link
                    >
                    <router-link
                        :to="{ name: 'productAnalogs', params: { id: productId, pharmgroup: productData.pharmgroup } }"
                        class="product__link"
                        >Аналоги</router-link
                    >
                    <router-link
                        :to="{ name: 'productSynonims', params: { id: productId, inn: productData.inn } }"
                        class="product__link"
                        v-show="productData.inn"
                        >Синонимы</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { favouriteProductMixin } from "@/mixins/generalMixin";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "ProductContainer",
    props: {
        productId: {
            type: String || [String],
        },
        productData: {
            type: Object,
        },
    },
    mixins: [favouriteProductMixin],
    data() {
        return {
            scalePictureTimer: null,
        };
    },
    methods: {
        ...mapActions(["addFavouriteProduct", "removeFavouriteProduct"]),
        // dragPicture(event) {
        //     // console.log(event)
        //     this.$refs.picture.style.left = -event.offsetX + "px";
        //     this.$refs.picture.style.top = -event.offsetY + "px";
        // },
        scalePicture() {
            this.scalePictureTimer = setTimeout(() => {
                this.$refs.picture.classList.add("picture--hovered");
            }, 500);
        },
        unscalePicture() {
            clearTimeout(this.scalePictureTimer);
            this.$refs.picture.classList.remove("picture--hovered");
        },
    },
    computed: {
        ...mapGetters(["checkFavouriteProduct"]),
        productFavouriteIcon() {
            if (this.favouriteProduct) {
                return require("@/assets/icons/favourite-productpage--active.svg");
            }
            return require("@/assets/icons/favourite-productpage.svg");
        },
    },
};
</script>
<style lang="css" scoped>
.section-product {
    margin-bottom: 60px;
}

.product__title {
    font-weight: 600;
    font-size: 28px;
    line-height: 100%;
    margin-bottom: 30px;
}

.product__block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}

.product__picture {
    /* overflow: hidden; */
    width: 225px;
    height: 225px;
    position: relative;
}

/* .product__picture:hover .product__img {
    transform: scale(1.7);
    box-shadow: 0px 0px 15px rgba(86, 128, 233, 0.5);
} */

.picture--hovered {
    transform: scale(1.7);
    box-shadow: 0px 0px 15px rgba(86, 128, 233, 0.5);
}

.product__img {
    position: absolute;
    display: block;
    /* width: 525px;
    height: 525px; */
    border-radius: 10px;
    object-fit: contain;
    /* object-fit: cover; */
    image-rendering: -webkit-optimize-contrast;
    transition: all 0.3s ease;
    /* transform: scale(1.5) translate(50%, 50%); */
}

.product__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;
    align-self: stretch;
}

.product__description {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.product__prop {
    font-size: 18px;
    color: #6f6f6f;
}

/* .product__prop span {
    line-height: 125%;
} */

.bold {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
}

.product__btns {
    display: flex;
    gap: 10px;
}

.product__favourite {
    width: 40px;
    height: 40px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* border: 2px solid #5680e9; */
    border-radius: 50vmin;
}

.product__favourite--active {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #5680e9;
    background-color: #5680e9;
    border-radius: 50vmin;
}

.product__link {
    padding: 10px 30px;
    border: 2px solid #5680e9;
    border-radius: 50vmin;
    font-weight: 600;
    font-size: 16px;
    color: #5680e9;
    transition: all 0.2s ease;
    cursor: pointer;
}

.product__link:hover {
    background-color: #5680e9;
    color: #ffffff;
}
</style>