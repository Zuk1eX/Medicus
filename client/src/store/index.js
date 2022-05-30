import { createStore } from "vuex";
import axios from "axios";

import searchOverlay from "./searchOverlay";
import searchResults from "./searchResults";
import productActionResults from "./productActionResults";
import favouriteProducts from "./favouriteProducts";
import favouritePharmacies from "./favouritePharmacies";
import product from "./product";
import stocks from "./stocks";
import pharmacy from "./pharmacy";
import pharmacyStocks from "./pharmacyStocks";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

(async () => {
    await fetch("http://localhost:5000/csrf", {
        credentials: "include",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            document.cookie = `CSRF-Token=${data.csrfToken};path=/`;
            axios.defaults.headers.common["CSRF-Token"] = data.csrfToken;
        });
})();

export default createStore({
    state: {
        searchOverlayActive: false,
        searchText: "",
        loadingState: true,
        productsPopular: [],
    },
    getters: {
        searchOverlayActive(state) {
            return state.searchOverlayActive;
        },
        searchText(state) {
            return state.searchText;
        },
        loadingState(state) {
            return state.loadingState;
        },
        productsPopular(state) {
            return state.productsPopular;
        },
    },
    mutations: {
        searchOverlayEnable(state) {
            state.searchOverlayActive = true;
        },
        searchOverlayDisable(state) {
            state.searchOverlayActive = false;
        },
        changeSearchText(state, value) {
            state.searchText = value;
        },
        changeLoadingState(state, value) {
            state.loadingState = value;
        },
        setProductsPopular(state, value) {
            state.productsPopular = value;
        },
    },
    actions: {
        updateSearchText({ state, commit }, value) {
            commit("changeSearchText", value);
            if (state.searchText) {
                commit("searchOverlayEnable");
            } else {
                commit("searchOverlayDisable");
            }
        },
        async getProductsPopularAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get("/products", {
                    params,
                });
                commit("setProductsPopular", products.data.results);
                commit("changeLoadingState", false);
                return products.data.results;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
    modules: {
        searchOverlay,
        searchResults,
        productActionResults,
        favouriteProducts,
        favouritePharmacies,
        product,
        stocks,
        pharmacy,
        pharmacyStocks,
    },
});
