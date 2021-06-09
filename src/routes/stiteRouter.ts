import express from 'express';
import UsersController from '../controllers/UsersController';
import validator from '../middlewares/validator';
import multer from '../utils/multer';
import checkLogin from '../middlewares/checkLogin'
const router = express.Router();
router.get('/getcurrentuser',checkLogin,UsersController.getCurrentUser)
router.post('/signup',validator,UsersController.create);
router.post('/signin',UsersController.index);
router.patch('/:id/edit',checkLogin, multer.single('avatar'),UsersController.update);
router.patch('/:id/editPassword',checkLogin, UsersController.updatePassword);
router.get('/profile',checkLogin,UsersController.show);
router.delete('/:id/destroy',checkLogin,UsersController.destroy);
router.get('/search',UsersController.search);
export default router;
