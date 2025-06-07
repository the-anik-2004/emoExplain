import { Request,Response } from "express";
import User from '../model/user.model';

interface AuthRequest extends Request{
    user?:{userId:string};
}

//get current user's favorites
export const getFavorites=async (req:AuthRequest, res:Response):Promise<void>=>{
    try {
        const user=await User.findById(req.user?.userId);
        if(!user) {
            res.status(404).json({message:"User Not Found"});
            return;
        } else{
            res.status(200).json({favorites:user.favorites});
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
};

// Toggle favorite (add if not present, remove if already exists)
export const toggleFavorite =async (req:AuthRequest,res:Response):Promise<void>=>{
    const{emoji}=req.body;

    if(!emoji){
        res.status(400).json({message:"Emoji is required"});
        return;
    }

    try {
        const user=await User.findById(req.user?.userId);
        if(!user){
            res.status(404).json({message:"User not found"});
            return;
        }

        const index=user.favorites.indexOf(emoji);

        let action:string;

        if(index>-1){
            user.favorites.splice(index,1);
            action="removed";
        }else{
            user.favorites.push(emoji);
            action="added";
        }

        await user.save();

        res.status(200).json({
            message:`Emoji is ${action} from favorites`,
            favorites:user.favorites,
        })
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Server error' });
    }
}