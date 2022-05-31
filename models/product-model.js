const { Schema, model } = require("mongoose");

const vendorSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const ProductSchema = new Schema(
    {
        barcode: {
            type: String,
            required: true,
            unique: true,
            maxlength: 13,
        },
        title: {
            type: String,
            required: true,
            index: true,
            text: true,
        },
        form: {
            type: String,
            required: true,
        },
        dosage: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            default: "1 шт.",
        },
        vendor: {
            type: vendorSchema,
            required: true,
        },
        inn: {
            type: String,
            default: "",
        },
        pharmgroup: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "https://imgholder.ru/512*512/8493a8/adb9ca&text=512x512",
        },
        views: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 5.0,
        },
    },
    { timestamps: true }
);

module.exports = model("Product", ProductSchema);
