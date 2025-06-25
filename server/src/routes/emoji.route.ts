import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { 
    getAllEmojis,
    getSelectedEmoji,
    addRecentSearches,
    getRecentSearches,
    clearRecentSearches, 
    getEmojiByHexcode
} from "../controller/emoji.controller";

const router = express.Router();

//all emojis
router.get('/all', getAllEmojis);

// selected emojis
router.get('/', getSelectedEmoji);
router.get('/:hexcode', getEmojiByHexcode);

//recent searches
router.post("/recent-searches", authenticate, addRecentSearches);
router.get("/search/recent-searches", authenticate, getRecentSearches);
router.delete("/recent-searches", authenticate, clearRecentSearches);


export default router;
