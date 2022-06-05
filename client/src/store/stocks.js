import axios from "axios";

export default {
    state: {
        stocksData: { stocks: [], total: { stocksCount: 0, minPrice: 0, maxPrice: 0 } },
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
        pushStocksData(state, data) {
            state.stocksData.stocks.push(...data);
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
        async getStocksDataAPI({ commit }, params) {
            commit("changeLoadingStocksData", true);
            try {
                const stocks = await axios.get(`/products/${params[0]}/stocks`, {
                    params: params[1],
                });
                commit("setStocksData", stocks.data);
                commit("changeLoadingStocksData", false);
                return stocks.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        async getMoreStocksDataAPI({ commit }, params) {
            commit("changeLoadingStocksData", true);
            try {
                const stocks = await axios.get(`/products/${params[0]}/stocks`, {
                    params: params[1],
                });
                commit("pushStocksData", stocks.data.stocks);
                commit("changeLoadingStocksData", false);
                return stocks.data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};
