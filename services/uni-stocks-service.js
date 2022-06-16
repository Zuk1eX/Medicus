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
                    "pharmacy.title": { $ne: "admin" },
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

    stocksByProductId(id, coords) {
        const stocksPipeline = [
            {
                $match: {
                    product: Types.ObjectId(id),
                    isStocked: true,
                },
            },

            // place for pharmacy lookup

            { $unwind: { path: "$pharmacy" } },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: { path: "$product" } },
            {
                $match: {
                    "pharmacy.title": { $ne: "admin" },
                },
            },
            {
                $project: {
                    _id: 1,
                    "pharmacy._id": 1,
                    "pharmacy.title": 1,
                    "pharmacy.fullAddress": {
                        $concat: [
                            "$pharmacy.region",
                            ", ",
                            "$pharmacy.address",
                        ],
                    },
                    "pharmacy.metro": 1,
                    "pharmacy.phone": 1,
                    "pharmacy.site": 1,
                    "pharmacy.email": 1,
                    "pharmacy.location": 1,
                    "pharmacy.workingHours": 1,
                    "pharmacy.is247": 1,
                    "pharmacy.imageUrl": 1,
                    "pharmacy.locationDescr": 1,
                    "pharmacy.link": 1,
                    "pharmacy.distance": 1,
                    isStocked: 1,
                    isDiscounted: 1,
                    price: 1,
                },
            },
            {
                $facet: {
                    results: [],
                },
            },
        ];

        if (coords) {
            stocksPipeline.splice(1, 0, {
                $lookup: {
                    from: "pharmacies",
                    let: { pharmacyId: "$pharmacy" },
                    pipeline: [
                        {
                            $geoNear: {
                                distanceField: "distance",
                                near: {
                                    type: "Point",
                                    coordinates: coords,
                                    spherical: true,
                                },
                            },
                        },
                        {
                            $match: {
                                $expr: { $eq: ["$$pharmacyId", "$_id"] },
                            },
                        },
                    ],
                    as: "pharmacy",
                },
            });
        } else {
            stocksPipeline.splice(1, 0, {
                $lookup: {
                    from: "pharmacies",
                    localField: "pharmacy",
                    foreignField: "_id",
                    as: "pharmacy",
                },
            });
        }

        return stockModel.aggregate(stocksPipeline);
    }
}

module.exports = new UniStocksService();
