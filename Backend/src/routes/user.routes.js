import express from "express";
import { body } from "express-validator"
import { registerUser } from '../controller/user.controller.js'

const router = express.Router();

router.post(
  "/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First Name should be 3 characters Long"),
    body("password").isLength({ min: 5 }).withMessage("Password should be 5 characters Long including 1 Caps and Small letters"),
  ],
        registerUser
);

export default router;