import express from 'express';
import { registerUser, verifyUser, googleLogin,loginUser, logoutUser, getMe } from '../controller/auth.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/google', googleLogin);
router.post('/login',loginUser);
router.post('/logout', logoutUser);
router.get('/me',getMe);

export default router;
