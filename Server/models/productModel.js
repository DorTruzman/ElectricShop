var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  productType: {
    type: Schema.Types.ObjectId,
    ref: "productType",
  },
});

module.exports = mongoose.model("product", productSchema);
