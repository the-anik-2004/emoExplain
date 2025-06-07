import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request{
    user?:{userId:string};
}

//authentication
export const authenticate= (
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=>{
    //grab token from cookies or authorization
    const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(401).json({message:'No token provided | unauthorized'});
        return;
    }

    try {
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {userId:string}
        req.user={userId : decoded.userId};
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};