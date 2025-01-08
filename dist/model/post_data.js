"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postData = void 0;
const db_1 = __importDefault(require("../server/db"));
const function_1 = require("../core/function");
const postData = async (req, res) => {
    try {
        const { product_name, image_url = '', brand = '', status = 'active' } = req.body;
        if (!product_name) {
            res.status(400).json({
                success: false,
                message: 'Fill in required information.',
            });
            return;
        }
        const product_id = (0, function_1.generateID)(req.body.product_id);
        const secretKey = (0, function_1.generateSecretKey)();
        const sql = `
      INSERT INTO product_ 
      (product_id, product_name, image_url, brand, status) 
      VALUES 
      (?, ?, ?, ?, ?)
    `;
        const params = [product_id, product_name, image_url, brand, status];
        const [result] = await db_1.default.execute(sql, params);
        res.json({
            success: true,
            message: 'Data inserted successfully!',
            data: { product_id, product_name },
            secretKey,
            result,
        });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to insert data into the database.',
        });
    }
};
exports.postData = postData;
