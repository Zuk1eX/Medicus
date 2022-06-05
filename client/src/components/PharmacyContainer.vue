<template>
    <div class="container section-pharmacy">
        <h2 class="pharmacy__title">Аптека {{ pharmacyData.title }}</h2>
        <div class="pharmacy__block">
            <img :src="require('@/assets/imgs/product-picture.png')" alt="" class="pharmacy__img" />
            <div class="pharmacy__info pharmacy__info--left">
                <div class="pharmacy__description">
                    <p class="pharmacy__prop">
                        Адрес:
                        <span class="bold">{{ pharmacyData.address }}</span>
                    </p>
                    <p class="pharmacy__prop">
                        Ближайшие станции метро:
                        <span class="bold">{{ pharmacyData.fullMetro }}</span>
                    </p>
                    <p class="pharmacy__prop">
                        Телефон:
                        <a class="bold" :href="`tel:${pharmacyData.phone}`">{{ formatPhone }}</a>
                    </p>
                    <p class="pharmacy__prop">
                        E-mail:
                        <a class="bold" :href="`mailto:${pharmacyData.email}`">{{ pharmacyData.email }}</a>
                    </p>
                    <p class="pharmacy__prop">
                        Сайт:
                        <a class="bold site" :href="formatSite" target="_blank">{{ pharmacyData.site }}</a>
                    </p>
                </div>
                <div class="pharmacy__btns">
                    <button class="pharmacy__favourite" @click="toggleFavouritePharmacy">
                        <img :src="pharmacyFavouriteIcon" alt="" />
                    </button>
                    <a :href="pharmacyLocationLink" target="_blank" class="pharmacy__link">На карте</a>
                </div>
            </div>
            <div class="pharmacy__info pharmacy__info--right">
                <div class="pharmacy-schedule">
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
                <div class="pharmacy-description">
                    <p class="description__title">Как добраться:</p>
                    <p class="description__inner">
                        {{ pharmacyData.locationDescr }}
                    </p>
                </div>
            </div>
        </div>
        <!-- <img :src="require('@/assets/imgs/map.png')" alt="" class="pharmacy__map" /> -->
        <!-- <yandex-map class="pharmacy__map" :coords="mapCoords" :controls="mapControls" :zoom="mapZoom" ref="map">
            <ymap-marker :coords="mapCoords" marker-id="1" :hint-content="`Аптека ${pharmacyData.title}`"></ymap-marker>
        </yandex-map> -->
        <div id="pharmacy__map" ref="map"></div>
    </div>
</template>
<script>
import { favouritePharmacyMixin } from "@/mixins/generalMixin";
import { mapActions, mapGetters } from "vuex";
// import { yandexMap, ymapMarker } from "vue-yandex-maps";
import { load } from "@2gis/mapgl";
export default {
    name: "PharmacyContainer",
    // components: { yandexMap, ymapMarker },
    props: {
        pharmacyId: {
            type: String || [String],
        },
        pharmacyData: {
            type: Object,
        },
    },
    mixins: [favouritePharmacyMixin],
    data() {
        return {
            pharmacySchedule: [],
            mapCoords: this.pharmacyData.location.coordinates.length
                ? this.pharmacyData.location.coordinates
                : [37.565519670240775, 55.74424883789338], //long, lat
            mapControls: ["fullscreenControl"],
            mapZoom: 16,
            map: null,
        };
    },
    methods: {
        ...mapActions(["addFavouritePharmacy", "removeFavouritePharmacy"]),
        formatPharmacySchedule() {
            this.pharmacySchedule = this.pharmacyData.workingHours.map((item) => `${item.open} - ${item.close}`);
        },
        loadMap() {
            load().then((mapglAPI) => {
                this.map = new mapglAPI.Map(this.$refs.map, {
                    key: "bfd8bbca-8abf-11ea-b033-5fa57aae2de7",
                    center: this.mapCoords,
                    zoom: this.mapZoom,
                    autoHideOSMCopyright: true,
                });
                new mapglAPI.Marker(this.map, {
                    coordinates: this.mapCoords,
                });
            });
        },
    },
    computed: {
        ...mapGetters(["checkFavouritePharmacy"]),
        pharmacyFavouriteIcon() {
            if (this.favouritePharmacy) {
                return require("@/assets/icons/favourite-productpage--active.svg");
            }
            return require("@/assets/icons/favourite-productpage.svg");
        },
        formatPhone() {
            return this.pharmacyData.phone.replace(/(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 ($2) $3 $4 $5");
        },
        formatSite() {
            return `http://${this.pharmacyData.site.slice(4)}`;
        },
        pharmacyLocationLink() {
            return this.pharmacyData.location.link ?? `https://2gis.ru/geo/${this.mapCoords[0]},${this.mapCoords[1]}`;
        },
    },
    mounted() {
        this.formatPharmacySchedule();
        this.$nextTick(this.loadMap);
    },
};
</script>
<style lang="css" scoped>
.section-pharmacy {
    margin-bottom: 30px;
}

.pharmacy__title {
    font-weight: 600;
    font-size: 28px;
    line-height: 100%;
    margin-bottom: 30px;
}

.pharmacy__block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    margin-bottom: 30px;
}

.pharmacy__img {
    display: block;
    width: 225px;
    height: 225px;
    object-fit: contain;
    border-radius: 10px;
    image-rendering: -webkit-optimize-contrast;
    align-self: start;
}

.pharmacy__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    /* flex: 1; */
    align-self: stretch;
    gap: 20px;
}

.pharmacy__info--left {
    flex: 1;
}

.pharmacy__info--right {
    min-width: 350px;
    width: 400px;
}

.pharmacy__description {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.pharmacy__prop {
    font-size: 18px;
    color: #6f6f6f;
}

.bold {
    font-size: inherit;
    font-weight: 600;
    color: #000000;
}

a.bold.site {
    text-decoration: underline;
    text-underline-offset: 2px;
}

.pharmacy__btns {
    display: flex;
    gap: 10px;
}

.pharmacy__favourite {
    width: 40px;
    height: 40px;
    /* display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #5680e9; */
    border-radius: 50vmin;
}

.pharmacy__favourite--active {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #5680e9;
    background-color: #5680e9;
    border-radius: 50vmin;
}

.pharmacy__link {
    padding: 10px 30px;
    border: 2px solid #5680e9;
    border-radius: 50vmin;
    font-weight: 600;
    font-size: 16px;
    color: #5680e9;
    transition: all 0.2s ease;
    cursor: pointer;
}

.pharmacy__link:hover {
    background-color: #5680e9;
    color: #ffffff;
}

.pharmacy-schedule {
}

.schedule__title,
.description__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
}

.schedule__inner,
.description__inner {
    font-size: 18px;
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
    font-size: 18px;
    font-weight: 600;
    text-align: right;
    line-height: inherit;
}

.mini-bold {
}

.pharmacy-description {
    color: inherit;
    font-size: inherit;
}

#pharmacy__map {
    width: 100%;
    height: 225px;
    border-radius: 10px;
}
</style>