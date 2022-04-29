const { Types } = require("mongoose");
const stockModel = require("../models/stock-model");
const productModel = require("../models/product-model");
const pharmacyModel = require("../models/pharmacy-model");

class StockService {
    async getAllStocks() {}

    async getStocksByProductId(id) {
        // const stocks = await stockModel
        //     .find({ product: id })
        //     .populate(["pharmacy", "product"]);
        // return stocks;

        const stocks = await stockModel.aggregate([
            {
                $match: {
                    product: Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $lookup: {
                    from: "pharmacies",
                    localField: "pharmacy",
                    foreignField: "_id",
                    as: "pharmacy",
                },
            },
            { $unwind: { path: "$product" } },
            { $unwind: { path: "$pharmacy" } },
            // {
            //     $group: {
            //         _id: "$product._id",
            //         allPharmaciesCount: { $sum: 1 },
            //     },
            // },
        ]);
        return stocks;
    }

    async getStocksByPharmacyId(id) {}

    async getAllPharmaciesCount(id) {
        const allPharmaciesCount = await stockModel.count({ product: id });
        return allPharmaciesCount;
    }

    async getSpecificPrice(id, spec = "min") {
        const sorter = spec === "max" ? -1 : 1;
        const price = await stockModel
            .findOne({ product: id }, { price: 1, _id: 0 })
            .sort({ price: sorter });
        return price?.price ?? null;
    }

    async getMinMaxPrices(id) {
        const prices = await stockModel
            .find({ product: id }, { price: 1, _id: 0 })
            .sort({ price: 1 });
        return {
            minPrice: prices[0]?.price ?? null,
            maxPrice: prices.slice(-1)[0]?.price ?? null,
        };
    }
}

module.exports = new StockService();
