import express from 'express';
import UsersController from '../controllers/UsersController';
import validator from '../middlewares/validator';
const router = express.Router();

router.post('/signup',validator,UsersController.create);
router.post('/signin',UsersController.index);
export default router;
