// const ApiError = require('../exceptions/api-error')


module.exports = function (err, req, res, next) {
    console.log(err)
    // if (err instanceof ApiError) {
    //     return res.status(err.status).json({messaage: err.message, errors: err.errors})
    // }
    return res.status(500).json({message: 'Specific error', error: err.message})
}