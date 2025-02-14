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
        const { image_url, product_name, price, brand, status, created_at, updated_at, } = req.body;
        if (!image_url || !product_name || !price || !brand) {
            res.status(400).json({
                success: false,
                message: 'Fill in required information.',
            });
            return;
        }
        const product_id = req.body.product_id || (0, function_1.generateHexID)();
        const datetime = (0, function_1.generateDateTime)();
        const productStatus = status || 'active';
        const date_created = created_at || new Date();
        const date_update = updated_at || null;
        const sql = `
      INSERT INTO product_ 
      (product_id, image_url, product_name, price, brand, status, created_at, updated_at) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const params = [
            product_id,
            image_url,
            product_name,
            price,
            brand,
            productStatus,
            date_created,
            date_update,
        ];
        const [result] = await db_1.default.execute(sql, params);
        res.json({
            success: true,
            message: 'Data inserted successfully!',
            data: { product_id, product_name },
            result,
            datetime
        });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : 'Failed to insert data into the database.',
        });
    }
};
exports.postData = postData;
