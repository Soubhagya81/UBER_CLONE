import {User} from '../models/user.models.js'
import {createUser} from '../services/user.service.js'
import { validationResult }from "express-validator"

export const registerUser = async (req, res, next) => {
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { firstname, email, password, lastname } = req.body

    console.log(req.body)

    const user = await createUser({
        firstname,
        lastname,
        email, 
        password
    })

    res.status(201).json()
}