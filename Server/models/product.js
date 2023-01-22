const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['phone', 'TV', 'tablet']
    }
})

const Product = mongoose.model('products', productSchema);
module.exports = Product;
