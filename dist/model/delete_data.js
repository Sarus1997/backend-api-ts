"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = void 0;
const db_1 = __importDefault(require("../server/db"));
const function_1 = require("../core/function");
const deleteData = async (req, res) => {
    try {
        const { product_id } = req.body;
        if (!product_id) {
            res.status(400).json({
                success: false,
                message: 'product_id is required.',
            });
            return;
        }
        const secretKey = (0, function_1.generateSecretKey)();
        const sql = `
      DELETE FROM product_
      WHERE product_id = ?
    `;
        const params = [product_id];
        const [result] = await db_1.default.execute(sql, params);
        if (result.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: `Product with ID ${product_id} not found.`,
            });
            return;
        }
        res.json({
            success: true,
            message: 'Data deleted successfully!',
            secretKey,
            result,
        });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete data from the database.',
        });
    }
};
exports.deleteData = deleteData;
