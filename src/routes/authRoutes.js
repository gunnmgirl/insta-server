import express from "express";
import { body } from "express-validator/check";

import authController from "../controllers/authController";
import User from "../models/userModel";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) => {
        return User.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
    body("username")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Username must be at least 2 characters long")
      .custom((value) => {
        return User.findOne({ where: { username: value } }).then((user) => {
          if (user) {
            return Promise.reject("Username already exists!");
          }
        });
      }),
  ],
  authController.signup
);

export default router;
