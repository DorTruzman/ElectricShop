const mongoose = require('mongoose');
const typeSchema = new mongoose.Schema({

    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    }
}, {collection: 'type'});

const TypeSchema = mongoose.model('Type', typeSchema, 'type');
module.exports = TypeSchema;
