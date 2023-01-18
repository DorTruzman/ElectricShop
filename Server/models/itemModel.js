var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var itemSchema = new Schema({
	'price' : String
});

module.exports = mongoose.model('item', itemSchema);
