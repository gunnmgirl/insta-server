import express from "express";

import postController from "../controllers/postController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.post("/create", isAuth, postController.createPost);
router.get("/feed", isAuth, postController.getFeedPosts);

export default router;
