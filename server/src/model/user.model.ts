import mongoose,{Document,Schema} from "mongoose";

//make Interface of User
export interface EmoExplainUser extends Document{
    email:string;
    password?:string;
    isVerified:boolean;
    otp?:string;
    otpExpires?:Date;
    favorites:string[];
    googleId?:string;
}

//make userSchema 
const userScehma= new Schema<EmoExplainUser>({
    email:{type:String,required:true,unique:true},
    password:{type:String},
    isVerified:{type:Boolean,Default:false},
    otp:{type:String},
    otpExpires:{type:Date},
    favorites:[{type:String}],
    googleId:{type:String},
});

//Model Generation
const User =mongoose.model<EmoExplainUser>('User',userScehma);
export default User;