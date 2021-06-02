import express from "express";
import PostController from "../controllers/PostController";
import checkLogin from "../middlewares/checkLogin";
const router = express.Router();
router.use(checkLogin);
router.get('/search',PostController.search);
router.patch('/:id/like',PostController.like)
router.patch('/:id/view',PostController.view)
router.get("/", PostController.getPostList);
router.post("/", PostController.createPost);
router.get("/:id", PostController.findOnePost);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export default router;
