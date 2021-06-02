import express from 'express';
import checkLogin from '../middlewares/checkLogin'
const router = express.Router();
router.use(checkLogin)

export default router;
