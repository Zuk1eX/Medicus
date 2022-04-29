const Fuse = require("fuse.js");

const productModel = require("../models/product-model");
const productDto = require("../dtos/product-dto");
const stockService = require("./stock-service");
const stockModel = require("../models/stock-model");

class ProductService {
    async searchByTitle(text, limit) {
        const options = {
            treshold: 0.5,
            keys: ["title"],
        };
        const products = await productModel.find();
        const productsInformation = [];
        products.forEach((product) => {
            productsInformation.push({ ...new productDto(product) });
        });
        const fuseSearch = new Fuse(products, options);
        const resultProducts = fuseSearch.search(text).slice(0, limit);

        const productsIds = resultProducts.map((item) =>
            item.item._id.toString()
        );
        let productsInfo = [];
        for (let id of productsIds) {
            const allPharmaciesCount = await stockModel.count({ product: id });
            const prices = await stockService.getMinMaxPrices(id);
            const product = productsInformation.filter(
                (item) => item.id === id
            )[0];
            productsInfo.push({
                ...product,
                allPharmaciesCount,
                ...prices,
            });
            // const minPrice = await stockService.getSpecificPrice(id, "min");
            // const maxPrice = await stockService.getSpecificPrice(id, "max");
            // productsInfo.push({
            //     id,
            //     allPharmaciesCount,
            //     minPrice,
            //     maxPrice,
            // });
        }

        return productsInfo;
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (e) {
            return null;
        }
    }

    async getAllProducts(limit, page, sort, direction) {
        const products = await productModel
            .find()
            .sort({ [sort]: direction })
            .limit(limit)
            .skip(page * limit);
        return products;
    }

    async getAnalogs(pharmgroup) {
        const products = await productModel.find({ pharmgroup });
        return products;
    }

    async getSynonims(inn) {
        const products = await productModel.find({ inn });
        return products;
    }

    async getForms(title, vendor, sort, direction) {
        console.log(arguments)
        const products = await productModel
            .find({
                title,
                "vendor.title": vendor,
            })
            .sort({ [sort]: direction });
        return products;
    }
}

module.exports = new ProductService();
