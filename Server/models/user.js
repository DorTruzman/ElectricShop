const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    }
}, {collection: 'users'});

const UserSchema = mongoose.model('Users', userSchema, 'users');
module.exports = UserSchema;
