const { Schema, model } = require("mongoose");

const StockSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        pharmacy: {
            type: Schema.Types.ObjectId,
            ref: "Pharmacy",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        isStocked: {
            type: Boolean,
            default: true,
        },
        isDiscounted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = model("Stock", StockSchema);
