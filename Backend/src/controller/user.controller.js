import {User} from '../models/user.models.js'
import {createUser} from '../services/user.service.js'
import { validationResult }from "express-validator"




export const registerUser = async (req, res, next) => {
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password, fullname : {firstname, lastname} } = req.body

    console.log(firstname, lastname)

    const user = await createUser(
        firstname,
        lastname,
        email, 
        password
    )

    res.status(201).json()
}


export const loginUser = async(req, res, next) => {
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({message : 'Please enter email and password'});
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user)  res.status(404).json({message : "User doesn't exists"});

    const matchPassword = await User.comparePassword(password, user.password)

    if (!matchPassword) return res.status(401).json({message: 'Invalid credentials'});

    res.status(200).json({user})
}