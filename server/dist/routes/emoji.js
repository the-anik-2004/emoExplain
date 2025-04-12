"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = express_1.default.Router();
let cachedEmojis = [];
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    try {
        if (cachedEmojis.length === 0) {
            const response = yield (0, node_fetch_1.default)("https://www.emoji.family/api/emojis?limit=50");
            cachedEmojis = yield response.json();
        }
        const paginatedEmojis = cachedEmojis.slice(offset, offset + limit);
        res.json(paginatedEmojis);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch emojis' });
    }
}));
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (cachedEmojis.length === 0) {
            const response = yield (0, node_fetch_1.default)("https://www.emoji.family/api/emojis");
            cachedEmojis = yield response.json();
        }
        res.json(cachedEmojis);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch emojis' });
    }
}));
exports.default = router;
