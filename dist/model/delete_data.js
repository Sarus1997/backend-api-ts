"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_data = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateSecretKey = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
const message = "แมวขาว888.com ชวนลงทุนอันดับหนึ่ง เจ๊งก็เรื่องของมึง";
const secretKey = generateSecretKey();
const delete_data = (req, res) => {
    res.json({
        message,
        timestamp: new Date().toLocaleString(),
        secretKey,
        serverTime: new Date().toLocaleString(),
        requestHeaders: req.headers,
        requestBody: req.body,
    });
};
exports.delete_data = delete_data;
