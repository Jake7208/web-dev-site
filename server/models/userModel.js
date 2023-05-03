const mongoose = require('mongoose');
const validator = require('validator')

// email, password, passwordConfirm

const AdminSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    role: {
        type: String,
        required: true,
        default: 'admin'
    }
})

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin