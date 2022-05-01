const stockService = require("../services/stock-service");

class PharmacyController {
    async pricelist(req, res, next) {
        try {
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PharmacyController();
