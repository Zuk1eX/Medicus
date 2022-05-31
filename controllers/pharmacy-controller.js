const pharmacyService = require("../services/pharmacy-service");

class PharmacyController {
    async getPharmacy(req, res, next) {
        try {
            const pharmacyId = req.params.id;
            const pharmacyData = await pharmacyService.getPharmacyById(
                pharmacyId
            );
            if (!pharmacyData) {
                return res
                    .status(404)
                    .json({ Error: "pharmacy with this ID not found" });
            }
            return res.json(pharmacyData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PharmacyController();
