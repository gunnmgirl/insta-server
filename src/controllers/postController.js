import Post from "../models/postModel";

async function createPost(req, res, next) {
  const { imageUrl } = req.body;
  try {
    const post = await Post.create({ imageUrl, userId: req.userId });
    res.status(200).send(post.dataValues);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function getFeedPosts(req, res, next) {
  try {
    const posts = await Post.findAll({ raw: true });
    res.status(200).send(posts);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default { createPost, getFeedPosts };
