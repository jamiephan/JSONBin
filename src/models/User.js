// Create a User model with mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        default: () => nanoid(32),
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    })
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// Renew API Key
userSchema.methods.renewApiKey = function () {
    this.apiKey = nanoid(32);
    return this.save();
}

const User = mongoose.model('User', userSchema);
module.exports = User;