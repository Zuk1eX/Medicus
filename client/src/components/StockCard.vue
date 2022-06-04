<template>
    <div class="stock-card" ref="stockCard" @mouseover="stockCardHovered = true" @mouseleave="stockCardHovered = false">
        <div class="stock-top">
            <div class="stock-main">
                <img :src="pharmacyData.imageUrl" alt="" class="stock__img" />
                <div class="stock-description">
                    <h3 class="stock__title">{{ pharmacyData.title }}</h3>
                    <div class="stock-addresses">
                        <p class="stock__address">{{ pharmacyData.fullAddress }}</p>
                        <p class="stock__metro">{{ formatMetro }}</p>
                    </div>
                </div>
            </div>
            <button class="stock-favourite" @click="toggleFavouritePharmacy">
                <img :src="pharmacyFavouriteIcon" alt="" />
            </button>
            <div class="stock-separator"></div>
            <div class="stock-mods">
                <div
                    title="Аптека предоставляет скидку на товар"
                    class="stock__mod--discount"
                    :class="{
                        stock__mod: stockData.isDiscounted,
                        'stock__mod--inactive': !stockData.isDiscounted,
                    }"
                ></div>
                <div
                    title="Аптека работает в режиме 24/7"
                    class="stock__mod--247"
                    :class="{
                        stock__mod: pharmacyData.is247,
                        'stock__mod--inactive': !pharmacyData.is247,
                    }"
                ></div>
            </div>
            <div class="stock-separator"></div>
            <div class="stock-contacts">
                <a :href="`tel:${pharmacyData.phone}`" class="stock__phone">{{ formatPhone }}</a>
                <a :href="`http://${pharmacyData.site.slice(4)}`" target="_blank" class="stock__site">{{
                    pharmacyData.site
                }}</a>
            </div>
            <div class="stock-separator"></div>
            <p class="stock__price">{{ formatPrice }}</p>
            <div
                class="stock-more"
                :class="{ 'stock-more--visible': stockCardHovered, 'stock-more--active': stockCardClicked }"
                @click="toggleStockCard"
            >
                <div
                    class="arrow-more"
                    :class="{ 'arrow-more--visible': stockCardHovered, 'arrow-more--active': stockCardClicked }"
                ></div>
            </div>
        </div>
        <div class="stock-bottom" ref="stockCardBottom">
            <!-- <img :src="require('@/assets/imgs/map-mini.png')" alt="" class="stock__map" /> -->
            <Suspense v-if="cardClicked">
                <template #default>
                    <yandex-map class="stock__map" :coords="mapCoords" :controls="mapControls" :zoom="mapZoom">
                        <ymap-marker
                            :coords="mapCoords"
                            marker-id="1"
                            :hint-content="`Аптека ${pharmacyData.title}`"
                        /> </yandex-map></template
            ></Suspense>
            <div class="stock-bottom__right">
                <div class="stock__pharmacy-info">
                    <div class="stock__pharmacy-schedule">
                        <p class="schedule__title">Режим работы:</p>
                        <div class="schedule__inner" v-show="!pharmacyData.is247">
                            <div class="schedule__days">
                                <p>ПН-ПТ</p>
                                <p>СБ</p>
                                <p>ВС</p>
                            </div>
                            <div class="schedule__hours">
                                <p>{{ pharmacySchedule[0] }}</p>
                                <p>{{ pharmacySchedule[1] }}</p>
                                <p>{{ pharmacySchedule[2] }}</p>
                            </div>
                        </div>
                        <div class="schedule__inner" v-show="pharmacyData.is247">
                            <div class="schedule__hours">Круглосуточно</div>
                        </div>
                    </div>
                    <div class="stock__pharmacy-description">
                        <p class="description__title">Как добраться:</p>
                        <p class="description__inner">
                            м. "Водный Стадион", последний вагон из центра, перейти дорогу, пешком 5 минут, аптека
                            находится в ЖК "Водный"
                        </p>
                    </div>
                </div>
                <div class="stock__pharmacy-btns">
                    <a :href="pharmacyLocationLink" target="_blank" class="map__btn">На карте</a>
                    <router-link :to="{ name: 'pharmacy', params: { id: pharmacyData._id } }" class="pharmacy__btn">
                        Ассортимент
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { favouritePharmacyMixin } from "@/mixins/generalMixin";
import { mapActions, mapGetters } from "vuex";
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
    components: { yandexMap, ymapMarker },
    props: {
        stockData: {
            type: Object,
        },
    },
    mixins: [favouritePharmacyMixin],
    data() {
        return {
            cardClicked: false,
            pharmacySchedule: [],
            stockCardHovered: false,
            stockCardClicked: false,
            mapCoords: this.stockData.pharmacy.location.coordinates.length
                ? this.stockData.pharmacy.location.coordinates
                : [55.021588, 82.973082],
            mapControls: ["fullscreenControl"],
            mapZoom: 16,
        };
    },
    methods: {
        ...mapActions(["addFavouritePharmacy", "removeFavouritePharmacy"]),
        formatPharmacySchedule() {
            this.pharmacySchedule = this.pharmacyData.workingHours.map((item) => `${item.open} - ${item.close}`);
        },
        toggleStockCard() {
            this.cardClicked = true;
            this.$refs.stockCardBottom.classList.toggle("stock-bottom--active");
            this.stockCardClicked = !this.stockCardClicked;
        },
    },
    computed: {
        ...mapGetters(["checkFavouritePharmacy"]),
        pharmacyData() {
            return this.stockData.pharmacy;
        },
        pharmacyFavouriteIcon() {
            if (this.favouritePharmacy) {
                return require("@/assets/icons/favourite-stock--active.svg");
            }
            return require("@/assets/icons/favourite-stock.svg");
        },
        formatPrice() {
            return new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 2,
            })
                .format(this.stockData.price)
                .replace(",", ".");
        },
        formatPhone() {
            return this.pharmacyData.phone.replace(/(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 ($2) $3 $4 $5");
        },
        formatMetro() {
            return this.pharmacyData.metro.join(", ");
        },
        pharmacyLocationLink() {
            return (
                this.pharmacyData.location.link ??
                `https://yandex.ru/maps/?pt=${this.mapCoords[1]},${this.mapCoords[0]}&z=18&l=map`
            );
        },
    },
    mounted() {
        this.formatPharmacySchedule();
    },
};
</script>
<style lang="css" scoped>
.stock-card {
    padding: 20px 20px 0 20px;
    /* cursor: pointer; */
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 10px;
    z-index: 1;
    transition: all 0.3s ease;
    transition-property: filter, z-index;
}

