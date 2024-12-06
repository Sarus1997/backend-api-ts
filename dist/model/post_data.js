"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_data = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = __importDefault(require("../server/db"));
const generateSecretKey = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
const message = "แมวขาว888.com ชวนลงทุนอันดับหนึ่ง เจ๊งก็เรื่องของมึง";
const secretKey = generateSecretKey();
const post_data = async (req, res) => {
    try {
        const connection = await db_1.default.getConnection();
        const { someData } = req.body; // Adjust based on your actual data structure
        const query = 'INSERT INTO your_table_name (column_name) VALUES (?)'; // Update table and column names
        await connection.query(query, [someData]);
        connection.release();
        res.json({
            message: 'Data inserted successfully',
            timestamp: new Date().toLocaleString(),
            secretKey,
            serverTime: new Date().toLocaleString(),
            requestHeaders: req.headers,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Database insertion failed' });
    }
};
exports.post_data = post_data;
