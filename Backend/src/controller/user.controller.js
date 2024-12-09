import { User } from '../models/user.models.js'
import { createUser } from '../services/user.service.js'
import { validationResult } from "express-validator"


export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullname: { firstname, lastname } } = req.body

    console.log(firstname, lastname)

    const user = await createUser(
        firstname,
        lastname,
        email,
        password
    )

    res.status(201).json()
}


export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Please enter email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) res.status(404).json({ message: "User doesn't exists" });

    console.log(password, user.password)
    
    const matchPassword = await user.comparePassword(password, user.password)

    if (!matchPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = user.generateAccessToken();
    console.log("token", token);


    res.status(200).json({ user, token })
}

export const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}