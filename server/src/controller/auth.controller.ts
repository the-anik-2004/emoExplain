import { Request, Response } from 'express';
import User from '../model/user.model';
import bcrypt from 'bcryptjs';    
import crypto from 'crypto';     
import nodemailer from 'nodemailer'; 
import { OAuth2Client } from 'google-auth-library'; 

const client =new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//generate OTP
const generateOTP=():string=>{
    return Math.floor(100000+Math.random()*900000).toString();
}

//configure Node-mailer transpoter
const transpoter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
})

/**
 export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = new User({
      email,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpires,
      favorites: [],
    });

    await newUser.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email for emoExplain',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send OTP email' });
      }
      res.status(201).json({ message: 'OTP sent to your email' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: 'Email and OTP are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.isVerified)
      return res.status(400).json({ message: 'User already verified' });

    if (
      user.otp !== otp ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const { tokenId } = req.body;
  if (!tokenId)
    return res.status(400).json({ message: 'Google token is required' });

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email)
      return res.status(400).json({ message: 'Invalid Google token' });

    const email = payload.email;
    const googleId = payload.sub;

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not exist
      user = new User({
        email,
        googleId,
        isVerified: true,
        favorites: [],
      });
      await user.save();
    } else if (!user.googleId) {
      // Link googleId if user exists without it
      user.googleId = googleId;
      user.isVerified = true;
      await user.save();
    }

    // Here, you can create and return a JWT token (optional)
    res.status(200).json({ message: 'Google login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Google login failed' });
  }
};
 */