const { Types } = require("mongoose");
const pharmacyModel = require("../models/pharmacy-model");
const pharmacyDto = require("../dtos/pharmacy-dto");

class PharmacyService {
    async getPharmacyById(id) {
        try {
            let pharmacy = await pharmacyModel.findById(id);
            pharmacy = new pharmacyDto(pharmacy);
            return pharmacy;
        } catch (e) {
            return null;
        }
    }

    async getPharmaciesByIds(idsArray) {
        idsArray = idsArray.map((item) => {
            return Types.ObjectId(item);
        });
        let pharmacies = await pharmacyModel
            .aggregate([
                {
                    $match: {
                        _id: { $in: idsArray },
                        title: { $ne: "admin" },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        fullAddress: {
                            $concat: ["$region", ", ", "$address"],
                        },
                        fullMetro: {
                            $reduce: {
                                input: "$metro",
                                initialValue: "",
                                in: {
                                    $concat: [
                                        "$$value",
                                        {
                                            $cond: [
                                                { $eq: ["$$value", ""] },
                                                "",
                                                ", ",
                                            ],
                                        },
                                        "$$this",
                                    ],
                                },
                            },
                        },
                        imageUrl: 1,
                    },
                },
            ])
            .facet({
                results: [],
                total: [
                    {
                        $count: "resultsCount",
                    },
                ],
            });
        return [
            {
                results: pharmacies[0].results,
                total: pharmacies[0].total[0],
            },
        ];
    }
}

module.exports = new PharmacyService();
