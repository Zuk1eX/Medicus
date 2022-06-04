import axios from "axios";

export default {
    state: {
        searchProductsResults: { results: [], total: { resultsCount: 0 } },
        searchedText: "",
        // loadingResults: true,
    },
    getters: {
        searchProductsResults(state) {
            return state.searchProductsResults;
        },
        searchedText(state) {
            return state.searchedText;
        },
    },
    mutations: {
        setSearchProductsResults(state, value) {
            state.searchProductsResults = value;
        },
        pushSearchProductsResults(state, value) {
            state.searchProductsResults.results.push(...value);
        },
        clearSearchProductsResults(state) {
            state.searchProductsResults.results.length = 0;
            state.searchProductsResults.total.resultsCount = 0;
        },
        setSearchedText(state, value) {
            state.searchedText = value;
        },
    },
    actions: {
        async getSearchProductsResultsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            commit("setSearchedText", params.text);
            try {
                const products = await axios.get("/search", {
                    params,
                });
                commit("setSearchProductsResults", products.data);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        async getMoreSearchProductsResultsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get("/search", {
                    params,
                });
                commit("pushSearchProductsResults", products.data.results);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};
