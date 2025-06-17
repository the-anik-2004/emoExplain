import { Request, Response } from 'express';
import User from '../model/user.model';
import bcrypt from 'bcryptjs';    
import crypto from 'crypto';     
import nodemailer from 'nodemailer'; 
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library'; 
import dotenv from 'dotenv';
dotenv.config();

const client =new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//generate OTP
const generateOTP=():string=>{
    return Math.floor(100000+Math.random()*900000).toString();
}

//configure Node-mailer transpoter
const transpoter=nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  // secure: process.env.SMTP_SECURE === 'true', // this must be a boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})


export const registerUser= async (req:Request,res:Response):Promise<void>=>{
    const {email,password}=req.body;

    //check for email and password 
    if(!email || !password){
       res.status(400).json({message:"Email and Password are required"});
       return;
    }
    
    //if yes
    try {
      const existingUser = await User.findOne({email});

      //if User already exist
      if(existingUser){
         res.status(400).json({message:"User already exits"});
         return;
      }

      //if user does not exist | hashed the pasword and save 
      const salt=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,salt);

      const otp = generateOTP();
      const otpExpires=new Date(Date.now()+10*60*1000);
      console.log(`otp:${otp}`);
      console.log({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        user: process.env.EMAIL_USER,
      });

      const newUser=new User({
        email,
        password:hashedPassword,
        isVerified:false,
        otp,
        otpExpires,
        favorites:[],
      });

      await newUser.save();

      const mailOptions= {
        from :process.env.EMAIL_USER,
        to:email,
        subject:'Verify your email for emoExplain',
        text :`Your OTP is ${otp}. It expires in 10 minutes.`
      }

      try {
        transpoter.sendMail(mailOptions);
        res.status(201).json({message:"OTP is sent to your email"})
      } catch (mailError) {
        console.error(mailError);
        res.status(500).json({ message: "Failed to send OTP to your email" });
      }
    

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }

}

//verify User
export const verifyUser=async (req:Request,res:Response):Promise<void>=>{
    const {email,otp}=req.body;

    if(!email ||!otp){
      res.status(400).json({message:"Email and Otp required"});
      return;
    }

    try {
      const user=await User.findOne({email});
      if(!user){
        res.status(500).json({message:"User not found"});
        return;
      }

      if(user.isVerified){
        res.status(400).json({message:"User's Email is already verifed"});
        return;
      }
  
      if(
        user.otp!=otp ||
        !user.otpExpires||
        user.otpExpires<new Date()
      ) {
        res.status(400).json({ message: "Invalid or expired OTP" });
      }
      else{
        user.isVerified=true;
        user.otp=undefined;
        user.otpExpires=undefined;
        await user.save();
  
        res.status(200).json({message:"Email verifed successfully"});
      }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//google Login
export const googleLogin=async (req:Request,res:Response):Promise<void>=>{
  const {tokenId}=req.body;
  if(!tokenId){
    res.status(400).json({message:"Google token is required"});
    return;
  }

  try {
    const ticket=await client.verifyIdToken({
      idToken:tokenId,
      audience:process.env.GOOGLE_CLIENT_ID,
    })

    const payload=ticket.getPayload();

    if(!payload||!payload.email||!payload.sub){
      res.status(500).json({message:"invalid google token"});
      return;
    }

    const email=payload.email;
    const googleId=payload.sub;

    let user=await User.findOne({email});

    if(!user){
      user= new User({
        email,
        googleId,
        isVerified:true,
        favorites:[],
        searchHistory:[],
      });
      await user.save();

    }else if(!user.googleId){
      user.googleId=googleId;
      user.isVerified=true;
      await user.save();
    }

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET!,{
      expiresIn:"7d",
    });

    res.cookie('token',token,{
      httpOnly:true,
      sameSite:"lax",
      secure:process.env.NODE_ENV==="production",
      maxAge:7*24*60*60*1000,
    })
      

     res.status(200).json({ message: 'Google login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Google login failed' });
  }
};

//Login User
export const loginUser = async (req:Request,res:Response):Promise<void>=>{
    const {email,password}=req.body;

    if(!email || !password){
      res.status(400).json({message:"Email and Password are required"});
      return;
    }

    try {
      const user =await User.findOne({email});
      if(!user || !user.isVerified){
        res.status(400).json({message:'Invalid credentials or Email not verified'});
        return;
      }

      const isMatch = await bcrypt.compare(password,user.password as string);
      if(!isMatch){
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // generate JWT
      const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET as string,
        {expiresIn:'7d'}
      );

      res.cookie('token',token,{
        httpOnly:true,
        sameSite:'lax',
        secure:process.env.NODE_ENV==="production",
        maxAge:7*24*60*60*1000,
      })
        .status(200)
        .json({user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server Error'});
    }
};

// Logout User
export const logoutUser = (req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export const getMe=async (req:Request,res:Response):Promise<void>=>{
  try {
    const token =req.cookies.token;
    if(!token){
      res.status(401).json({message:'Unauthorized'});
      return;
    }

    const decoded= jwt.verify(token,process.env.JWT_SECRET as string) as {userId:string};

    const user =await User.findById(decoded.userId).select('-password -otp -otpExpires');
    if(!user){
      res.status(404).json({message:'User not Found'});
      return;
    }
    res.status(200).json(user);
  } catch (error) {
     res.status(401).json({ message: 'Invalid token' });
  }
}


