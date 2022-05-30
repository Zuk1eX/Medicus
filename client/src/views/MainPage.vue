<template>
    <search-header></search-header>
    <div class="container section-popular">
        <h3 class="popular__title">Популярное на сервисе</h3>
        <div class="popular__slider" v-show="!loadingState">
            <product-card
                v-for="product in productsPopular"
                :key="product['_id']"
                :product-data="product"
                :type="'product'"
            ></product-card>
        </div>
        <div class="loader loader-block" v-show="loadingState">
            <svg width="110" height="52" viewBox="-1 0 112 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    id="loader"
                    d="M12.6853 44.7343L12.7179 44.7573L12.7515 44.779C15.6129 46.6309 18.9106 47.9782 22.4221 48.3842C29.1364 49.3214 36.1371 46.9732 40.9989 42.3L41.0115 42.2879L41.0238 42.2756C42.6483 40.6586 44.2588 39.0452 45.8665 37.4346C48.1112 35.1858 50.3506 32.9424 52.6154 30.7018L52.6277 30.6896L52.6398 30.6772C53.8399 29.4481 56.1668 29.4484 57.3117 30.6385L57.3283 30.6557L57.3453 30.6726C58.9343 32.2469 60.5083 33.8243 62.0869 35.4063C63.0769 36.3984 64.0686 37.3923 65.0671 38.3884L65.0752 38.3964C65.4814 38.7971 65.8965 39.2189 66.3231 39.6525C68.4653 41.8296 70.8984 44.3022 73.9527 45.8704C81.6177 50.1231 91.7145 49.2865 98.5539 43.7687C102.87 40.4575 106.191 35.6612 107.352 30.1974C108.971 22.8639 106.766 14.6759 101.198 9.40858C97.9214 5.79629 93.4443 3.31425 88.6221 2.49039C81.78 1.23706 74.4822 3.36845 69.3833 8.0893L69.3682 8.10327L69.3534 8.11755C66.8973 10.4872 64.465 12.9333 62.0502 15.3618C60.4881 16.9327 58.9334 18.4963 57.3844 20.0269L57.3665 20.0446L57.3491 20.0627C56.1742 21.2835 53.8217 21.2829 52.6236 20.0452L52.6076 20.0286L52.5912 20.0124C50.7941 18.2394 48.9692 16.4091 47.1374 14.5719C44.9877 12.4157 42.8284 10.25 40.6929 8.15578L40.6766 8.13972L40.6598 8.12403C35.092 2.90884 26.8419 0.91108 19.5054 2.92104C13.9546 4.3146 9.45736 8.07933 6.25948 12.3699L6.24755 12.3859L6.23595 12.4021C2.38792 17.7861 1.19006 24.8571 2.89085 31.2017C4.34855 36.8375 8.13678 41.5257 12.6853 44.7343Z"
                ></path>
                <use xlink:href="#loader"></use>
            </svg>
        </div>
    </div>
    <div class="section-tips">
        <div class="container tips-container">
            <h3 class="tips__title">Как пользоваться сервисом Medicus?</h3>
            <div class="tips__inner">
                <div class="tips__card">
                    <div class="tips__icon">
                        <img class="search-icon" :src="require('@/assets/icons/search-info.svg')" alt="" />
                    </div>
                    <p class="tips__text">Воспользуйтесь поиском, чтобы найти необходимое лекарство</p>
                </div>
                <img :src="require('@/assets/icons/arrow-info.svg')" alt="" />
                <div class="tips__card">
                    <div class="tips__icon">
                        <img class="ruble-icon" :src="require('@/assets/icons/ruble-info.svg')" alt="" />
                    </div>
                    <p class="tips__text">Выберите понравившуюся цену на лекарство</p>
                </div>
                <img :src="require('@/assets/icons/arrow-info.svg')" alt="" />
                <div class="tips__card">
                    <div class="tips__icon">
                        <img class="pin-icon" :src="require('@/assets/icons/pin-info.svg')" alt="" />
                    </div>
                    <p class="tips__text">Узнайте подробнее об аптеке и совершите покупку*</p>
                </div>
            </div>
            <p class="tips__notice">
                * Сервис-агрегатор Medicus не осуществляет торговую деятельность, а также не предоставляет услуги по
                бронированию товаров в аптеках. Покупка и бронирование лекарственных средств производятся лично
                пользователем сервиса.
            </p>
        </div>
    </div>
    <div class="container section-faq">
        <h3 class="faq__title">Вопросы и ответы</h3>
        <faq-container></faq-container>
    </div>
    <footer class="footer">
        <div class="container footer-container">
            <p class="footer__about">
                Medicus®<br />
                ©2022<br />
                All rights reserved.
            </p>
            <p class="footer__about footer__about--right">
                Developer: Gormash A.<br />
                <!-- <a href="https://github.com/Zuk1eX">github.com/Zuk1eX</a> -->
                <a href="http://github.com/Zuk1eX" target="_blank" class="social-link github-link"></a>
                <a href="http://vk.com/Zuk1eX" target="_blank" class="social-link vk-link"></a>
            </p>
        </div>
    </footer>
