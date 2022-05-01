const productService = require("../services/product-service");
const stockService = require("../services/stock-service");

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

    

    // async search(req, res, next) {
    //     try {
    //         const { text, limit = 5 } = req.query;
    //         if (!text) {
    //             return res
    //                 .status(400)
    //                 .json({ message: "Invalid query parameter" });
    //         }
    //         const products = await productService.searchByTitle(text, limit);
    //         res.json(products);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // async product(req, res, next) {
    //     try {
    //         const id = req.params.id;
    //         const product = await productService.getProductById(id);
    //         if (!product) {
    //             return res.status(404).json({ message: "Product not found" });
    //         }
    //         return res.json(product);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // async products(req, res, next) {
    //     try {
    //         let {
    //             limit = 0,
    //             page = 1,
    //             sort = "views",
    //             direction = "desc",
    //         } = req.query;
    //         if (direction === "desc") {
    //             direction = -1;
    //         } else {
    //             direction = 1;
    //         }
    //         const products = await productService.getAllProducts(
    //             limit,
    //             page - 1,
    //             sort,
    //             direction
    //         );
    //         return res.json(products);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // async analogs(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         const product = await productService.getProductById(id);
    //         if (!product) {
    //             return res.status(404).json({ message: "Product not found" });
    //         }
    //         const analogs = await productService.getAnalogs(product.pharmgroup);
    //         return res.json(analogs);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // async synonims(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         const product = await productService.getProductById(id);
    //         if (!product) {
    //             return res.status(404).json({ message: "Product not found" });
    //         }
    //         const synonims = await productService.getSynonims(product.inn);
    //         return res.json(synonims);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // async forms(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         let { sort, direction } = req.query;
    //         direction = direction === "desc" ? -1 : 1;
    //         const product = await productService.getProductById(id);
    //         if (!product) {
    //             return res.status(404).json({ message: "Product not found" });
    //         }
    //         const forms = await productService.getForms(
    //             product.title,
    //             product.vendor.title,
    //             sort,
    //             direction
    //         );
    //         return res.json(forms);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

module.exports = new ProductController();
