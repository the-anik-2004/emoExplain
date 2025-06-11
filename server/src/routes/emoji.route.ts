import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth.middleware";

import { getAllEmojis, getSelectedEmoji } from "../controller/emoji.controller";


const router = express.Router();



// selected emojis
router.get('/', getSelectedEmoji);

//all emojis
router.get('/all', getAllEmojis);



export default router;
