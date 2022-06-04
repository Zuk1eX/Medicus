export const nounMixin = {
    methods: {
        nounForm(number, words) {
            return words[
                number % 100 > 4 && number % 100 < 20
                    ? 2
                    : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
            ];
        },
    },
};

export const favouriteProductMixin = {
    methods: {
        toggleFavouriteProduct() {
            if (!this.favouriteProduct) {
                this.addFavouriteProduct(this.productData._id);
                return;
            }
            this.removeFavouriteProduct(this.productData._id);
        },
    },
    computed: {
        favouriteProduct() {
            return this.checkFavouriteProduct(this.productData._id) ?? false;
        },
    },
};

export const favouritePharmacyMixin = {
    methods: {
        toggleFavouritePharmacy() {
            if (!this.favouritePharmacy) {
                this.addFavouritePharmacy(this.pharmacyData._id);
                return;
            }
            this.removeFavouritePharmacy(this.pharmacyData._id);
        },
    },
    computed: {
        favouritePharmacy() {
            return this.checkFavouritePharmacy(this.pharmacyData._id) ?? false;
        },
    },
};

// export const historyQueriesMixin = {
//     methods: {
//         addHistoryQuery() {

//         }
//     }
// };
