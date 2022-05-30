import axios from "axios";

export default {
    state: {
        productActionResults: { property: {}, results: { results: [], total: { resultsCount: 0 } } },
    },
    getters: {
        productActionResults(state) {
            return state.productActionResults;
        },
        productActionResultsProperty(state) {
            return state.productActionResults.property;
        },
        productActionResultsData(state) {
            return state.productActionResults.results;
        },
    },
    mutations: {
        setProductActionResults(state, value) {
            state.productActionResults = value;
        },
        clearProductActionResults(state) {
            state.productActionResults.property = {};
            state.productActionResults.results.results.length = 0;
            state.productActionResults.results.total.resultsCount = 0;
        },
    },
    actions: {
        async getProductFormsAPI({ commit }, productId, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${productId}/forms`, {
                    params,
                });
                commit("setProductActionResults", products.data);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async getProductAnalogsAPI({ commit }, productId, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${productId}/analogs`, {
                    params,
                });
                commit("setProductActionResults", products.data);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async getProductSynonimsAPI({ commit }, productId, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${productId}/synonims`, {
                    params,
                });
                commit("setProductActionResults", products.data);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