.stock-card:hover {
    filter: drop-shadow(0px 5px 60px rgba(86, 128, 233, 0.5));
    z-index: 2;
}

.stock-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-bottom: 20px;
}

.stock-main {
    display: flex;
    align-items: center;
    gap: 15px;
    /* flex: 0.715; */
    flex: 0.745;
    margin-right: auto;
}

.stock__img {
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 10px;
    object-fit: contain;
}

.stock-description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0;
    align-self: stretch;
    gap: 15px;
}

.stock__title {
    font-weight: 600;
    font-size: 18px;
}

.stock-addresses {
    font-size: 16px;
    color: #6f6f6f;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.stock__address,
.stock__metro {
    font-size: inherit;
    color: inherit;
    position: relative;
    padding-left: 25px;
}

.stock__address::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    background: url("@/assets/icons/pin.svg") center no-repeat;
}

.stock__metro::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    background: url("@/assets/icons/metro.svg") center no-repeat;
}

.stock-favourite {
    width: 30px;
    height: 30px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* padding-top: 2px; */
    border-radius: 50vmin;
    /* border: 2.5px solid #5680e9; */
}

.stock-favourite--active {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    border-radius: 50vmin;
    border: 2.5px solid #5680e9;
    background-color: #5680e9;
}

.stock-separator {
    height: 60px;
    width: 2px;
    background-color: #babbbf;
    border-radius: 1px;
    margin: 0 20px;
}

