var express = require('express');
var router = express.Router();
var userTypeController = require('../controllers/userTypeController.js');

/*
 * GET
 */
router.get('/', userTypeController.list);

/*
 * GET
 */
router.get('/:id', userTypeController.show);

/*
 * POST
 */
router.post('/', userTypeController.create);

/*
 * PUT
 */
router.put('/:id', userTypeController.update);

/*
 * DELETE
 */
router.delete('/:id', userTypeController.remove);

module.exports = router;
