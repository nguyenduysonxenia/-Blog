import express from 'express';
import checkLogin from '../middlewares/checkLogin';
import CommentsController from '../controllers/CommentsController';
const router = express.Router();
router.use(checkLogin)
router.get('/:id/post',CommentsController.index)
router.post('/:id/post',CommentsController.create)
export default router;
