import axios from "axios";

export default {
    state: {
        favouritePharmacies: [],
        favouritePharmaciesData: {},
        loadingFavouritePharmaciesData: true,
    },
    getters: {
        favouritePharmacies(state) {
            return state.favouritePharmacies;
        },
        favouritePharmaciesData(state) {
            return state.favouritePharmaciesData;
        },
        checkFavouritePharmacy: (state) => (pharmacy) => {
            return state.favouritePharmacies.find((item) => item === pharmacy);
        },
        loadingFavouritePharmaciesData(state) {
            return state.loadingFavouritePharmaciesData;
        },
    },
    mutations: {
        setFavouritePharmacies(state, pharmacies) {
            state.favouritePharmacies = pharmacies;
        },
        pushFavouritePharmacy(state, pharmacy) {
            state.favouritePharmacies.push(pharmacy);
        },
        deleteFavouritePharmacy(state, pharmacy) {
            state.favouritePharmacies = state.favouritePharmacies.filter((item) => item !== pharmacy);
        },
        setFavouritePharmaciesData(state, pharmacies) {
            state.favouritePharmaciesData = pharmacies;
        },
        changeLoadingFavouritePharmaciesData(state, value) {
            state.loadingFavouritePharmaciesData = value;
        },
    },
    actions: {
        addFavouritePharmacy({ commit, state }, pharmacy) {
            commit("pushFavouritePharmacy", pharmacy);
            localStorage.favouritePharmacies = JSON.stringify(state.favouritePharmacies);
        },
        removeFavouritePharmacy({ commit, state }, pharmacy) {
            commit("deleteFavouritePharmacy", pharmacy);
            localStorage.favouritePharmacies = JSON.stringify(state.favouritePharmacies);
        },
        async getFavouritePharmaciesDataAPI({ state, commit }) {
            commit("changeLoadingFavouritePharmaciesData", true);
            try {
                const pharmacies = await axios.post(`/pharmacies`, {
                    favouritePharmacies: state.favouritePharmacies,
                });
                commit("setFavouritePharmaciesData", pharmacies.data);
                commit("changeLoadingFavouritePharmaciesData", false);
                return pharmacies.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
