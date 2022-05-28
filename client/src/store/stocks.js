import axios from "axios";

export default {
    state: {
        stocksData: { stocks: [], total: { stocksCount: 0 } },
        loadingStocksData: true,
    },
    getters: {
        stocksData(state) {
            return state.stocksData;
        },
        loadingStocksData(state) {
            return state.loadingStocksData;
        },
    },
    mutations: {
        setStocksData(state, data) {
            state.stocksData = data;
        },
        clearStocksData(state) {
            state.stocksData.stocks.length = 0;
            state.stocksData.total.stocksCount = 0;
        },
        changeLoadingStocksData(state, value) {
            state.loadingStocksData = value;
        },
    },
    actions: {
        async getStocksDataAPI({ commit }, productId) {
            commit("changeLoadingStocksData", true);
            try {
                const stocks = await axios.get(`/products/${productId}/stocks`);
                commit("setStocksData", stocks.data);
                commit("changeLoadingStocksData", false);
                return stocks.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};
