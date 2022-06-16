const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
    type: {
        type: String,
        enum: ["Point"],
        default: "Point",
    },
    coordinates: {
        type: [Number],
        required: true,
    },
    link: {
        type: String,
    },
});

const scheduleSchema = new Schema({
    open: {
        type: String,
        required: true,
    },
    close: {
        type: String,
        required: true,
    },
});

const PharmacySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            default: "Москва",
        },
        address: {
            type: String,
            required: true,
        },
        metro: {
            type: Array,
            default: [],
        },
        location: {
            type: locationSchema,
            index: '2dsphere'
        },
        workingHours: {
            type: [scheduleSchema],
        },
        is247: {
            type: Boolean,
            default: function () {
                return this.workingHours[0].open == this.workingHours[0].close;
            },
        },
        phone: {
            type: String,
            required: true,
        },
        site: {
            type: String,
        },
        email: {
            type: String,
        },
        imageUrl: {
            type: String,
            default: "https://i.ibb.co/g90rTSp/picture.png",
        },
        locationDescr: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = model("Pharmacy", PharmacySchema);
