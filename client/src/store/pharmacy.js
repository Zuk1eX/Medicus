import axios from "axios";

export default {
    state: {
        pharmacyData: {},
        loadingPharmacyData: true,
    },
    getters: {
        pharmacyData(state) {
            return state.pharmacyData;
        },
        loadingPharmacyData(state) {
            return state.loadingPharmacyData;
        },
    },
    mutations: {
        setPharmacyData(state, data) {
            state.pharmacyData = data;
        },
        clearPharmacyData(state) {
            state.pharmacyData = {};
        },
        changeLoadingPharmacyData(state, value) {
            state.loadingPharmacyData = value;
        },
    },
    actions: {
        async getPharmacyDataAPI({ commit }, pharmacyId) {
            commit("changeLoadingPharmacyData", true);
            try {
                const pharmacy = await axios.get(`/pharmacies/${pharmacyId}`);
                commit("setPharmacyData", pharmacy.data);
                commit("changeLoadingPharmacyData", false);
                return pharmacy.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
