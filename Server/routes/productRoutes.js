var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController.js");

/*
 * GET
 */
router.get("/", productController.list);

router.post("/search", productController.search);

/*
 * GET
 */
router.get("/:id", productController.show);

/*
 * POST
 */
router.post("/", productController.create);

/*
 * PUT
 */
router.put("/:id", productController.update);

/*
 * DELETE
 */
router.delete("/:id", productController.remove);

module.exports = router;
