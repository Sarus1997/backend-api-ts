"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_data = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = __importDefault(require("../server/db"));
// Function to generate a secret key
const generateSecretKey = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
// Generate secret key once
const secretKey = generateSecretKey();
const get_data = async (req, res) => {
    try {
        //* SQL query to fetch all employee data *//
        const sqlProducts = `
      SELECT
        id,
        first_name,
        last_name
      FROM
        employees_
    `;
        //* Execute query *//
        const [rows] = await db_1.default.query(sqlProducts);
        //* Respond with employee data *//
        res.json({
            success: true,
            message: 'Data Fetched Successfully.',
            employeeData: rows,
            timestamp: new Date().toLocaleString(),
            secretKey,
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data from the database.',
            error: error.message,
        });
    }
};
exports.get_data = get_data;
