const stockService = require("../services/stock-service");

class StockController {
    async stocks(req, res, next) {
        try {
            const { productId } = req.query;
            const stocks = await stockService.getStocksByProductId(productId);
            return res.json(stocks);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new StockController();
