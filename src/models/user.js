const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:  {
        type: String,
        required: true,
        select: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;