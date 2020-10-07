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
  const { page } = req.query;
  try {
    const posts = await Post.findAll({
      raw: true,
      offset: Number(page) * 10,
      limit: 10,
    });
    res.status(200).send(posts);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function getAllPosts(req, res, next) {
  const { page } = req.query;
  try {
    const posts = await Post.findAll({
      raw: true,
      offset: Number(page) * 10,
      limit: 10,
    });
    res.status(200).send(posts);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function getPost(req, res, next) {
  const { postId } = req.query;
  try {
    const post = await Post.findByPk(postId);
    res.status(200).send(post.dataValues);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default { createPost, getFeedPosts, getAllPosts, getPost };
