import mongoose,{Document,Schema} from "mongoose";

//make Interface of User
export interface EmoExplainUser extends Document{
    username:string;
    email:string;
    password?:string;
    isVerified:boolean;
    otp?:string;
    otpExpires?:Date;
    favorites:string[];
    searchHistory:string[];
    googleId?:string;
}

//make userSchema 
const userScehma= new Schema<EmoExplainUser>({
    username:{type:String,default:`emoExplainUser`+Date.now().toString()},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    isVerified:{type:Boolean,default:false},
    otp:{type:String},
    otpExpires:{type:Date},
    favorites:[{type:String}],
    searchHistory:[{type:String}],
    googleId:{type:String},
});

//Model Generation
const User =mongoose.model<EmoExplainUser>('User',userScehma);
export default User;