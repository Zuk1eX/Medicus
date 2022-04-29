const { Router } = require("express");
const productController = require("../controllers/product-controller");
const pharmacyController = require("../controllers/pharmacy-controller");
const stockController = require("../controllers/stock-controller");

// home-page: get /products?sort=popular
// search-box: get /products/search?text=отривин&limit=5
// search-results-page: get /products/search&text=отривин&limit=0
// product-page: get /products/product-:id, get /stocks/?productId=jhi3h46mkihi3j
// product-forms-page: get /products/product-:id/forms
// product-analogs-page: get /products/product-:id/analogs
// product-synonims-page: get /products/product-:id/synonims

// MainPage = {
//     components: [ SearchBox (Vuex [default/mini]), (SectionSlider)x2 ],
//     queries: [ GET ]
// }

// SearchBox = { <...> + SearchOverlay (Vuex [on/off]) }
// SearchOverlay = { <...> + SearchOverlayContainer }
// SearchOverlayContainer = { OverlayProductCard / OverlayProductCardSceleton }
// SectionSlider = { SectionTitle + <...> + (ProductCard)x4(min) }

const router = new Router();

router.get("/", (req, res) => {
    res.json({ message: "hello" });
});

router.get("/pharmacies");
router.get("/pharmacies/:id");

router.get("/products", productController.products);
router.get("/products/product-:id", productController.product);
router.get("/products/product-:id/forms", productController.forms);
router.get("/products/product-:id/analogs", productController.analogs);
router.get("/products/product-:id/synonims", productController.synonims);

router.get("/stocks", stockController.stocks);

router.get("/search", productController.search);

router.get("/test", stockController.TEST_STOCKS);

module.exports = router;
