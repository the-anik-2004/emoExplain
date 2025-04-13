import express from "express";
import cors from "cors";
import emojiRoutes from "./routes/emoji";

const app=express();
const PORT=process.env.PORT || 5000;

//middlewares
app.use(cors(
    {origin:["http://localhost:5173","https://emoexplain.vercel.app"]}
));
app.use(express.json())
app.use('/api/emojis',emojiRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})