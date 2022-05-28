module.exports = class PharmacyDto {
    constructor(model) {
        this._id = model._id.toString();
        this.title = model.title;
        this.fullAddress = model.form;
        this.region = model.region;
        this.address = model.address;
        this.fullMetro = model.metro.join(", ");
        this.location = model.location;
        this.workingHours = model.workingHours;
        this.is247 = model.is247;
        this.phone = model.phone;
        this.site = model.site;
        this.email = model.email;
    }
};
