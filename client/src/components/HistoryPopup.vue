<template>
    <transition name="fade">
        <div class="popup history-popup" v-show="popupActive">
            <div class="popup__back" @click="$emit('popupActive', false)"></div>
            <div class="popup__body">
                <div class="section-empty history-empty" v-show="!historyProducts.length">
                    История просмотра<br />лекарств пуста
                </div>
                <div class="popup__cards">
                    <router-link
                        class="popup-card"
                        v-for="product in historyProducts"
                        :key="product['_id']"
                        :to="{ name: 'product', params: { id: product['_id'] } }"
                    >
                        <div class="popup-card__main">
                            <p class="popup-card__title">{{ product["title"] }}</p>
                            <p class="popup-card__description">{{ product["description"] }}</p>
                        </div>
                        <div class="popup-card__btn">
                            <div class="popup-card__link"></div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    inject: ["popupActive"],
    emits: ["popupActive"],
    props: ["popupActiveTimer"],
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            if (this.popupActive && this.popupActiveTimer) {
                setTimeout(() => {
                    this.$emit("popupActive", false);
                }, 1000);
            }
        },
    },
    computed: {
        ...mapGetters(["historyProducts"]),
    },
};
</script>
<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.popup {
    z-index: 7;
    position: absolute;
    /* width: 100%;
  height: 100%; */
}

.history-popup {
}

.popup__back {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    /* background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), rgba(86, 128, 233, 0.2); */
}

.popup__body {
    /* position: relative; */
    position: absolute;
    height: 400px;
    width: 400px;
    background-color: #ffffff;
    box-shadow: 0px 0px 60px rgba(86, 128, 233, 0.5);
    border-radius: 16px;
    padding: 10px;
    overflow-y: auto;
    /* margin-left: auto; */
    top: 67px;
    /* right: 0; */
    right: -134px;
}

.popup__body::-webkit-scrollbar {
    width: 14px;
}

.popup__body::-webkit-scrollbar-track {
    background-color: rgba(86, 128, 233, 0.3);
    background-clip: content-box;
    border-right: 8px solid transparent;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-radius: 5px;
}

.popup__body::-webkit-scrollbar-thumb {
    background-color: #5680e9;
    border-radius: 5px;
    background-clip: content-box;
    border-right: 8px solid transparent;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
}

.popup__cards {
    display: flex;
    flex-direction: column;
}

.popup-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.popup-card:hover {
    background-color: rgba(86, 128, 233, 0.3);
}

.popup-card:hover .popup-card__link {
    opacity: 1;
}

.popup-card__main {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.popup-card__title {
    font-weight: 600;
    font-size: 18px;
}

.popup-card__description {
    font-size: 16px;
    color: #6f6f6f;
}

.popup-card__btn {
}

.popup-card__link {
    width: 28px;
    height: 28px;
    background-color: #5680e9;
    border-radius: 50vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("@/assets/icons/arrow-history.svg") center no-repeat;
    transition: opacity 0.1s ease;
    opacity: 0;
}

.history-empty {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
}
</style>