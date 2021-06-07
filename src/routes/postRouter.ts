import express from "express";
import PostController from "../controllers/PostController";
import checkLogin from "../middlewares/checkLogin";
import pagination from '../middlewares/pagination';
import Post from '../models/post';
import multer from '../utils/multer';

const router = express.Router();

router.get('/search',PostController.search);
router.get("/:id", PostController.findOnePost);
router.get('/new',PostController.getPostNew);
router.get('/Hot',PostController.getPostHot);
router.patch('/:id/like',PostController.like);
router.patch('/:id/view',PostController.view);
//authen
router.post("/", multer.single('image'),PostController.createPost);
router.patch("/:id", multer.single('image'),PostController.updatePost);
router.delete("/:id", PostController.deletePost);
//
router.get("/", pagination(Post),PostController.getPostList);

export default router;
