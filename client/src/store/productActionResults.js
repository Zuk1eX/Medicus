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
        pushProductActionResults(state, value) {
            state.productActionResults.results.results.push(...value);
        },
        clearProductActionResults(state) {
            state.productActionResults.property = {};
            state.productActionResults.results.results.length = 0;
            state.productActionResults.results.total.resultsCount = 0;
        },
    },
    actions: {
        async getProductFormsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${params[0]}/forms`, {
                    params: params[1],
                });
                commit("setProductActionResults", products.data);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async getProductAnalogsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${params[0]}/analogs`, {
                    params: params[1],
                });
                commit("setProductActionResults", products.data);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async getProductSynonimsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${params[0]}/synonims`, {
                    params: params[1],
                });
                commit("setProductActionResults", products.data);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async getMoreProductFormsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${params[0]}/forms`, {
                    params: params[1],
                });
                commit("pushProductActionResults", products.data.results.results);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async getMoreProductAnalogsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${params[0]}/analogs`, {
                    params: params[1],
                });
                commit("pushProductActionResults", products.data.results.results);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async getMoreProductSynonimsAPI({ commit }, params) {
            commit("changeLoadingState", true);
            try {
                const products = await axios.get(`/products/${params[0]}/synonims`, {
                    params: params[1],
                });
                commit("pushProductActionResults", products.data.results.results);
                commit("changeLoadingState", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
