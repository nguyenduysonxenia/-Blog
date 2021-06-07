import express from "express";
import PostController from "../controllers/PostController";
import checkLogin from "../middlewares/checkLogin";
import pagination from '../middlewares/pagination';
import Post from '../models/post';
import multer from '../utils/multer';

const router = express.Router();

router.get('/search',PostController.search);
router.patch('/:id/like',PostController.like)
router.patch('/:id/view',PostController.view)

router.post("/", multer.single('image'),PostController.createPost);
router.get("/:id", PostController.findOnePost);
router.patch("/:id", multer.single('image'),PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/", pagination(Post),PostController.getPostList);

export default router;
