import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { 
    getAllEmojis,
    getSelectedEmoji,
    addRecentSearches,
    getRecentSearches,
    clearRecentSearches 
} from "../controller/emoji.controller";

const router = express.Router();

// selected emojis
router.get('/', getSelectedEmoji);

//all emojis
router.get('/all', getAllEmojis);
//recent searches
router.post("/recent-searches", authenticate, addRecentSearches);
router.get("/recent-searches", authenticate, getRecentSearches);
router.delete("/recent-searches", authenticate, clearRecentSearches);


export default router;
