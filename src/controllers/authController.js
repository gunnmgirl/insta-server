import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator/check";

import User from "../models/userModel";

async function signup(req, res, next) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 422;
      error.data = errors.array();
      error.message = error.data[0].msg;
      throw error;
    }
    const {
      firstName,
      lastName,
      username,
      description,
      profileImage,
      email,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      profileImage,
      description,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: user.email, userId: user.id.toString() },
      process.env.SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).send({ user, token });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const error = new Error("A user with this email could not be found!");
      error.statusCode = 400;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("You entered a wrong password!");
      error.statusCode = 400;
      throw error;
    }
    const token = jwt.sign(
      { email: user.email, userId: user.id.toString() },
      process.env.SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).send({ token, user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default { signup, login };
