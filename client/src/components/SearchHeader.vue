<template>
    <header class="header" ref="header">
        <div class="container search-container">
            <router-link :to="{ name: 'main' }" class="search__logo" ref="searchLogo">
                <img :src="require('@/assets/logo.svg')" alt="" class="logo__img" />
            </router-link>
            <div class="search-box">
                <div class="extra"></div>
                <div class="search-input">
                    <input
                        v-focus
                        type="text"
                        class="search-box__input"
                        placeholder="Начните вводить наименование или штрих-код лекарства..."
                        :value="searchText"
                        @focus="setSearchText"
                        @input="setSearchText"
                        @keydown.enter="openResults"
                        @keydown.escape="searchOverlayDisable"
                        ref="searchInput"
                    />
                    <router-link :to="searchText ? { name: 'searchResults', query: { text: this.searchText } } : ''">
                        <button
                            class="search-box__btn"
                            ref="searchButton"
                            @click="searchOverlayDisable(), addHistoryQuery(searchText)"
                        ></button>
                    </router-link>
                </div>
                <div class="search-recent">
                    <div class="recent-btns" v-if="!randomQueries.length && !historyQueries.length">
                        <button class="recent__btn recent__btn--empty">&nbsp;</button>
                    </div>
                    <div class="recent-btns" v-else>
                        <button
                            class="recent__btn"
                            v-show="!historyQueries.length"
                            v-for="query in randomQueries"
                            :key="query"
                            :title="query"
                            @click="recentButtonActions(query)"
                        >
                            {{ query }}
                        </button>
                        <button
                            class="recent__btn"
                            v-show="historyQueries.length"
                            v-for="query in historyQueries"
                            :key="query"
                            :title="query"
                            @click="recentButtonActions(query)"
                        >
                            {{ query }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="search-btns">
                <router-link :to="{ name: 'favourite' }" class="search__btn favourite__btn">
                    <img :src="require('@/assets/icons/favourite.svg')" alt="" class="search-btn__icon--favourite" />
                </router-link>
                <button
                    class="search__btn history__btn"
                    @click="
                        popupActive = true;
                        popupActiveTimer = null;
                    "
                >
                    <img :src="require('@/assets/icons/history.svg')" alt="" class="search-btn__icon--history" />
                </button>
                <history-popup :popup-active-timer="popupActiveTimer" @popup-active="changePopupActive"></history-popup>
            </div>
        </div>
        <search-overlay></search-overlay>
    </header>
</template>
<script>
import { computed } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import SearchOverlay from "./SearchOverlay.vue";
import HistoryPopup from "./HistoryPopup.vue";
export default {
    components: { SearchOverlay, HistoryPopup },
    data() {
        return {
            popupActive: false,
            popupActiveTimer: null,
        };
    },
    provide() {
        return {
            popupActive: computed(() => this.popupActive),
        };
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        ...mapMutations(["searchOverlayDisable", "searchOverlayEnable", "changeSearchLogoScroll", "changeSearchText"]),
        ...mapActions(["updateSearchText", "getRandomQueries", "addHistoryQuery"]),
        setSearchText(event) {
            if (event.target.value.startsWith(" ")) {
                event.target.value = "";
            }
            this.updateSearchText(event.target.value.trim());
        },
        setSearchButton() {
            const btn = this.$refs.searchButton;
            const input = this.$refs.searchInput;
            if (this.searchOverlayActive) {
                btn.classList.add("search-box__btn--active");
                btn.innerHTML = `Найти`;
                input.style.paddingRight = "140px";
            } else {
                btn.classList.remove("search-box__btn--active");
                btn.innerHTML = `<img src="${require("@/assets/icons/search.svg")}" alt="Найти" class="search__icon" />`;
                input.style.paddingRight = "55px";
            }
        },
        openResults() {
            this.$refs.searchButton.click();
            this.$refs.searchInput.blur();
        },
        handleScroll() {
            if (window.scrollY > 0) {
                document.querySelector(".header").classList.add("header--scroll");
                if (window.scrollY > 80) {
                    this.changeSearchLogoScroll(true);
                    document.querySelector(".search__logo").classList.add("search__logo--scroll");
                    document.querySelector(".extra").classList.add("extra--scroll");
                    document.querySelector(".search-recent").classList.add("search-recent--scroll");
                }
            } else {
                this.changeSearchLogoScroll(false);
                document.querySelector(".header").classList.remove("header--scroll");
                document.querySelector(".search__logo").classList.remove("search__logo--scroll");
                document.querySelector(".extra").classList.remove("extra--scroll");
                document.querySelector(".search-recent").classList.remove("search-recent--scroll");
            }
            if (this.popupActive && !this.popupActiveTimer) {
                this.popupActiveTimer = setTimeout(() => {
                    this.popupActive = false;
                }, 1000);
            }
        },
        changePopupActive(value) {
            this.popupActive = value;
            this.popupActiveTimer = null;
        },
        recentButtonActions(query) {
            this.changeSearchText(query);
            this.searchOverlayEnable();
            this.$nextTick(() => {
                this.$refs.searchInput.focus();
            });
        },
    },
    computed: {
        ...mapGetters(["searchText", "searchOverlayActive", "historyQueries", "randomQueries"]),
    },
    watch: {
        searchOverlayActive() {
            this.setSearchButton();
        },
    },
    mounted() {
        this.setSearchButton();
    },
};
</script>
<style lang="css">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.header {
    margin-bottom: 45px;
    padding: 30px 0;
    padding-bottom: 15px;
    background-color: rgba(255, 255, 255, 1);
    /* backdrop-filter: blur(10px); */
    width: 100%;
    z-index: 6;
    position: sticky;
    top: -15px;
    transition: box-shadow 0.2s ease;
    width: 100vw;
}

.header--scroll {
    box-shadow: 0px -5px 40px rgba(86, 128, 233, 0.5);
}

.search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 29px;
}

