var UsertypeModel = require("../models/userTypeModel.js");

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
          message: "Error when getting userType.",
          error: err,
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

    UsertypeModel.findOne({ _id: id }, function (err, userType) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting userType.",
          error: err,
        });
      }

      if (!userType) {
        return res.status(404).json({
          message: "No such userType",
        });
      }

      return res.json(userType);
    });
  },
};
