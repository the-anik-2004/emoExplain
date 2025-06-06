import express from "express";
import cors from "cors";
import emojiRoutes from "./routes/emoji";
import dotenv from "dotenv";
import connectDB from "./db";
// import authRoutes from './routes/auth';

//load envs
dotenv.config();
//connect db
connectDB();

const app=express();
const PORT=process.env.PORT || 5000;

//middlewares
app.use(cors({
    origin:["http://localhost:5173","https://emoexplain.vercel.app"],
    credentials:true,
}));

app.use(express.json());
//routes
// app.use('/auth',authRoutes);
app.use('/api/emojis',emojiRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})