.search__logo {
    z-index: 7;
    max-width: 134px;
    transition: all 0.3s ease;
}

.search__logo--scroll {
    max-width: 100px;
    /* transition: all 0.2s ease; */
}

.logo__img {
    max-width: 100%;
    transition: all 0.3s ease;
}

.search-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 15px;
}

.extra {
    height: 33px;
    transition: all 0.3s ease;
}

.extra--scroll {
    /* display: none; */
    height: 0;
    overflow: hidden;
}

.search-input {
    position: relative;
    z-index: 10;
}

.search-box__input {
    font-size: 20px;
    font-weight: 600;
    width: 100%;
    padding: 8px 55px 8px 25px;
    background-color: #ffffff;
    border: 4px solid #5680e9;
    border-radius: 50vmin;
    outline: none;
    /* caret-color: #5680E9; */
}

.search-box__input::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: url("@/assets/icons/cancel.svg") center no-repeat;
    background-size: contain;
    cursor: pointer;
    margin-left: 10px;
}

.search-box__input:focus {
    outline: none;
}

.search-box__input::placeholder {
    text-align: center;
}

.search-box__btn {
    width: 52px;
    height: 52px;
    background-color: #5680e9;
    border-radius: 50vmin;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: absolute;
    top: 0;
    right: 0;
}

.search-box__btn--active {
    width: auto;
    background-color: #5680e9;
    padding: 18px 37px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
}

.search__icon {
}

.search-recent {
    z-index: 7;
    max-height: 35px;
    transition: all 0.3s ease;
}

.search-recent--scroll {
    /* display: none; */
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease;
}

.recent-btns {
    display: flex;
    gap: 10px;
    position: relative;
}

.recent__btn {
    padding: 10px 15px;
    background: rgba(86, 128, 233, 0.3);
    border-radius: 50vmin;
    font-size: 16px;
    font-weight: 300;
    line-height: 85%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 225px;
}

.recent__btn--empty {
    visibility: hidden;
    opacity: 0;
}

.search-btns {
    display: flex;
    align-items: flex-start;
    gap: 30px;
}

.search__btn {
    width: 52px;
    height: 52px;
    background-color: #5680e9;
    border-radius: 50vmin;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 8;
}

.search-btn__icon--favourite {
    padding-top: 2px;
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