<template>
    <router-link
        :to="{ name: 'product', params: { id: productData._id } }"
        class="overlay-card"
        @click="searchOverlayDisable"
    >
        <div class="overlay-card__left">
            <img :src="productData.imageUrl" alt="" class="overlay-card__img" />
            <div class="overlay-card__text">
                <h3 class="overlay-card__title">{{ productData.title }}</h3>
                <p class="overlay-card__description">{{ productData.description }}</p>
            </div>
        </div>
        <p class="overlay-card__offers">{{ productData.stocksCount }}</p>
        <p class="overlay-card__prices-range" v-show="productData.minPrice">
            {{ productData.minPrice }} ... {{ productData.maxPrice }}
        </p>
        <p class="overlay-card__prices-range" v-show="!productData.minPrice">—</p>
        <div class="overlay-card__btn" @click="searchOverlayDisable">
            <router-link
                :to="{ name: 'product', params: { id: productData._id } }"
                class="overlay-card__link"
            ></router-link>
        </div>
    </router-link>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    props: {
        productData: {
            type: Object,
        },
    },
    methods: {
        ...mapMutations(["searchOverlayDisable"]),
    },
};
</script>
<style lang="css">
.overlay-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 16px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    z-index: 0;
}

.overlay-card__left {
    display: flex;
    align-items: center;
    gap: 20px;
    flex: 50%;
}

.overlay-card__img {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    object-fit: contain;
}

.overlay-card__text {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.overlay-card__title {
    font-size: 18px;
    font-weight: 600;
}

.overlay-card__description {
    font-size: 16px;
    color: #6f6f6f;
}

.overlay-card__offers {
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    flex: calc(50% / 3);
}

.overlay-card__prices-range {
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    flex: calc(50% / 3);
}

.overlay-card__btn {
    flex: calc(50% / 4);
    cursor: pointer;
}

.overlay-card:hover .overlay-card__link {
    background-color: #5680e9;
    background-image: url("@/assets/icons/arrow-overlay--active.svg");
}

.overlay-card:hover {
    /* z-index: 1; */
    box-shadow: 0px 5px 40px rgba(86, 128, 233, 0.7);
}

.overlay-card__link {
    width: 36px;
    height: 36px;
    border: 2.5px solid #5680e9;
    border-radius: 50vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("@/assets/icons/arrow-overlay.svg") 11.5px center no-repeat;
    margin: 0 auto;
    transition: all 0.2s ease;
    transition-property: background-image, background-color;
}
</style>