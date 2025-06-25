import { Request,Response } from "express";
import User from '../model/user.model';
import fetch from "node-fetch";


interface AuthRequest extends Request {
    user?:{userId:string};
}

let cachedEmojis: any[] = [];

//get all emojis
export const getAllEmojis=async (req:AuthRequest,res:Response):Promise<void>=>{
  try {
    if (cachedEmojis.length === 0) {
      const response = await fetch("https://www.emoji.family/api/emojis");
      cachedEmojis = await response.json();
    }
    res.json(cachedEmojis);
    return; 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emojis' });
    return;
  }
}  

//get Selected Emojis
export const getSelectedEmoji=async (req: AuthRequest, res: Response):Promise<void> => {
  const limit = parseInt(req.query.limit as string) || 50;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    if (cachedEmojis.length === 0) {
      const response = await fetch("https://www.emoji.family/api/emojis?limit=50");
      cachedEmojis = await response.json();
      return;
    }

    const paginatedEmojis = cachedEmojis.slice(offset, offset + limit);
     res.json(paginatedEmojis);
     return;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emojis' });
    return;
    }
}

//get Single Emoji
 export const getEmojiByHexcode = async (req: AuthRequest, res: Response): Promise<void> => {
  const { hexcode } = req.params;

  if (!hexcode) {
    res.status(400).json({ message: "Hexcode is required" });
    return;
  }

  try {
    if (cachedEmojis.length === 0) {
      const response = await fetch("https://www.emoji.family/api/emojis");
      cachedEmojis = await response.json();
    }

    const emoji = cachedEmojis.find(e => e.hexcode.toLowerCase() === hexcode.toLowerCase());

    if (!emoji) {
      res.status(404).json({ message: "Emoji not found" });
      return;
    }

    res.status(200).json(emoji);
  } catch (error) {
    console.error("Error fetching emoji by hexcode:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// add recent searches
export const addRecentSearches=async (req:AuthRequest,res:Response):Promise<void>=>{
    const {search} =req.query;
    const userId=req.user?.userId;

    if(!search || typeof search!=='string'){
      res.status(400).json({message:"Search query is required"});
      return;
    }

    try{
      const response =await fetch(`https://www.emoji.family/api/emojis?search=${encodeURIComponent(search)}`);
      const emojiData= await response.json();
        
      if(!Array.isArray(emojiData) || emojiData.length===0){
        res.status(404).json({ message: "No emojis found for this query" });
        return;
      }
        await User.findByIdAndUpdate(userId,{
          $addToSet:{
            searchHistory:search.toLowerCase(),
          },
        });

        res.status(200).json({results:emojiData});
        return;
      
    }catch(error){
        console.error("Search error:", error);
        res.status(500).json({ message: "Server error while searching emojis" });
    }
}

//get Reacent searches
export const getRecentSearches=async (
  req:AuthRequest,
  res:Response
):Promise<void>=>{
  try {
    const user= await User.findById(req.user?.userId);
    if(!user){
      res.status(404).json({message:"User not found"});
      return;
    }
    res.status(200).json({searchHistory:user.searchHistory});
  } catch (error) {
      console.error("Error fetching search history:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//delete recentSearchHistory
export const clearRecentSearches=async (
  req:AuthRequest,
  res:Response
):Promise<void>=>{
  try {
    const user=await User.findById(req.user?.userId);

    if(!user){
      res.status(404).json({message:"User not found"});
      return;
    }else{
      user.searchHistory=[];
      await user.save();
      res.status(200).json({message:"Search history cleared"});
      return;
    }
  } catch (error) {
    console.error("Error clearing search history:", error);
    res.status(500).json({ message: "Server error" });
  }
}
