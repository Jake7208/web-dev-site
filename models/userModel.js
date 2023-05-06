const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs')
const validator = require('validator')

// email, password, passwordConfirm
const passwordValidator = function(value) {
    // Check that the password contains at least one uppercase letter, one lowercase letter, and one number and one special character
    if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[^a-zA-Z0-9]/.test(value)) {
        throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      }
    // Check that the password is at least 8 characters long
    if (value.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
  }

const AdminSchema = new mongoose.Schema({
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
        minlength: 8,
        validate: [passwordValidator, 'Invalid password'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // this only works on CREATE and SAVE!!
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords do not match"
        }
    }
});

AdminSchema.pre('save', async function(next) {
    // Only run this function if password was modified
    if(!this.isModified('password')) return next();

    // hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    // Delete password from field
    this.passwordConfirm = undefined;
    next();
});

// instance method
AdminSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin