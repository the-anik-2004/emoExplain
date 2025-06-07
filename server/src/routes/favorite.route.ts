import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { toggleFavorite, getFavorites } from '../controller/favorite.controller';

const router = express.Router();

router.get('/', authenticate, getFavorites);
router.post('/toggle', authenticate, toggleFavorite);

export default router;