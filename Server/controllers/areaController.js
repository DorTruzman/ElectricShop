var AreaModel = require('../models/areaModel.js');

/**
 * areaController.js
 *
 * @description :: Server-side logic for managing areas.
 */
module.exports = {

    /**
     * areaController.list()
     */
    list: function (req, res) {
        AreaModel.find(function (err, areas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting area.',
                    error: err
                });
            }

            return res.json(areas);
        });
    },

    /**
     * areaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        AreaModel.findOne({_id: id}, function (err, area) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting area.',
                    error: err
                });
            }

            if (!area) {
                return res.status(404).json({
                    message: 'No such area'
                });
            }

            return res.json(area);
        });
    },

    /**
     * areaController.create()
     */
    create: function (req, res) {
        var area = new AreaModel({
			name : req.body.name
        });

        area.save(function (err, area) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating area',
                    error: err
                });
            }

            return res.status(201).json(area);
        });
    },

    /**
     * areaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        AreaModel.findOne({_id: id}, function (err, area) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting area',
                    error: err
                });
            }

            if (!area) {
                return res.status(404).json({
                    message: 'No such area'
                });
            }

            area.name = req.body.name ? req.body.name : area.name;
			
            area.save(function (err, area) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating area.',
                        error: err
                    });
                }

                return res.json(area);
            });
        });
    },

    /**
     * areaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        AreaModel.findByIdAndRemove(id, function (err, area) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the area.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
