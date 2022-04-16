const { Schema, model } = require('mongoose')



const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    login: {
        type: String,
        default: "User"
    },
    products: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    pharmacies: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    searches: {
        type: [String],
        trim: true,
        validate: [searchLimit, '{PATH} exceeds the limit of 5']
    }
}, { timestamps: true })

function searchLimit(value) {
    return value.length <= 5
}

module.exports = model('User', UserSchema)