import User from "../models/userModel";
import Post from "../models/postModel";

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

export default { getMe, getMyPosts };
