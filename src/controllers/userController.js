import User from "../models/userModel";
import Post from "../models/postModel";
import bcrypt from "bcryptjs";

async function getMe(req, res, next) {
  const { userId } = req.query;
  try {
    const user = await User.findByPk(userId);
    if (user === null) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).send(user.dataValues);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function getMyPosts(req, res, next) {
  try {
    const posts = await Post.findAll({
      where: {
        userId: req.userId,
      },
    });
    res.status(200).send(posts);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function editUser(req, res, next) {
  const { firstName, lastName, username, profileImage } = req.body;
  try {
    const user = await User.findByPk(req.userId);
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.profileImage = profileImage;
    await user.save();
    res.status(200).send(user.dataValues);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function changePassword(req, res, next) {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(req.userId);
    const isEqual = await bcrypt.compare(oldPassword, user.password);
    if (!isEqual) {
      const error = new Error("You entered a wrong password!");
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send(user.dataValues);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default { getMe, getMyPosts, editUser, changePassword };
