var ProducttypeModel = require('../models/productTypeModel.js');

/**
 * productTypeController.js
 *
 * @description :: Server-side logic for managing productTypes.
 */
module.exports = {

    /**
     * productTypeController.list()
     */
    list: function (req, res) {
        ProducttypeModel.find(function (err, productTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting productType.',
                    error: err
                });
            }

            return res.json(productTypes);
        });
    },

    /**
     * productTypeController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ProducttypeModel.findOne({_id: id}, function (err, productType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting productType.',
                    error: err
                });
            }

            if (!productType) {
                return res.status(404).json({
                    message: 'No such productType'
                });
            }

            return res.json(productType);
        });
    },

    /**
     * productTypeController.create()
     */
    create: function (req, res) {
        var productType = new ProducttypeModel({
			name : req.body.name
        });

        productType.save(function (err, productType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating productType',
                    error: err
                });
            }

            return res.status(201).json(productType);
        });
    },

    /**
     * productTypeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ProducttypeModel.findOne({_id: id}, function (err, productType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting productType',
                    error: err
                });
            }

            if (!productType) {
                return res.status(404).json({
                    message: 'No such productType'
                });
            }

            productType.name = req.body.name ? req.body.name : productType.name;
			
            productType.save(function (err, productType) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating productType.',
                        error: err
                    });
                }

                return res.json(productType);
            });
        });
    },

    /**
     * productTypeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ProducttypeModel.findByIdAndRemove(id, function (err, productType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the productType.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
