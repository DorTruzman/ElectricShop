var UserModel = require("../models/userModel.js");

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
  groupByArea: function (req, res) {
    UserModel.aggregate(
      [
        {
          $group: {
            _id: "$area",
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "areas",
            localField: "_id",
            foreignField: "_id",
            as: "fullArea",
          },
        },
      ],
      function (err, result) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting query.",
            error: err,
          });
        }

        if (!result) {
          return res.status(404).json({
            message: "No results",
          });
        }

        return res.json(
          result.map((curr) => ({
            area:
              curr.fullArea && curr.fullArea.length && curr.fullArea[0].name,
            count: curr.count,
          }))
        );
      }
    );
  },

  /**
   * userController.list()
   */
  list: function (req, res) {
    UserModel.find(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      return res.json(users);
    });
  },

  /**
   * userController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ username: id })
      .populate("type")
      .populate("area")
      .exec(function (err, user) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting user.",
            error: err,
          });
        }

        if (!user) {
          return res.status(404).json({
            message: "No such user",
          });
        }

        return res.json(user);
      });
  },

  /**
   * userController.create()
   */
  create: function (req, res) {
    var user = new UserModel({
      username: req.body.username,
      area: req.body.area,
      type: req.body.type,
    });

    user.save(function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      }

      return res.status(201).json(user);
    });
  },

  search: function (req, res) {
    const params = req.body.searchParams;
    let searchQuery = {};

    for (const [key, value] of Object.entries(params)) {
      if (key === "type" || key === "area") searchQuery[key] = value;
      else if (key === "minOrders")
        searchQuery["amountOfOrders"] = { $gte: value };
      else searchQuery[key] = { $regex: ".*" + value + ".*" };
    }

    UserModel.find({ ...searchQuery })
      .populate("type")
      .populate("area")
      .exec(function (err, users) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting users.",
            error: err,
          });
        }

        return res.json(users);
      });
  },

  /**
   * userController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ username: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }

      user.username = req.body.username ? req.body.username : user.username;
      user.area = req.body.area ? req.body.area : user.area;
      user.type = req.body.type ? req.body.type : user.type;
      if (req.body.purchase) user.amountOfOrders = user.amountOfOrders + 1;
      user.amountOfOrders = req.body.amountOfOrders
        ? req.body.amountOfOrders
        : user.amountOfOrders;

      user.save(function (err, user) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating user.",
            error: err,
          });
        }

        return res.json(user);
      });
    });
  },

  /**
   * userController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the user.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
