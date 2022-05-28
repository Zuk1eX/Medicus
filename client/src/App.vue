

<template>
    <router-view></router-view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    methods: {
        ...mapMutations(["setFavouriteProducts", "setFavouritePharmacies"]),
    },
    computed: {
        ...mapGetters(["searchOverlayActive"]),
    },
    watch: {
        searchOverlayActive() {
            const offset = window.innerWidth - document.body.clientWidth || 0;
            document.body.style.paddingRight = `${offset}px`;
            document.body.classList.toggle("overflow--hidden");
        },
    },
    mounted() {
        if (!localStorage.favouriteProducts) {
            localStorage.favouriteProducts = "[]";
        }
        if (!localStorage.favouritePharmacies) {
            localStorage.favouritePharmacies = "[]";
        }
        this.setFavouriteProducts(JSON.parse(localStorage.favouriteProducts));
        this.setFavouritePharmacies(JSON.parse(localStorage.favouritePharmacies));
    },
};
</script>

<style lang="css">
@import url("@/assets/main.css");

body {
    font-family: "Mont", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #000000;
    line-height: 100%;
}

.overflow--hidden {
    overflow-y: hidden;
}

.container {
    max-width: 1276px;
    margin: 0 auto;
}

.semibold {
    font-weight: 600;
}

.bold {
    font-weight: 700;
}

.section-empty {
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    margin-bottom: 30px;
    line-height: 125%;
}

.separator-bold {
    width: 100%;
    height: 2px;
    background-color: #5680e9;
    border-radius: 1px;
    margin-bottom: 15px;
}

.loader {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.loader svg {
    stroke: #5680e925;
    stroke-width: 4;
    stroke-linecap: round;
    transform: rotate(-45deg);
}

.loader svg use {
    stroke: #5680e9;
    --ll: calc(50 * 291 / 100);
    stroke-dasharray: var(--ll), calc(291 - var(--ll));
    animation: animate 1.75s linear infinite;
}

@keyframes animate {
    from {
        stroke-dashoffset: 291;
    }
    to {
        stroke-dashoffset: 0;
    }
}
</style>