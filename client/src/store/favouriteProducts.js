import axios from "axios";

export default {
    state: {
        favouriteProducts: [],
        favouriteProductsData: {},
        loadingFavouriteProductsData: true,
    },
    getters: {
        favouriteProducts(state) {
            return state.favouriteProducts;
        },
        favouriteProductsData(state) {
            return state.favouriteProductsData;
        },
        checkFavouriteProduct: (state) => (product) => {
            return state.favouriteProducts.find((item) => item === product);
        },
        loadingFavouriteProductsData(state) {
            return state.loadingFavouriteProductsData;
        },
    },
    mutations: {
        setFavouriteProducts(state, products) {
            state.favouriteProducts = products;
        },
        pushFavouriteProduct(state, product) {
            state.favouriteProducts.push(product);
        },
        deleteFavouriteProduct(state, product) {
            state.favouriteProducts = state.favouriteProducts.filter((item) => item !== product);
        },
        setFavouriteProductsData(state, products) {
            state.favouriteProductsData = products;
        },
        changeLoadingFavouriteProductsData(state, value) {
            state.loadingFavouriteProductsData = value;
        },
    },
    actions: {
        addFavouriteProduct({ commit, state }, product) {
            commit("pushFavouriteProduct", product);
            localStorage.favouriteProducts = JSON.stringify(state.favouriteProducts);
        },
        removeFavouriteProduct({ commit, state }, product) {
            commit("deleteFavouriteProduct", product);
            localStorage.favouriteProducts = JSON.stringify(state.favouriteProducts);
        },
        async getFavouriteProductsDataAPI({ state, commit }) {
            commit("changeLoadingFavouriteProductsData", true);
            try {
                const products = await axios.post(`/products`, {
                    favouriteProducts: state.favouriteProducts,
                });
                commit("setFavouriteProductsData", products.data);
                commit("changeLoadingFavouriteProductsData", false);
                return products.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
