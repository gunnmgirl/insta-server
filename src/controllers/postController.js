import Post from "../models/postModel";
import User from "../models/userModel";
import Heart from "../models/heartModel";
import Comment from "../models/commentModel";

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
      offset: Number(page) * 10,
      limit: 10,
      include: [
        { model: User, attributes: ["firstName", "lastName", "profileImage"] },
        { model: Heart },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
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

async function heartPost(req, res, next) {
  const { postId } = req.body;
  try {
    const heart = await Heart.create({ postId: postId, userId: req.userId });
    res.status(200).send(heart);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function unheartPost(req, res, next) {
  const { postId } = req.body;
  try {
    const heart = await Heart.findOne({
      where: { userId: req.userId, postId: postId },
    });
    const heartId = heart.id;
    await heart.destroy();
    res.status(200).send({ heartId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function addComment(req, res, next) {
  const { postId, comment } = req.body;
  const newComment = {
    userId: req.userId,
    postId: postId,
    body: comment,
  };
  try {
    const comm = await Comment.create(newComment);
    res.status(200).send(comm.dataValues);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function deleteComment(req, res, next) {
  const { commentId } = req.body;
  try {
    const comment = await Comment.findByPk(commentId);
    await comment.destroy();
    res.status(200).send();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default {
  createPost,
  getFeedPosts,
  getAllPosts,
  getPost,
  heartPost,
  unheartPost,
  addComment,
  deleteComment,
};
