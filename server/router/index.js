const { Router } = require("express");
const productController = require("../controllers/product-controller");
const pharmacyController = require("../controllers/pharmacy-controller");
const stockController = require("../controllers/stock-controller");

const router = new Router();

router.get("/products", stockController.getAllProducts);
router.get("/products/:id", productController.getProduct);
router.get("/products/:id/forms", stockController.getProductForms);
router.get("/products/:id/analogs", stockController.getProductAnalogs);
router.get("/products/:id/synonims", stockController.getProductSynonims);
router.get("/products/:id/stocks", stockController.getProductStocks);

router.get("/search", stockController.search);

router.get("/pharmacies/:id/pricelist", stockController.getPharmacyPricelist);

module.exports = router;
