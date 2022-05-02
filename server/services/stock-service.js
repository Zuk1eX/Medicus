const { Types } = require("mongoose");
const Fuse = require("fuse.js");
const stockModel = require("../models/stock-model");
const uniStocksService = require("./uni-stocks-service");

const stocksResultsProject = [
    {
        $project: {
            _id: 1,
            fullTitle: {
                $concat: [
                    "$title",
                    ", ",
                    "$form",
                    ", ",
                    "$dosage",
                    ", ",
                    "$quantity",
                ],
            },
            fullVendor: {
                $concat: ["$vendor.title", ", ", "$vendor.country"],
            },
            imageUrl: 1,
            rating: 1,
            minPrice: 1,
            stocksCount: { $add: ["$stocksCount", -1] },
        },
    },
];

class StockService {
    async getAllStocks(sort, direction, limit, offset) {
        const stocks = await uniStocksService.stocksAggregateProduct().facet({
            results: [
                { $sort: { [sort]: direction } },
                ...stocksResultsProject,
                { $skip: offset },
                { $limit: limit },
            ],
            total: [
                {
                    $count: "resultsCount",
                },
            ],
        });
        return stocks;
    }

    async getAllStocksByQuery(text, sort, direction, limit, offset) {
        const fuseOptions = {
            treshold: 0.5,
            keys: ["title"],
        };
        const stocks = await uniStocksService
            .stocksAggregateProduct()
            .sort({ [sort]: direction })
            .project({
                _id: 1,
                title: 1,
                description: {
                    $concat: ["$form", ", ", "$dosage", ", ", "$quantity"],
                },
                imageUrl: 1,
                minPrice: 1,
                maxPrice: 1,
                stocksCount: { $add: ["$stocksCount", -1] },
            });
        const fuseSearch = new Fuse(stocks, fuseOptions);
        const resultStocks = fuseSearch.search(text);
        const limitedResultStocks = resultStocks.slice(offset, offset + limit);
        return [
            {
                results: limitedResultStocks,
                total: { resultsCount: resultStocks.length },
            },
        ];
    }

    async getAllStocksByTitleVendor(
        title,
        vendor,
        sort,
        direction,
        limit,
        offset
    ) {
        const stocks = await uniStocksService.stocksAggregateProduct().facet({
            results: [
                {
                    $match: {
                        title: title,
                        "vendor.title": vendor,
                    },
                },
                { $sort: { [sort]: direction } },
                ...stocksResultsProject,
                { $skip: offset },
                { $limit: limit },
            ],
            total: [
                {
                    $match: {
                        title: title,
                        "vendor.title": vendor,
                    },
                },
                { $count: "resultsCount" },
            ],
        });
        return stocks;
    }

    async getAllStocksByPharmgroup(pharmgroup, sort, direction, limit, offset) {
        const stocks = await uniStocksService.stocksAggregateProduct().facet({
            results: [
                {
                    $match: {
                        pharmgroup: pharmgroup,
                    },
                },
                { $sort: { [sort]: direction } },
                {
                    $project: {
                        _id: 1,
                        fullTitle: {
                            $concat: [
                                "$title",
                                ", ",
                                "$form",
                                ", ",
                                "$dosage",
                                ", ",
                                "$quantity",
                            ],
                        },
                        fullVendor: {
                            $concat: ["$vendor.title", ", ", "$vendor.country"],
                        },
                        imageUrl: 1,
                        rating: 1,
                        minPrice: 1,
                        stocksCount: { $add: ["$stocksCount", -1] },
                    },
                },
                { $skip: offset },
                { $limit: limit },
            ],
            total: [
                {
                    $match: {
                        pharmgroup: pharmgroup,
                    },
                },
                { $count: "resultsCount" },
            ],
        });
        return stocks;
    }

    async getAllStocksByInn(inn, sort, direction, limit, offset) {
        const stocks = await uniStocksService.stocksAggregateProduct().facet({
            results: [
                {
                    $match: {
                        inn: inn,
                    },
                },
                { $sort: { [sort]: direction } },
                ...stocksResultsProject,
                { $skip: offset },
                { $limit: limit },
            ],
            total: [
                {
                    $match: {
                        inn: inn,
                    },
                },
                { $count: "resultsCount" },
            ],
        });
        return stocks;
    }

