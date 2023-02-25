var express = require("express");
var router = express.Router();
var userTypeController = require("../controllers/userTypeController.js");

/*
 * GET
 */
router.get("/", userTypeController.list);

/*
 * GET
 */
router.get("/:id", userTypeController.show);

module.exports = router;
