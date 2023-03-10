var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController.js");

router.get("/groupByArea", userController.groupByArea);

router.post("/search", userController.search);

/*
 * GET
 */
router.get("/", userController.list);

/*
 * GET
 */
router.get("/:id", userController.show);

/*
 * POST
 */
router.post("/", userController.create);

/*
 * PUT
 */
router.put("/:id", userController.update);

/*
 * DELETE
 */
router.delete("/:id", userController.remove);

module.exports = router;
