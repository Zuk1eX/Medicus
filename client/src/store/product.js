import axios from "axios";

export default {
    state: {
        productData: {},
        loadingProductData: true,
    },
    getters: {
        productData(state) {
            return state.productData;
        },
        loadingProductData(state) {
            return state.loadingProductData;
        },
    },
    mutations: {
        setProductData(state, data) {
            state.productData = data;
        },
        clearProductData(state) {
            state.productData = {};
        },
        changeLoadingProductData(state, value) {
            state.loadingProductData = value;
        },
    },
    actions: {
        async getProductDataAPI({ commit }, productId) {
            commit("changeLoadingProductData", true);
            try {
                const product = await axios.get(`/products/${productId}`);
                commit("setProductData", product.data);
                commit("changeLoadingProductData", false);
                return product.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async incrementProductViews({ commit }, productId) {
            try {
                await axios.patch(`/products/${productId}/views`);
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
