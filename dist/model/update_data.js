"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = void 0;
const env_1 = require("../config/env");
const function_1 = require("../core/function");
const updateData = async (req, res) => {
    try {
        const { product_id, image_url, product_name, price, brand, status, updated_at } = req.body;
        if (!product_id) {
            res.status(400).json({ success: false, message: 'product_id is required.' });
            return;
        }
        //* กำหนดฐานข้อมูลตายตัว
        const pool = (0, env_1.getDatabasePool)('employee_db');
        const datetime = (0, function_1.generateDateTime)();
        const fieldsToUpdate = [];
        const params = [];
        const fields = {
            image_url,
            product_name,
            price,
            brand,
            status,
            updated_at: updated_at || datetime, // ใช้ generateDateTime() แทน new Date()
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
        const sql = `UPDATE products SET ${fieldsToUpdate.join(', ')} WHERE product_id = ?`;
        params.push(product_id);
        const [result] = await pool.execute(sql, params);
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
