import {User} from '../models/user.models.js'


export const createUser = async function (firstname, lastname, email, password) {
    try {
        if (!firstname || !password || !email) {
            throw new Error ("All fields are required");
        } 
    
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
        throw new Error(error);
        
    }
    
   
};