</template>
<script>
import SearchHeader from "@/components/SearchHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import FaqContainer from "../components/FaqContainer.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    components: { SearchHeader, ProductCard, FaqContainer },
    methods: {
        ...mapMutations(["changeLoadingState"]),
        ...mapActions(["getProductsPopularAPI"]),
        getProducts() {
            this.changeLoadingState(true);
            setTimeout(() => {
                this.getProductsPopularAPI({
                    sort: "views",
                    limit: 4,
                });
            }, 500);
        },
    },
    computed: {
        ...mapGetters(["productsPopular", "loadingState"]),
        productsCount() {
            return this.productsPopular.length;
        },
    },
    mounted() {
        if (!this.productsCount) {
            this.getProducts();
        }
    },
};
</script>
<style lang="css" scoped>
.social-link {
    width: 30px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 5px;
    /* margin-left: auto; */
    transition: all 0.2s ease;
}

.social-link:hover {
    filter: invert(100%);
}

.social-link:not(:last-child) {
    margin-right: 10px;
}

.github-link {
    background: url("@/assets/icons/github.svg") center no-repeat;
    background-size: 30px 30px;
}

.vk-link {
    background: url("@/assets/icons/vk.svg") center no-repeat;
    background-size: 30px 30px;
}

.footer__about--right {
    text-align: right;
}

.loader-block {
    height: 384px;
    align-items: center;
}

.section-popular {
    margin-bottom: 60px;
}

.popular__title {
    font-size: 28px;
    font-weight: 600;
    line-height: 100%;
    margin-bottom: 30px;
}

.popular__slider {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
}

/* jsogjolskegksdklgje;rgiojesgljsolgjesrglej */

.section-tips {
    background-color: #5680e9;
    padding: 30px 0;
    margin-bottom: 60px;
}

.tips-container {
    display: flex;
    flex-direction: column;
    gap: 60px;
}

.tips__title {
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
}

.tips__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tips__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    max-width: 290px;
}

.tips__icon {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 5px 60px rgba(255, 255, 255, 0.5);
    border-radius: 50vmin;
}

.tips__icon > .ruble-icon {
    padding-left: 5px;
}

.tips__text {
    font-weight: 400;
    font-size: 22px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
}

.tips__notice {
    max-width: calc(1276px / 2);
    font-size: 14px;
    font-weight: 300;
    color: #ffffff;
}

/* asdhofjwejfljlwkfljsldmglsjlgkjoswhifokjsaolf */

.section-faq {
    margin-bottom: 60px;
}

.faq__title {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 30px;
}

/* sdjaogjlmkvfoljewrlgfkojewrgkoejrglkeog */

.footer {
    background-color: #5680e9;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
}

.footer__about {
    font-size: 18px;
    line-height: 125%;
    color: #ffffff;
}

.footer__about a {
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    text-decoration: underline;
}
</style>
