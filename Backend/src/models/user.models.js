import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false // this is because password will not come with select query
    },
    socketId: {
        type: String,
    }
});

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jsonwebtoken.sign({
        _id: this.id,
        fullname: this.fullname
    }, process.env.ACCESS_TOKEN, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    });
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jsonwebtoken.sign({
        _id: this.id,
        fullname: this.fullname
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Pre-save middleware for password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const User = mongoose.model("User", userSchema);
