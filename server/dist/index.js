"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const emoji_1 = __importDefault(require("./routes/emoji"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//middlewares
app.use((0, cors_1.default)({ origin: ["http://localhost:5173", "https://emoexplain.vercel.app/"] }));
app.use(express_1.default.json());
app.use('/api/emojis', emoji_1.default);
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
