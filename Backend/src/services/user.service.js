import {User} from '../models/user.models.js'


export const createUser = async function (firstname, lastname, email, password) {
    console.log(!firstname, !password, !email);
    
    if (!firstname || !password || !email) {
        throw new Error ("All fields are required");
    } 

    console.log("user", firstname, lastname, email, password)

    const user = User.create({
        fullName :{
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
};