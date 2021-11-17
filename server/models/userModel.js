const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: 6,
        max: 64
    },
    stripeAccountID: "",
    stripeSeller: {},
    stripeSession: {}
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {  // because it has a user binding we can not use arrow function, called whenever save is called
    let user = this;
    if (user.isModified('password')) {
        return bcrypt.hash(user.password, 8, function (err, hash) {
            if (err) {
                console.log('BCRYPT_HASH_ERROR', err.message);
                return next(err);
            }
            user.password = hash;
            return next();
        })
    } else {
        return next();
    }
})

userSchema.methods.comparePassword = async function (password, next) {
    const isMatch = await bcrypt.compare(password, this.password)
    if (!isMatch) {
        return next(false);
    }
    return next(true);
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password

    return userObject
}

const User = mongoose.model('users', userSchema);
module.exports = User;