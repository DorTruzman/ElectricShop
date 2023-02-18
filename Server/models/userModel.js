var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: "area",
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "userType",
  },
});

module.exports = mongoose.model("user", userSchema);
