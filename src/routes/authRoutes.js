import express from 'express';
import { getUser, login, logout } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/login', login);
router.get('/user', getUser);
router.post('/logout', logout);

export default router;