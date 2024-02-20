import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifytoken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifytoken, updateUser);
export default router;