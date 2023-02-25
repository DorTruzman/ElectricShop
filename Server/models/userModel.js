var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  amountOfOrders: {
    type: Number,
    default: 0,
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
