// module.exports = class ProductDto {
//     constructor(model) {
//         this.id = model._id;
//         this.title = model.title;
//         this.form = model.form;
//         this.dosage = model.dosage;
//         this.quantity = model.quantity;
//         this.fullTitle = `${model.title}, ${model.dosage}, ${model.form}, ${model.quantity}`;
//         this.imageUrl = model.imageUrl;
//         this.rating = model.rating;
//         this.allPharmacies = model;
//         this.favouritePharmacies = model;
//         this.minPrice = model;
//         this.maxPrice = model;
//         this.avgPrice = model;
//     }
// };

module.exports = class ProductDto {
    constructor(model) {
        this._id = model._id.toString();
        this.fullTitle = `${model.title}, ${model.dosage}, ${model.form}, ${model.quantity}`;
        this.title = model.title;
        this.form = model.form;
        this.dosage = model.dosage;
        this.quantity = model.quantity;
        this.fullVendor = `${model.vendor.title}, ${model.vendor.country}`;
        this.vendor = model.vendor;
        this.inn = model.inn;
        this.pharmgroup = model.pharmgroup;
        this.imageUrl = model.imageUrl;
        this.rating = model.rating;
        this.views = model.views;
    }
};
