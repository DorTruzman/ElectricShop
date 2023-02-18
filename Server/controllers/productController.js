var ProductModel = require("../models/productModel.js");

/**
 * productController.js
 *
 * @description :: Server-side logic for managing products.
 */
module.exports = {
  /**
   * productController.list()
   */
  list: function (req, res) {
    ProductModel.find()
      .populate("productType")
      .exec(function (err, products) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting product.",
            error: err,
          });
        }

        return res.json(products);
      });
  },

  search: function (req, res) {
    const params = req.body.searchParams;
    let searchQuery = {};

    for (const [key, value] of Object.entries(params)) {
      if (key === "productType") searchQuery[key] = value;
      else searchQuery[key] = { $regex: ".*" + value + ".*" };
    }

    console.log("Search Query is ", searchQuery);
    ProductModel.find({ ...searchQuery })
      .populate("productType")
      .exec(function (err, products) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting product.",
            error: err,
          });
        }

        return res.json(products);
      });
  },

  /**
   * productController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    ProductModel.findOne({ _id: id }, function (err, product) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting product.",
          error: err,
        });
      }

      if (!product) {
        return res.status(404).json({
          message: "No such product",
        });
      }

      return res.json(product);
    });
  },

  /**
   * productController.create()
   */
  create: function (req, res) {
    var product = new ProductModel({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      productType: req.body.productType,
    });

    product.save(function (err, product) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating product",
          error: err,
        });
      }

      return res.status(201).json(product);
    });
  },

  /**
   * productController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    ProductModel.findOne({ _id: id }, function (err, product) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting product",
          error: err,
        });
      }

      if (!product) {
        return res.status(404).json({
          message: "No such product",
        });
      }

      product.name = req.body.name ? req.body.name : product.name;
      product.description = req.body.description
        ? req.body.description
        : product.description;
      product.image = req.body.image ? req.body.image : product.image;
      product.price = req.body.price ? req.body.price : product.price;
      product.productType = req.body.productType
        ? req.body.productType
        : product.productType;

      product.save(function (err, product) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating product.",
            error: err,
          });
        }

        return res.json(product);
      });
    });
  },

  /**
   * productController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    ProductModel.findByIdAndRemove(id, function (err, product) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the product.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
