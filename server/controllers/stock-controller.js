const stockService = require("../services/stock-service");
const productService = require("../services/product-service");

function isEmptyObject(obj) {
    for (let _ in obj) return false;
    return true;
}

function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

class StockController {
    async getAllProducts(req, res, next) {
        try {
            let {
                sort = "views",
                direction = "desc",
                limit = 12,
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
                return res.json(products[0]);
            }
            return res
                .status(400)
                .json({ Error: "Invalid query <sort> parameter" });
        } catch (e) {
            next(e);
        }
    }

    async getFavouriteProducts(req, res, next) {
        const idsArray = req.body.favouriteProducts;
        if (!idsArray) {
            return res
                .status(400)
                .json({ Error: "Array of favourite products is empty" });
        }
        try {
            const products = await stockService.getAllStocksByIds(idsArray);
            return res.json(products[0]);
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
                if (isNumber(text) && text.length == 13) {
                    const stock = await stockService.getStockByBarcode(text);
                    return res.json(stock[0]);
                }
                const stocks = await stockService.getAllStocksByQuery(
                    text,
                    sort,
                    direction,
                    limit,
                    limit * (page - 1)
                );
                return res.json(stocks[0]);
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
                limit = 12,
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
                return res.json({
                    property: { title, vendor: vendor.title },
                    results: productData[0],
                });
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
                limit = 12,
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
                return res.json({
                    property: { pharmgroup },
                    results: productData[0],
                });
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
                limit = 12,
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
                return res.json({
                    property: { inn },
                    results: productData[0],
                });
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
                limit = 12,
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
                return res.json(stocks[0]);
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
                direction = "asc",
                limit = 25,
                page = 1,
                ...filterArgs
            } = req.query;
            limit = +limit;
            page = +page;
            if (!["location", "price"].includes(sort)) {
                return res
                    .status(400)
                    .json({ Error: "Invalid query <sort> parameter" });
            }
            direction = direction === "asc" ? 1 : -1;
            let stocks = stockService.stocksFilterEntry(
                productId,
                sort,
                direction,
                limit,
                limit * (page - 1)
            );
            const checkArray = [
                "minPrice",
                "maxPrice",
                "metro",
                "is247",
                "isDiscounted",
                "pharmacy",
            ];
            const checkArgs = Object.keys(filterArgs).some((item) =>
                checkArray.includes(item)
            );
            if (!isEmptyObject(filterArgs) && checkArgs) {
                stocks = StockController.getProductStocksFilter(
                    stocks,
                    filterArgs
                );
            }
            stocks = await stockService.stocksFilterFinally(
                stocks,
                sort,
                direction,
                limit,
                limit * (page - 1)
            );
            return res.json(stocks[0]);
        } catch (e) {
            next(e);
        }
    }

    static getProductStocksFilter(stocks, filterArgs) {
        try {
            const { minPrice, maxPrice, metro, is247, isDiscounted, pharmacy } =
                filterArgs;
            if (+minPrice) {
                stocks = stockService.stocksFilterMinPrice(stocks, +minPrice);
            }
            if (+maxPrice) {
                stocks = stockService.stocksFilterMaxPrice(stocks, +maxPrice);
            }
            if (metro) {
                const metroArray = metro.split(";");
                stocks = stockService.stocksFilterMetro(stocks, metroArray);
            }
            if (!!is247) {
                stocks = stockService.stocksFilterIs247(
                    stocks,
                    !!parseInt(is247)
                );
            }
            if (!!isDiscounted) {
                stocks = stockService.stocksFilterIsDiscounted(
                    stocks,
                    !!parseInt(isDiscounted)
                );
            }
            if (!!pharmacy) {
                stocks = stockService.stocksFilterPharmacy(stocks, pharmacy);
            }
            return stocks;
        } catch (e) {
            throw e;
        }
    }

    // async getAllProductsBeginAlpha(req, res, next) {
    //     try {
    //         let {
    //             sort = "views",
    //             direction = "desc",
    //             limit = 12,
    //             page = 1,
    //         } = req.query;
    //         const alpha = req.params.alpha;
    //         limit = +limit;
    //         page = +page;
    //         if (["views", "minPrice", "stocksCount"].includes(sort) || !alpha) {
    //             direction = direction === "desc" ? -1 : 1;
    //             const products = await stockService.getAllStocksBeginAlpha(
    //                 alpha,
    //                 sort,
    //                 direction,
    //                 limit,
    //                 limit * (page - 1)
    //             );
    //             return res.json(products);
    //         }
    //         return res
    //             .status(400)
    //             .json({ Error: "Invalid query <sort> or <alpha> parameter" });
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

module.exports = new StockController();
