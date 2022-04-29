const stockModel = require("../models/stock-model");
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

    async TEST_STOCKS(req, res, next) {
        try {
            const stocks = await stockModel
                // .find()
                // .populate(["product", "pharmacy"])
                .aggregate([
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
                    {
                        $addFields: {
                            title: "$product.title",
                            form: "$product.form",
                            dosage: "$product.dosage",
                            quantity: "$product.quantity",
                            vendor: "$product.vendor",
                            inn: "$product.inn",
                            pharmgroup: "$product.pharmgroup",
                            imageUrl: "$product.imageUrl",
                            views: "$product.views",
                            rating: "$product.rating",
                        },
                    },
                    {
                        $group: {
                            _id: "$product._id",

                            title: { $first: "$product.title" },
                            form: { $first: "$product.form" },
                            dosage: { $first: "$product.dosage" },
                            quantity: { $first: "$product.quantity" },
                            vendor: { $first: "$product.vendor" },
                            inn: { $first: "$product.inn" },
                            pharmgroup: { $first: "$product.pharmgroup" },
                            imageUrl: { $first: "$product.imageUrl" },
                            views: { $first: "$product.views" },
                            rating: { $first: "$product.rating" },

                            minPrice: { $min: "$price" },
                            maxPrice: { $max: "$price" },
                            avgPrice: { $avg: "$price" },
                            stocksCount: { $sum: 1 },
                        },
                    },
                    {
                        $facet: {
                            results: [
                                // { $skip: skipPage },
                                // { $limit: 1 },
                            ],
                            total: [
                                {
                                    $count: "resultsCount",
                                },
                            ],
                        },
                    },
                    // {
                    //     $project: {
                    //         product: "$_id",
                    //         _id: false,

                    //     },
                    // },
                    // {
                    //     $project: {
                    //         title: "$product.title",
                    //         form: "$product.form",
                    //         dosage: "$product.dosage",
                    //         quantity: "$product.quantity",
                    //         vendor: "$product.vendor",
                    //         inn: "$product.inn",
                    //         pharmgroup: "$product.pharmgroup",
                    //         imageUrl: "$product.imageUrl",
                    //         views: "$product.views",
                    //         rating: "$product.rating",
                    //     },
                    // },
                    // { $count: "allStocksCount" },
                ]);
            return res.json(stocks);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new StockController();
