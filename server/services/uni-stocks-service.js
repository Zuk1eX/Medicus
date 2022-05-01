const { Types } = require("mongoose");

const stockModel = require("../models/stock-model");

class UniStocksService {
    stocksAggregateProduct() {
        return stockModel.aggregate([
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
                    _id: "$product._id",
                    barcode: { $first: "$product.barcode" },

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
                    avgPrice: { $avg: "$price" },
                    maxPrice: { $max: "$price" },
                    stocksCount: { $sum: 1 },
                },
            },
        ]);
    }

    stocksAggregateProductWithStocks() {
        return stockModel.aggregate([
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
                    price: { $ne: null },
                },
            },
            {
                $group: {
                    _id: "$product._id",
                    barcode: { $first: "$product.barcode" },

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
                    avgPrice: { $avg: "$price" },
                    maxPrice: { $max: "$price" },
                    stocksCount: { $sum: 1 },
                },
            },
        ]);
    }

    // stocksAggregatePharmacy(id) {
    //     return stockModel.aggregate([
    //         {
    //             $lookup: {
    //                 from: "products",
    //                 localField: "product",
    //                 foreignField: "_id",
    //                 as: "product",
    //             },
    //         },
    //         {
    //             $lookup: {
    //                 from: "pharmacies",
    //                 localField: "pharmacy",
    //                 foreignField: "_id",
    //                 as: "pharmacy",
    //             },
    //         },
    //         { $unwind: { path: "$product" } },
    //         { $unwind: { path: "$pharmacy" } },
    //         {
    //             $group: {
    //                 _id: "$pharmacy._id",
    //                 pharmacy: { $first: "$pharmacy" },
    //                 stocks: {
    //                     $push: {
    //                         $mergeObjects: ["$product", { price: "$price" }],
    //                     },
    //                 },
    //                 stocksCount: { $sum: 1 },
    //             },
    //         },
    //         {
    //             $set: {
    //                 stocks: {
    //                     $sortArray: {
    //                         input: "$stocks",
    //                         sortBy: { [sort]: direction },
    //                     },
    //                 },
    //             },
    //         },
    //         {
    //             $match: {
    //                 "pharmacy.title": { $ne: "admin" },
    //                 _id: Types.ObjectId(id),
    //             },
    //         },
    //     ]);
    // }
}

module.exports = new UniStocksService();
