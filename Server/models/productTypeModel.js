var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productTypeSchema = new Schema(
  {
    name: String,
  },
  { collection: "productTypes" }
);

module.exports = mongoose.model("productType", productTypeSchema);
