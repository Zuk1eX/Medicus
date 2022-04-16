const { Schema, model } = require('mongoose')



const locationSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

const scheduleSchema = new Schema({
    open: {
        type: String,
        required: true
    },
    close: {
        type: String,
        required: true
    }
})

const workingDaysSchema = new Schema({
    1: {
        type: scheduleSchema,
        required: true
    },
    2: {
        type: scheduleSchema,
        required: true
    },
    3: {
        type: scheduleSchema,
        required: true
    },
    4: {
        type: scheduleSchema,
        required: true
    },
    5: {
        type: scheduleSchema,
        required: true
    },
    6: {
        type: scheduleSchema,
        required: true
    },
    7: {
        type: scheduleSchema,
        required: true
    }
})

const PharmacySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    region: {
        type: String,
        default: 'Москва'
    },
    address: {
        type: String,
        required: true
    },
    metro: {
        type: Array,
        default: []
    },
    location: {
        type: locationSchema,
    },
    workingHours: {
        type: workingDaysSchema
    },
    phone: {
        type: String,
        required: true
    },
    site: {
        type: String
    },
    email: {
        type: String
    }
}, { timestamps: true })

module.exports = model('Pharmacy', PharmacySchema)