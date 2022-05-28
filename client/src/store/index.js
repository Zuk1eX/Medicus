import { createStore } from "vuex";
import axios from "axios";

import searchOverlay from "./searchOverlay";
import searchResults from "./searchResults";
import productActionResults from "./productActionResults";
import favouriteProducts from "./favouriteProducts";
import favouritePharmacies from "./favouritePharmacies";
import product from "./product";
import stocks from "./stocks";

axios.defaults.baseURL = "http://localhost:5000/api";

export default createStore({
    state: {
        searchOverlayActive: false,
        searchText: "",
        loadingState: true,
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
    },
    modules: {
        searchOverlay,
        searchResults,
        productActionResults,
        favouriteProducts,
        favouritePharmacies,
        product,
        stocks,
    },
});
