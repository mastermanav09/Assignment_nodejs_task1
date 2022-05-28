const router = require("express").Router();
const productControllers = require("../controllers/product");

router.post("/add", productControllers.addProduct);
router.get("/getAllProducts", productControllers.getAllProducts);
router.get("/:productId", productControllers.getProduct);
router.put("/update", productControllers.updateProduct);
router.delete("/:productId/delete", productControllers.deleteProduct);

module.exports = router;