.stock-mods {
    display: flex;
    gap: 15px;
    margin-right: auto;
}

.stock__mod {
    width: 30px;
    height: 30px;
}

.stock__mod--inactive {
    width: 30px;
    height: 30px;
    filter: opacity(25%);
}

.stock__mod--discount {
    background: url("@/assets/icons/discount.svg") center no-repeat;
}

.stock__mod--247 {
    background: url("@/assets/icons/247.svg") center no-repeat;
}

.stock-contacts {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 18px;
    margin-right: auto;
}

.stock__phone,
.stock__site {
    font-size: inherit;
    position: relative;
    padding-left: 25px;
}

.stock__phone::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    background: url("@/assets/icons/phone.svg") center no-repeat;
}

.stock__site {
    text-decoration: underline;
    text-underline-offset: 2px;
}

.stock__site::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    background: url("@/assets/icons/site.svg") center no-repeat;
}

.stock__price {
    font-weight: 600;
    font-size: 26px;
    color: #5680e9;
    flex: 0.2;
    text-align: right;
}

.stock-more {
    position: absolute;
    bottom: 0;
    width: 116px;
    height: 25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #cdd9f9;
    background: url("@/assets/icons/more-bg.svg") center no-repeat;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
}

.stock-more--visible {
    opacity: 1;
}

.stock-more--active {
    opacity: 1;
}

.arrow-more {
    width: 100%;
    height: 100%;
    background: url("@/assets/icons/arrow-stock-card.svg") center no-repeat;
    opacity: 0;
    transition: all 0.2s ease-out;
}

.arrow-more--visible {
    opacity: 1;
}

.arrow-more--active {
    opacity: 1;
    transform: rotateX(180deg);
}

.stock-bottom {
    justify-content: space-between;
    gap: 20px;
    display: flex;
    max-height: 0;
    transition: all 0.2s cubic-bezier(0, 1, 0, 1);
    overflow: hidden;
}

.stock-bottom--active {
    max-height: 400px;
    background: radial-gradient(100% 100% at 50% 0%, rgba(205, 217, 249, 0.75) 7%, rgba(255, 255, 255, 0) 48%);
    transition: all 0.2s cubic-bezier(0.65, 0, 1, 0);
}

.stock__map {
    width: 51.5%;
    height: 200px;
    border-radius: 10px;
    margin: 20px 0;
}

.stock-bottom__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px 0;
    width: 50%;
    gap: 20px;
}

.stock__pharmacy-info {
    display: flex;
    justify-content: space-between;
}

.stock__pharmacy-schedule {
}

.schedule__title,
.description__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
}

.schedule__inner,
.description__inner {
    font-size: 16px;
    line-height: 125%;
    color: #6f6f6f;
}

.schedule__inner {
    display: flex;
    gap: 10px;
    line-height: 125%;
}

.schedule__days,
.schedule__days p {
    color: inherit;
    font-size: inherit;
    line-height: inherit;
}

.schedule__hours,
.schedule__hours p {
    text-align: right;
    line-height: inherit;
    font-weight: 600;
}

.mini-bold {
}

.stock__pharmacy-description {
    color: inherit;
    font-size: inherit;
    flex: 0.9;
}

.stock__pharmacy-btns {
    display: flex;
    gap: 20px;
}

.map__btn {
    padding: 10px 30px;
    border: 2px solid #2a2a2a;
    border-radius: 50vmin;
    font-weight: 600;
    color: #2a2a2a;
    transition: all 0.2s ease;
}

/* .map__btn:hover { */
/* background-color: rgba(86, 128, 233, 0.3); */
/* filter: drop-shadow(0 0 10px #000000); */
/* color: #ffffff; */
/* } */

.pharmacy__btn {
    padding: 10px 30px;
    border: 2px solid #5680e9;
    border-radius: 50vmin;
    color: #5680e9;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.2s ease;
}

.pharmacy__btn:hover {
    background-color: #5680e9;
    color: #ffffff;
}
</style>