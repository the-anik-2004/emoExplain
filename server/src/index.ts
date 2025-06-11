import express from "express";
import cors from "cors";
import emojiRoutes from "./routes/emoji.route";
import authRoutes from "./routes/auth.route";
import favoriteRoutes from "./routes/favorite.route"
import dotenv from "dotenv";
import connectDB from "./db";
import cookieParser from 'cookie-parser'

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
app.use(cookieParser());
//routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to emoExplain server" })
})

app.use('/api/auth',authRoutes);
app.use('/api/emojis',emojiRoutes);
app.use('/api/favorites',favoriteRoutes);


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})