import {User} from '../models/user.models.js'
import {ApiError} from '../utils/ApiError.js';


export const createUser = async function (firstname, lastname, email, password) {
   
        if (!firstname || !password || !email) {
            throw new Error ("All fields are required");
        }       
        const validateUser = await User.findOne({ email });
        if (validateUser) throw new ApiError(409, "User already exists")

    try {
        const user = await User.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });
    
        return user;

    } catch (error) {
        console.log("Error", error)
        throw new ApiError(500, "Error occurred creating user");
    }
   
};