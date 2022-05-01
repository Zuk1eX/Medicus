const { Router } = require("express");
const productController = require("../controllers/product-controller");
const pharmacyController = require("../controllers/pharmacy-controller");
const stockController = require("../controllers/stock-controller");

const router = new Router();

router.get("/products", stockController.getAllProducts); //done
router.get("/products/:id", productController.getProduct); //done
router.get("/products/:id/forms", stockController.getProductForms); //done
router.get("/products/:id/analogs", stockController.getProductAnalogs); //done
router.get("/products/:id/synonims", stockController.getProductSynonims); //done
router.get("/products/:id/stocks", stockController.getProductStocks); //done

router.get("/search", stockController.search); //done

router.get("/pharmacies/:id/pricelist", stockController.getPharmacyPricelist); //done

router.get("/test", stockController.test);

module.exports = router;
