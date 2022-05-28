const pharmacyModel = require("../models/pharmacy-model");
const pharmacyDto = require("../dtos/pharmacy-dto");

class PharmacyService {
    async getPharmacyById(id) {
        try {
            let pharmacy = await pharmacyModel.findById(id);
            pharmacy = new pharmacyDto(pharmacy);
            return pharmacy;
        } catch (e) {
            return null;
        }
    }
}

module.exports = new PharmacyService();
