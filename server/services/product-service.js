const productModel = require("../models/product-model");
const productDto = require("../dtos/product-dto");

class ProductService {
    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (e) {
            return null;
        }
    }

    async getProductByIdFormat(id) {
        try {
            let product = await productModel.findById(id);
            product = new productDto(product);
            return product;
        } catch (e) {
            return null;
        }
    }

    async incrementField(id, field) {
        try {
            productModel.findByIdAndUpdate(
                { _id: id },
                { $inc: { [field]: 1 } },
                { new: true },
                function (err, res) {
                    return true;
                }
            );
        } catch (e) {
            return null;
        }
    }
}

module.exports = new ProductService();
