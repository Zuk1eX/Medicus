import axios from "axios";

export default {
    state: {
        searchProductsOverlay: { results: [], total: { resultsCount: 0 } },
        loadingOverlay: true,
    },
    getters: {
        searchProductsOverlay(state) {
            return state.searchProductsOverlay;
        },
        loadingOverlay(state) {
            return state.loadingOverlay;
        },
    },
    mutations: {
        setSearchProductsOverlay(state, value) {
            state.searchProductsOverlay = value;
        },
        clearSearchProductsOverlay(state) {
            state.searchProductsOverlay.results.length = 0;
            state.searchProductsOverlay.total.resultsCount = 0;
        },
        changeLoadingOverlay(state, value) {
            state.loadingOverlay = value;
        },
    },
    actions: {
        async getSearchProductsOverlayAPI({ commit }, params) {
            commit("changeLoadingOverlay", true);
            try {
                const products = await axios.get("/search", {
                    params
                });
                commit("setSearchProductsOverlay", products.data);
                commit("changeLoadingOverlay", false);
                return products.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};
