export default {
    state: {
        favouritePharmacies: [],
    },
    getters: {
        favouritePharmacies(state) {
            return state.favouritePharmacies;
        },
        checkFavouritePharmacy: (state) => (pharmacy) => {
            return state.favouritePharmacies.find((item) => item === pharmacy);
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
    },
};
