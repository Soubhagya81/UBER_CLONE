import { User } from "../models/user.models.js";
//import { bcrypt } from "bcrypt";
import  jwt  from "jsonwebtoken";
import  {ApiError} from "../utils/ApiError.js"

export const authUser = async (req, res) => {
    try {
    const token = req.cookies.token || req.cookies.headers.authorization.split(' ')[1];

    if (!token) throw new ApiError(401, "Unauthorize access");

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN)
        const user = await User.findById(decode._id);

        req.user = user;

        return next();

    } catch (error) {
        throw new ApiError(401, "Unauthorized access");
        
    }
}