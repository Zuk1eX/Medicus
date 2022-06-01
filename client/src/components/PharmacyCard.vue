<template>
    <div class="pharmacy-card">
        <div class="pharmacy-main">
            <img :src="pharmacyData.imageUrl" alt="" class="pharmacy__img" />
            <div class="pharmacy-description">
                <h3 class="pharmacy__title">Планета здоровья</h3>
                <div class="pharmacy-addresses">
                    <p class="pharmacy__address">Москва, ул. Пушкина, д. 15</p>
                    <p class="pharmacy__metro">Жулебино, Лермонтовский проспект</p>
                </div>
            </div>
        </div>
        <button class="pharmacy-favourite" @click="toggleFavouritePharmacy">
            <img :src="pharmacyFavouriteIcon" alt="" />
        </button>
        <router-link :to="{ name: 'pharmacy', params: { id: pharmacyData._id } }">
            <button class="pharmacy__more"></button>
        </router-link>
    </div>
</template>
<script>
import { favouritePharmacyMixin } from "@/mixins/generalMixin";
import { mapActions, mapGetters } from "vuex";
export default {
    props: {
        pharmacyData: {
            type: Object,
        },
    },
    mixins: [favouritePharmacyMixin],
    methods: {
        ...mapActions(["addFavouritePharmacy", "removeFavouritePharmacy"]),
    },
    computed: {
        ...mapGetters(["favouritePharmacies", "checkFavouritePharmacy"]),
        pharmacyFavouriteIcon() {
            if (this.favouritePharmacy) {
                return require("@/assets/icons/favourite-product--active.svg");
            }
            return require("@/assets/icons/favourite-product.svg");
        },
    },
};
</script>
<style lang="css" scoped>
.pharmacy-card {
    padding: 20px 20px 20px 20px;
    /* cursor: pointer; */
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 10px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 50%;
    transition: all 0.3s ease;
    transition-property: filter, z-index;
}

.pharmacy-card:hover {
    filter: drop-shadow(0px 5px 60px rgba(86, 128, 233, 0.5));
    z-index: 2;
}

.pharmacy-main {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
    margin-right: auto;
}

.pharmacy__img {
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 10px;
    object-fit: contain;
}

.pharmacy-description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0;
    align-self: stretch;
    gap: 15px;
}

.pharmacy__title {
    font-weight: 600;
    font-size: 18px;
}

.pharmacy-addresses {
    font-size: 16px;
    color: #6f6f6f;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.pharmacy__address,
.pharmacy__metro {
    font-size: inherit;
    color: inherit;
    position: relative;
    padding-left: 25px;
}

.pharmacy__address::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    background: url("@/assets/icons/pin.svg") center no-repeat;
}

.pharmacy__metro::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    background: url("@/assets/icons/metro.svg") center no-repeat;
}

.pharmacy-favourite {
    /* width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    border-radius: 50vmin;
    border: 2.5px solid #5680e9; */
    width: 36px;
    height: 36px;
    border-radius: 50vmin;
    /* position: absolute; */
    /* right: 20px; */
}

.pharmacy-favourite--active {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2px;
    border-radius: 50vmin;
    border: 2.5px solid #5680e9;
    background-color: #5680e9;
}

.pharmacy__more {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50vmin;
    border: 2.5px solid #5680e9;
    background: url("@/assets/icons/arrow-favourite.svg") 11px 5px no-repeat;
    transition: all 0.2s ease;
    transition-property: background-image, background-color;
    /* position: absolute; */
    /* right: 20px;
    bottom: 20px; */
    /* opacity: 0; */
    /* transition: opacity 0.2s ease;
    border-radius: 50vmin;
    border: 2.5px solid #5680e9;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 2px; */
}

.pharmacy-card:hover .pharmacy__more {
    background-color: #5680e9;
    background-image: url("@/assets/icons/arrow-overlay--active.svg");
}
</style>