export default {
    state: {
        favouriteProducts: [],
    },
    getters: {
        favouriteProducts(state) {
            return state.favouriteProducts;
        },
        checkFavouriteProduct: (state) => (product) => {
            return state.favouriteProducts.find((item) => item === product);
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
    },
};
