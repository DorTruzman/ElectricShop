const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    productId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    type: {
        type: Number
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
}, {collection: 'product'})

const Product = mongoose.model('Product', productSchema, 'product');
module.exports = Product;
