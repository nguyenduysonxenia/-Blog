import express from 'express';
import PostController from '../controllers/PostController'
const router = express.Router();

router.get('/',PostController.getPostList);
router.post('/',PostController.createPost);
router.get('/:id', PostController.findOnePost);
router.patch('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

export default router;