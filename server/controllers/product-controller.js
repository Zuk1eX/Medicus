const productService = require("../services/product-service");

class ProductController {
    async getProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const productData = await productService.getProductByIdFormat(
                productId
            );
            if (!productData) {
                return res
                    .status(404)
                    .json({ Error: "Product with this ID not found" });
            }
            return res.json(productData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductController();
