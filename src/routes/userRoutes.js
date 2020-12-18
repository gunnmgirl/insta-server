import express from "express";

import userController from "../controllers/userController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.get("/:userId", isAuth, userController.getMe);
router.get("/posts/:userId", isAuth, userController.getMyPosts);

export default router;
