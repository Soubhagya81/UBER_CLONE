import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
        },
        lastNmae: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    socketId: {
        type: String,
    }
})

userSchema.methods.generateAccessToken = function () {
    return jsonwebtoken.sign({
        _id: this.id,
        fullName: this.fullName
    }, process.env.SECRET_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRE_IN_SEC
        })
}

userSchema.methods.generateRefressToken = function () {
    return jwt.sign({
        _id : this.id,
        fullName : this.fullName
      },
        process.env.REFRESS_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESS_TOKEN_EXPIRY
        }
      )
}

userSchema.method.comparePassword = async function () {
    return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return next();
    this.password =  bcrypt.hash(thihs.password, 10);
    next();
})


export const User = mongoose.model("User", userSchema)