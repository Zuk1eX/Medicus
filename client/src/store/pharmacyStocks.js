import axios from "axios";

export default {
    state: {
        pharmacyStocksData: { stocks: [], total: { stocksCount: 0 } },
        loadingPharmacyStocksData: true,
    },
    getters: {
        pharmacyStocksData(state) {
            return state.pharmacyStocksData;
        },
        loadingPharmacyStocksData(state) {
            return state.loadingPharmacyStocksData;
        },
    },
    mutations: {
        setPharmacyStocksData(state, data) {
            state.pharmacyStocksData = data;
        },
        clearPharmacyStocksData(state) {
            state.pharmacyStocksData.stocks.length = 0;
            state.pharmacyStocksData.total.stocksCount = 0;
        },
        changeLoadingPharmacyStocksData(state, value) {
            state.loadingPharmacyStocksData = value;
        },
    },
    actions: {
        async getPharmacyStocksDataAPI({ commit }, pharmacyId) {
            commit("changeLoadingPharmacyStocksData", true);
            try {
                const stocks = await axios.get(`/pharmacies/${pharmacyId}/pricelist`);
                commit("setPharmacyStocksData", stocks.data);
                commit("changeLoadingPharmacyStocksData", false);
                return stocks.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
