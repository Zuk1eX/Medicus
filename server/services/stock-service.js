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
            // views: 1,
            stocksCount: { $add: ["$stocksCount", -1] },
        },
    },
];

const stocksResultsFullProject = {
    _id: 1,
    barcode: 1,
    title: 1,
    description: {
        $concat: ["$form", ", ", "$dosage", ", ", "$quantity"],
    },
    fullTitle: {
        $concat: ["$title", ", ", "$form", ", ", "$dosage", ", ", "$quantity"],
    },
    fullVendor: {
        $concat: ["$vendor.title", ", ", "$vendor.country"],
    },
    rating: 1,
    imageUrl: 1,
    minPrice: 1,
    maxPrice: 1,
    stocksCount: { $add: ["$stocksCount", -1] },
};

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
        // return stocks;
        return [
            {
                results: stocks[0].results,
                total: stocks[0].total[0],
            },
        ];
    }

    async getAllStocksByIds(idsArray) {
        idsArray = idsArray.map((item) => {
            return Types.ObjectId(item);
        });
        const stocks = await uniStocksService.stocksAggregateProduct().facet({
            results: [
                {
                    $match: {
                        _id: { $in: idsArray },
                    },
                },
                ...stocksResultsProject,
            ],
            total: [
                {
                    $match: {
                        _id: { $in: idsArray },
                    },
                },
                {
                    $count: "resultsCount",
                },
            ],
        });
        // return stocks;
        return [
            {
                results: stocks[0].results,
                total: stocks[0].total[0],
            },
        ];
    }

    // async getAllStocksBeginAlpha(alpha, sort, direction, limit, offset) {
    //     const match = new RegExp("^" + alpha + ".*", "i")
    //     console.log(match)
    //     const stocks = await uniStocksService.stocksAggregateProduct()
    //     .append({

    //                 $match: {
    //                     fullTitle: {
    //                                     $regex: /^О.*/ui,
    //                                 },
    //                 }
    //                 // $regexMatch: {
    //                 //     input: 'fullTitle',
    //                 //     regex: match
    //                 // }

    //     })
    //     .facet({
    //         results: [
    //             // {
    //             //     $match: {
    //             //         fullTitle: {
    //             //             $regex: /^О.*/ui,
    //             //         },
    //             //     },
    //             // },
    //             { $sort: { [sort]: direction } },
    //             ...stocksResultsProject,
    //             { $skip: offset },
    //             { $limit: limit },
    //         ],
    //         // total: [
    //         //     // {
    //         //         {$match: {
    //         //             fullTitle: {
    //         //                 $regex: new RegExp("^" + alpha + ".*", "i"),
    //         //             },
    //         //         },},
    //         //         {$count: "resultsCount",}
    //         //     // },
    //         // ],
    //     });
    //     return stocks;
    // }

    async getAllStocksByQuery(text, sort, direction, limit, offset) {
        const fuseOptions = {
            treshold: 0.5,
            keys: ["title"],
        };
        const stocks = await uniStocksService
            .stocksAggregateProduct()
            .sort({ [sort]: direction })
            .project(stocksResultsFullProject);
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

    async getStockByBarcode(barcode) {
        const stock = await uniStocksService
            .stocksAggregateProduct()
            .match({ barcode })
            .project(stocksResultsFullProject);
        return [
            {
                results: [{ item: stock[0] }],
                total: { resultsCount: stock.length },
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
        return [
            {
                results: stocks[0].results,
                total: stocks[0].total[0] ?? { resultsCount: 0 },
            },
        ];
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
        return [
            {
                results: stocks[0].results,
                total: stocks[0].total[0] ?? { resultsCount: 0 },
            },
        ];
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
        return [
            {
                results: stocks[0].results,
                total: stocks[0].total[0] ?? { resultsCount: 0 },
            },
        ];
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
                    $match: {
                        isStocked: true,
                    },
                },
                {
                    $group: {
                        _id: "$pharmacy._id",
                        // title: { $first: "$pharmacy.title" },
                        // region: { $first: "$pharmacy.region" },
                        // address: { $first: "$pharmacy.address" },
                        // metro: { $first: "$pharmacy.metro" },
                        // location: { $first: "$pharmacy.location" },
                        // workingHours: { $first: "$pharmacy.workingHours" },
                        // phone: { $first: "$pharmacy.phone" },
                        // site: { $first: "$pharmacy.site" },
                        // email: { $first: "$pharmacy.email" },
                        stocks: {
                            //     $push: {
                            //         $mergeObjects: [
                            //             "$product",

                            //             { price: "$price" },
                            //             { isStocked: "$isStocked" },
                            //             { isDiscounted: "$isDiscounted" },
                            //         ],
                            //     },
                            $push: {
                                $mergeObjects: [
                                    {
                                        _id: "$product._id",
                                        fullTitle: {
                                            $concat: [
                                                "$product.title",
                                                ", ",
                                                "$product.form",
                                                ", ",
                                                "$product.dosage",
                                                ", ",
                                                "$product.quantity",
                                            ],
                                        },
                                        fullVendor: {
                                            $concat: [
                                                "$product.vendor.title",
                                                ", ",
                                                "$product.vendor.country",
                                            ],
                                        },
                                        rating: "$product.rating",
                                        imageUrl: "$product.imageUrl",
                                        // stocksCount: '$product'
                                    },
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
                        stocks: {
                            $sortArray: {
                                input: "$stocks",
                                sortBy: { [sort]: direction },
                            },
                        },
                    },
                },
                // { $unwind: "$stock" },
                {
                    $match: {
                        "pharmacy.title": { $ne: "admin" },
                        _id: Types.ObjectId(id),
                    },
                },
                {
                    $set: {
                        stocksCount: {
                            $size: "$stocks",
                        },
                    },
                },
            ])
            .facet({
                //     // pharmacy: [
                //     //     {
                //     //         $project: {
                //     //             _id: 1,
                //     //         },
                //     //     },
                //     //     { $limit: 1 },
                //     // ],
                stocks: [
                    {
                        $project: {
                            _id: 0,
                            stocks: 1,
                        },
                    },
                    { $skip: offset },
                    { $limit: limit },
                ],
                total: [
                    // { $count: "stocksCount" },
                    {
                        $project: {
                            _id: 0,
                            stocksCount: 1,
                        },
                    },
                ],
            });
        // return stocks;
        return [
            {
                // pharmacy: stocks.pharmacy,
                stocks: stocks[0].stocks[0]?.stocks ?? [],
                total: stocks[0].total[0] ?? { stocksCount: 0 },
            },
        ];
    }

    // async getAllStocksByProductId(id, sort, direction, limit, offset) {
    //     const stocks = await uniStocksService.stocksByProductIdSort(
    //         id,
    //         sort,
    //         direction,
    //         limit,
    //         offset
    //     );
    //     return stocks;
    // }

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
                min: [
                    { $sort: { price: 1 } },
                    { $limit: 1 },
                    { $project: { _id: 0, price: 1 } },
                ],
                max: [
                    { $sort: { price: -1 } },
                    { $limit: 1 },
                    { $project: { _id: 0, price: 1 } },
                ],
            });
        return [
            {
                stocks: stocks[0].results,
                total: {
                    stocksCount: stocks[0].total[0]?.stocksCount ?? 0,
                    minPrice: stocks[0].min[0]?.price ?? 0,
                    maxPrice: stocks[0].max[0]?.price ?? 0,
                },
            },
        ];
        // return stocks;
    }
}

module.exports = new StockService();
