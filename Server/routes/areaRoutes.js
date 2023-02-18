var express = require('express');
var router = express.Router();
var areaController = require('../controllers/areaController.js');

/*
 * GET
 */
router.get('/', areaController.list);

/*
 * GET
 */
router.get('/:id', areaController.show);

/*
 * POST
 */
router.post('/', areaController.create);

/*
 * PUT
 */
router.put('/:id', areaController.update);

/*
 * DELETE
 */
router.delete('/:id', areaController.remove);

module.exports = router;
