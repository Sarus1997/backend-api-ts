"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = void 0;
const db_1 = __importDefault(require("../server/db"));
const function_1 = require("../core/function");
const updateData = async (req, res) => {
    try {
        const { product_id, product_name, image_url = '', brand = '', status = 'active' } = req.body;
        if (!product_id || !product_name) {
            res.status(400).json({
                success: false,
                message: 'Fill in required information.',
            });
            return;
        }
        const secretKey = (0, function_1.generateSecretKey)();
        const sql = `
      UPDATE product_
      SET product_name = ?, image_url = ?, brand = ?, status = ?
      WHERE product_id = ?
    `;
        const params = [product_name, image_url, brand, status, product_id];
        const [result] = await db_1.default.execute(sql, params);
        res.json({
            success: true,
            message: 'Data updated successfully!',
            data: { product_id, product_name },
            secretKey,
            result,
        });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to update data in the database.',
        });
    }
};
exports.updateData = updateData;
