import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth.middleware";

import fetch from "node-fetch";
import User from "../model/user.model";

const router = express.Router();

let cachedEmojis: any[] = [];

// selected emojis
router.get('/', async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 50;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    if (cachedEmojis.length === 0) {
      const response = await fetch("https://www.emoji.family/api/emojis?limit=50");
      cachedEmojis = await response.json();
    }

    const paginatedEmojis = cachedEmojis.slice(offset, offset + limit);
     res.json(paginatedEmojis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emojis' });
  }
});

//all emojis
router.get('/all', async (req: Request, res: Response) => {

  try {
    if (cachedEmojis.length === 0) {
      const response = await fetch("https://www.emoji.family/api/emojis");
      cachedEmojis = await response.json();
    }
    res.json(cachedEmojis);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emojis' });
  }
});



export default router;
