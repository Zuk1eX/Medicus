import axios from "axios";

export default {
    state: {
        searchProductsResults: { results: [], total: { resultsCount: 0 } },
        // loadingResults: true,
    },
    getters: {
        searchProductsResults(state) {
            return state.searchProductsResults;
        },
    },
    mutations: {
        setSearchProductsResults(state, value) {
            state.searchProductsResults = value;
        },
        clearSearchProductsResults(state) {
            state.searchProductsResults.results.length = 0;
            state.searchProductsResults.total.resultsCount = 0;
        },
    },
    actions: {
        async getSearchProductsResultsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get("/search", {
                    params
                });
                commit("setSearchProductsResults", products.data);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};
