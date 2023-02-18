var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userTypeSchema = new Schema(
  {
    name: String,
  },
  { collection: "userTypes" }
);

module.exports = mongoose.model("userType", userTypeSchema);
