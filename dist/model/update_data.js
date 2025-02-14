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
        const { product_id, image_url, product_name, price, brand, status, updated_at } = req.body;
        if (!product_id) {
            res.status(400).json({ success: false, message: 'product_id is required.' });
            return;
        }
        const datetime = (0, function_1.generateDateTime)();
        const fieldsToUpdate = [];
        const params = [];
        const fields = {
            image_url,
            product_name,
            price,
            brand,
            status,
            updated_at: updated_at || new Date()
        };
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) {
                fieldsToUpdate.push(`${key} = ?`);
                params.push(value);
            }
        }
        if (fieldsToUpdate.length === 0) {
            res.status(400).json({ success: false, message: 'No fields to update.' });
            return;
        }
        const sql = `UPDATE product_ SET ${fieldsToUpdate.join(', ')} WHERE product_id = ?`;
        params.push(product_id);
        const [result] = await db_1.default.execute(sql, params);
        if (result.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: `Product with ID ${product_id} not found or no changes were made.`,
            });
            return;
        }
        res.json({
            success: true,
            message: 'Data updated successfully!',
            data: { product_id, product_name },
            result,
            datetime,
        });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Failed to update data in the database.' });
    }
};
exports.updateData = updateData;
