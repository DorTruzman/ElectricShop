var UsertypeModel = require('../models/userTypeModel.js');

/**
 * userTypeController.js
 *
 * @description :: Server-side logic for managing userTypes.
 */
module.exports = {

    /**
     * userTypeController.list()
     */
    list: function (req, res) {
        UsertypeModel.find(function (err, userTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting userType.',
                    error: err
                });
            }

            return res.json(userTypes);
        });
    },

    /**
     * userTypeController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UsertypeModel.findOne({_id: id}, function (err, userType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting userType.',
                    error: err
                });
            }

            if (!userType) {
                return res.status(404).json({
                    message: 'No such userType'
                });
            }

            return res.json(userType);
        });
    },

    /**
     * userTypeController.create()
     */
    create: function (req, res) {
        var userType = new UsertypeModel({
			name : req.body.name
        });

        userType.save(function (err, userType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating userType',
                    error: err
                });
            }

            return res.status(201).json(userType);
        });
    },

    /**
     * userTypeController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UsertypeModel.findOne({_id: id}, function (err, userType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting userType',
                    error: err
                });
            }

            if (!userType) {
                return res.status(404).json({
                    message: 'No such userType'
                });
            }

            userType.name = req.body.name ? req.body.name : userType.name;
			
            userType.save(function (err, userType) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating userType.',
                        error: err
                    });
                }

                return res.json(userType);
            });
        });
    },

    /**
     * userTypeController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UsertypeModel.findByIdAndRemove(id, function (err, userType) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the userType.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
