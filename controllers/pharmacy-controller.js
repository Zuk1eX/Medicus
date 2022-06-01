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

    async getFavouritePharmacies(req, res, next) {
        const idsArray = req.body.favouritePharmacies;
        if (!idsArray) {
            return res
                .status(400)
                .json({ Error: "Array of favourite pharmacies is empty" });
        }
        try {
            const pharmacies = await pharmacyService.getPharmaciesByIds(
                idsArray
            );
            return res.json(pharmacies[0]);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PharmacyController();
