import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, getUserProfile } from "../controller/user.controller.js";
import { authUser } from "../middleware/authUser.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name should be 3 characters Long"),
    body("password")
      .isStrongPassword( 
        // {minLength: 5, 
        // minLowercase: 1, 
        // minUppercase: 1, 
        // minNumbers: 1}   
        ).withMessage("Password should be 5 characters Long including 1 Caps and Small letters"),
  ],
  registerUser
);


router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength(
      //{ minLength: 5, 
      // minLowercase: 1, 
      // minUppercase: 1, 
      // minNumbers: 1}
    ).withMessage("Invalid Password"),
  ],
  loginUser
);


router.post("/profile", authUser ,getUserProfile);

export default router;
