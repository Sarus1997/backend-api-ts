"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = __importDefault(require("../server/db"));
const generateSecretKey = () => crypto_1.default.randomBytes(32).toString('hex');
const getData = async (req, res) => {
    try {
        const sqlProducts = `
      SELECT
        *
      FROM
        product_
    `;
        //* Fetch data from the database
        const [rows] = await db_1.default.query(sqlProducts);
        //* Generate a unique secret key for the response
        const secretKey = generateSecretKey();
        res.status(200).json({
            success: true,
            message: 'Data fetched successfully.',
            data: rows,
            timestamp: new Date().toISOString(),
            secretKey,
        });
    }
    catch (error) {
        console.error(`Error fetching data [${req.method} ${req.url}]:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data from the database.',
            error: error.message || 'Unknown error occurred.',
        });
    }
};
exports.getData = getData;
