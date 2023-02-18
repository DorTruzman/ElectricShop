var express = require('express');
var router = express.Router();
var productTypeController = require('../controllers/productTypeController.js');

/*
 * GET
 */
router.get('/', productTypeController.list);

/*
 * GET
 */
router.get('/:id', productTypeController.show);

/*
 * POST
 */
router.post('/', productTypeController.create);

/*
 * PUT
 */
router.put('/:id', productTypeController.update);

/*
 * DELETE
 */
router.delete('/:id', productTypeController.remove);

module.exports = router;
