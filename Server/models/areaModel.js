var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var areaSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("area", areaSchema);
