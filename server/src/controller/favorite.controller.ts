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
        } 
        res.status(200).json({favorites:user.favorites});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
};

// Toggle favorite (add if not present, remove if already exists)
export const toggleFavorite =async (req:AuthRequest,res:Response):Promise<void>=>{
    const{hexcode}=req.body;

    if(!hexcode || typeof hexcode !=="string"){
        res.status(400).json({message:"Vaild hexcode is required"});
        return;
    }

    try {
        const user=await User.findById(req.user?.userId);
        if(!user){
            res.status(404).json({message:"User not found"});
            return;
        }

        let action:string;

        if(user.favorites.includes(hexcode)){
            user.favorites=user.favorites.filter(fav=>fav!==hexcode);
            action='removed'
        }else{
            user.favorites.push(hexcode);
            action="added";
        }

        await user.save();

        res.status(200).json({
            message: `Emoji successfully ${action} from favorites`,
            favorites: user.favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}