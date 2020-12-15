import express from "express";

import postController from "../controllers/postController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.post("/create", isAuth, postController.createPost);
router.get("/feed", isAuth, postController.getFeedPosts);
router.get("/explore", isAuth, postController.getFeedPosts);
router.get("/post", isAuth, postController.getPost);
router.post("/heart", isAuth, postController.heartPost);
router.post("/unheart", isAuth, postController.unheartPost);
router.post("/addComment", isAuth, postController.addComment);

export default router;
