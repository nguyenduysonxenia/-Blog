import express from 'express';
import checkLogin from '../middlewares/checkLogin';
import CommentsController from '../controllers/CommentsController';
const router = express.Router();
router.get('/:id/post',CommentsController.index);
router.post('/:id/post',checkLogin,CommentsController.create);
router.delete('/:id',checkLogin,CommentsController.destroy);
router.patch('/:id',checkLogin,CommentsController.update);
export default router;
