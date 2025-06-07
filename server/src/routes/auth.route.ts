import express from 'express';
import { registerUser, verifyUser, googleLogin,loginUser } from '../controller/auth.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/google-login', googleLogin);
router.post('/login',loginUser);

export default router;
