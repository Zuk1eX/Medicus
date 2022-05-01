const Fuse = require("fuse.js");

const stockModel = require("../models/stock-model");
const stockService = require("../services/stock-service");
const productService = require("../services/product-service");

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

    async getAllProducts(req, res, next) {
        try {
            let {
                sort = "views",
                direction = "desc",
                limit = 16,
                page = 1,
            } = req.query;
            limit = +limit;
            page = +page;
            if (["views", "minPrice", "stocksCount"].includes(sort)) {
                direction = direction === "desc" ? -1 : 1;
                const products = await stockService.getAllStocks(
                    sort,
                    direction,
                    limit,
                    limit * (page - 1)
                );
                return res.json(products);
            }
            return res
                .status(400)
                .json({ Error: "Invalid query <sort> parameter" });
        } catch (e) {
            next(e);
        }
    }

    async search(req, res, next) {
        try {
            let {
                text,
                sort = "views",
                direction = "desc",
                limit = 5,
                page = 1,
            } = req.query;
            if (!text) {
                return res
                    .status(400)
                    .json({ Error: "Invalid query <text> parameter" });
            }
            limit = +limit;
            page = +page;
            if (["views", "minPrice", "stocksCount"].includes(sort)) {
                direction = direction === "desc" ? -1 : 1;
                const stocks = await stockService.getAllStocksByQuery(
                    text,
                    sort,
                    direction,
                    limit,
                    limit * (page - 1)
                );
                return res.json(stocks);
            }
            return res
                .status(400)
                .json({ Error: "Invalid query <sort> parameter" });
        } catch (e) {
            next(e);
        }
    }

    async getProductForms(req, res, next) {
        try {
            const productId = req.params.id;
            let {
                sort = "views",
                direction = "desc",
                limit = 16,
                page = 1,
            } = req.query;
            limit = +limit;
            page = +page;
            if (["views", "minPrice", "stocksCount"].includes(sort)) {
                direction = direction === "desc" ? -1 : 1;
                let productData = await productService.getProductById(
                    productId
                );
                if (!productData) {
                    return res
                        .status(404)
                        .json({ Error: "Product with this ID not found" });
                }
                const { title, vendor } = productData;
                productData = await stockService.getAllStocksByTitleVendor(
                    title,
                    vendor.title,
                    sort,
                    direction,
                    limit,
                    limit * (page - 1)
                );
                return res.json(productData);
            }
            return res
                .status(400)
                .json({ Error: "Invalid query <sort> parameter" });
        } catch (e) {
            next(e);
        }
    }

    async getProductAnalogs(req, res, next) {
        try {
            const productId = req.params.id;
            let {
                sort = "views",
                direction = "desc",
                limit = 16,
                page = 1,
            } = req.query;
            limit = +limit;
            page = +page;
            if (["views", "minPrice", "stocksCount"].includes(sort)) {
                direction = direction === "desc" ? -1 : 1;
                let productData = await productService.getProductById(
                    productId
                );
                if (!productData) {
                    return res
                        .status(404)
                        .json({ Error: "Product with this ID not found" });
                }
                const { pharmgroup } = productData;
                productData = await stockService.getAllStocksByPharmgroup(
                    pharmgroup,
                    sort,
                    direction,
                    limit,
                    limit * (page - 1)
                );
                return res.json(productData);
            }
            return res
                .status(400)
                .json({ Error: "Invalid query <sort> parameter" });
        } catch (e) {
            next(e);
        }
    }

    async getProductSynonims(req, res, next) {
        try {
            const productId = req.params.id;
            let {
                sort = "views",
                direction = "desc",
                limit = 16,
                page = 1,
            } = req.query;
            limit = +limit;
            page = +page;
            if (["views", "minPrice", "stocksCount"].includes(sort)) {
                direction = direction === "desc" ? -1 : 1;
                let productData = await productService.getProductById(
                    productId
                );
                if (!productData) {
                    return res
                        .status(404)
                        .json({ Error: "Product with this ID not found" });
                }
                const { inn } = productData;
                productData = await stockService.getAllStocksByInn(
                    inn,
                    sort,
                    direction,
                    limit,
                    limit * (page - 1)
                );
                return res.json(productData);
            }
            return res
                .status(400)
                .json({ Error: "Invalid query <sort> parameter" });
        } catch (e) {
            next(e);
        }
    }

    async getPharmacyPricelist(req, res, next) {
        try {
            const pharmacyId = req.params.id;
            let {
                sort = "views",
                direction = "desc",
                limit = 16,
                page = 1,
            } = req.query;
            limit = +limit;
            page = +page;
            if (["views", "price"].includes(sort)) {
                direction = direction === "desc" ? -1 : 1;
                const stocks = await stockService.getAllStocksByPharmacyId(
                    pharmacyId,
                    sort,
                    direction,
                    limit,
                    limit * (page - 1)
                );
                return res.json(stocks);
            }
            return res
                .status(400)
                .json({ Error: "Invalid query <sort> parameter" });
        } catch (e) {
            next(e);
        }
    }

    async getProductStocks(req, res, next) {
        try {
            const productId = req.params.id;
            let {
                sort = "price",
                direction = "desc",
                limit = 25,
                page = 1,
            } = req.query;
            limit = +limit;
            page = +page;
            if (["location", "price"].includes(sort)) {
                direction = direction === "desc" ? -1 : 1;
                const products = await stockService.getAllStocksByProductId(
                    productId,
                    sort,
                    direction,
                    limit,
                    limit * (page - 1)
                );
                return res.json(products);
            }
            return res
                .status(400)
                .json({ Error: "Invalid query <sort> parameter" });
        } catch (e) {
            next(e);
        }
    }

    async test(req, res, next) {
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