    async getAllStocksByPharmacyId(id, sort, direction, limit, offset) {
        const stocks = await stockModel
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
                    $group: {
                        _id: "$pharmacy._id",
                        title: { $first: "$pharmacy.title" },
                        region: { $first: "$pharmacy.region" },
                        address: { $first: "$pharmacy.address" },
                        metro: { $first: "$pharmacy.metro" },
                        location: { $first: "$pharmacy.location" },
                        workingHours: { $first: "$pharmacy.workingHours" },
                        phone: { $first: "$pharmacy.phone" },
                        site: { $first: "$pharmacy.site" },
                        email: { $first: "$pharmacy.email" },
                        stock: {
                            $push: {
                                $mergeObjects: [
                                    "$product",
                                    { price: "$price" },
                                    { isStocked: "$isStocked" },
                                    { isDiscounted: "$isDiscounted" },
                                ],
                            },
                        },
                    },
                },
                {
                    $set: {
                        stock: {
                            $sortArray: {
                                input: "$stock",
                                sortBy: { [sort]: direction },
                            },
                        },
                    },
                },
                { $unwind: "$stock" },
                {
                    $match: {
                        "pharmacy.title": { $ne: "admin" },
                        _id: Types.ObjectId(id),
                    },
                },
            ])
            .facet({
                pharmacy: [
                    {
                        $project: {
                            _id: 1,
                        },
                    },
                    { $limit: 1 },
                ],
                stocks: [
                    {
                        $project: {
                            _id: 0,
                            stock: 1,
                        },
                    },
                    { $skip: offset },
                    { $limit: limit },
                ],
                total: [{ $count: "stocksCount" }],
            });
        return stocks;
    }

    async getAllStocksByProductId(id, sort, direction, limit, offset) {
        const stocks = await uniStocksService.stocksByProductIdSort(
            id,
            sort,
            direction,
            limit,
            offset
        );
        return stocks;
    }

    stocksFilterEntry(id, sort, direction, limit, offset) {
        return uniStocksService.stocksByProductId(
            id,
            sort,
            direction,
            limit,
            offset
        );
    }

    stocksFilterMinPrice(stocksEntry, minPrice) {
        return stocksEntry.project({
            results: {
                $filter: {
                    input: "$results",
                    as: "stock",
                    cond: { $gte: ["$$stock.price", minPrice] },
                },
            },
        });
    }

    stocksFilterMaxPrice(stocksEntry, maxPrice) {
        return stocksEntry.project({
            results: {
                $filter: {
                    input: "$results",
                    as: "stock",
                    cond: { $lte: ["$$stock.price", maxPrice] },
                },
            },
        });
    }

    stocksFilterIsDiscounted(stocksEntry, isDiscounted) {
        return stocksEntry.project({
            results: {
                $filter: {
                    input: "$results",
                    as: "stock",
                    cond: { $eq: ["$$stock.isDiscounted", isDiscounted] },
                },
            },
        });
    }

    stocksFilterIs247(stocksEntry, is247) {
        return stocksEntry.project({
            results: {
                $filter: {
                    input: "$results",
                    as: "stock",
                    cond: {
                        $eq: ["$$stock.pharmacy.is247", is247],
                    },
                },
            },
        });
    }

    stocksFilterMetro(stocksEntry, metroArray) {
        return stocksEntry.project({
            results: {
                $filter: {
                    input: "$results",
                    as: "stock",
                    // cond: {
                    //     $in: [...metroArray, "$$stock.pharmacy.metro"],
                    // },
                    cond: {
                        $eq: [
                            {
                                $function: {
                                    body: `function (metroArr, metroArray) {
                                        return metroArray.some((elem) =>
                                            metroArr.includes(elem)
                                        );
                                    }`,
                                    args: [
                                        "$$stock.pharmacy.metro",
                                        metroArray,
                                    ],
                                    lang: "js",
                                },
                            },
                            true,
                        ],
                    },
                },
            },
        });
    }

    stocksFilterPharmacy(stocksEntry, pharmacy) {
        return stocksEntry.project({
            results: {
                $filter: {
                    input: "$results",
                    as: "stock",
                    cond: {
                        $regexMatch: {
                            input: "$$stock.pharmacy.title",
                            regex: pharmacy,
                            options: "i",
                        },
                    },
                },
            },
        });
    }

    async stocksFilterFinally(stocksEntry, sort, direction, limit, offset) {
        const stocks = await stocksEntry
            .append({
                $project: {
                    resultsRoot: { $setUnion: ["$results"] },
                },
            })
            .append({
                $unwind: "$resultsRoot",
            })
            .append({
                $replaceRoot: { newRoot: "$resultsRoot" },
            })
            .facet({
                results: [
                    { $sort: { [sort]: direction } },
                    { $skip: offset },
                    { $limit: limit },
                ],
                total: [{ $count: "stocksCount" }],
            });
        return stocks;
    }
}

module.exports = new StockService();
