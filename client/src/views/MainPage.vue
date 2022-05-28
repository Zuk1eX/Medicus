<template>
    <search-header></search-header>
    <div class="container section-popular">
        <h3 class="popular__title">Популярное на сервисе</h3>
        <div class="popular__slider">
            <product-card v-for="item in 4" :key="item" :product-data="testCard"></product-card>
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
    <!-- </main> -->
    <footer class="footer">
        <div class="container footer-container">
            <p class="footer__about">
                Medicus®<br />
                ©2022<br />
                All rights reserved.
            </p>
            <p class="footer__about">
                Developer: Gormash A.<br />
                <a href="https://github.com/Zuk1eX">https://github.com/Zuk1eX</a>
            </p>
        </div>
    </footer>
</template>
<script>
import SearchHeader from "@/components/SearchHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import FaqContainer from "../components/FaqContainer.vue";
export default {
    components: { SearchHeader, ProductCard, FaqContainer },
    data() {
        return {
            products: [],
            testCard: {
                _id: "6255bbeb150da0ea0cabba38",
                barcode: "0000000000073",
                title: "Оциллококцинум",
                imageUrl: "https://i.ibb.co/g90rTSp/picture.png",
                rating: 4.9,
                minPrice: 5380,
                maxPrice: 5812,
                description: "гранулы гомеопатические, 1 г, 30 шт.",
                fullTitle: "Оциллококцинум, гранулы гомеопатические, 1 г, 30 шт.",
                fullVendor: "Laboratoires Boiron, Франция",
                stocksCount: 3,
            },
        };
    },
};
</script>
<style lang="css" scoped>
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
