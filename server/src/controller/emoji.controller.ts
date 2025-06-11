import { Request,Response } from "express";
import User from '../model/user.model';
import fetch from "node-fetch";
import { promises } from "dns";

interface AuthRequest extends Request {
    user?:{userId:string};
}

let cachedEmojis: any[] = [];

export const getAllEmojis=async (req:Request,res:Response):Promise<void>=>{
  try {
    if (cachedEmojis.length === 0) {
      const response = await fetch("https://www.emoji.family/api/emojis");
      cachedEmojis = await response.json();
      return;
    }
    res.json(cachedEmojis);
    return; 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emojis' });
    return;
  }
}  

//get Selected Emojis
export const getSelectedEmoji=async (req: Request, res: Response):Promise<void> => {
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



// export const searchEmojiWithHistory=async (req:AuthRequest,res:Response):Promise<void>=>{
//     const {query}=req.query;
//     const userId=req.user?.userId;
//     const user=await User.findById(userId);

//     if(!query || typeof query!='string'){
//         res.status(400).json({ message: 'Search query is required' });
//         return;
//     }

//     try {
        
//         //update user's search history
//         await User.findByIdAndUpdate(userId,{
//             $addToSet:{searchHistory:query.toLowerCase()}
//         })

//         //filter emoji results 
//         if(!user){
//             res.status(404).json({message:"User not found"});
//             return;
//         }else{
//             const result =user?.searchHistory.filter((emoji)=>emoji.name.toLowerCase().includes(query.toLowerCase()) ||
//              emoji.description.toLowerCase().includes(query.toLowerCase()))
//             res.status(200).json({ result });
//         }
//     } catch (error) {
//         console.error('Search error:', error);
//         res.status(500).json({ message: 'Server error while searching emojis' });
//     }
// }