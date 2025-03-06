"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = void 0;
const env_1 = require("../config/env");
const function_1 = require("../core/function");
const deleteData = async (req, res) => {
    try {
        const { product_id } = req.body;
        //* ตรวจสอบว่ามี product_id หรือไม่
        if (!product_id) {
            res.status(400).json({
                success: false,
                message: 'product_id is required.',
            });
            return;
        }
        //* ใช้ฐานข้อมูล employee_db
        const pool = (0, env_1.getDatabasePool)("employee_db");
        const datetime = (0, function_1.generateDateTime)();
        const sql = `
      DELETE FROM product_
      WHERE product_id = ?
    `;
        const params = [product_id];
        const [result] = await pool.execute(sql, params);
        if (result.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: `Product with ID ${product_id} not found in employee_db.`,
            });
            return;
        }
        res.json({
            success: true,
            message: 'Data deleted successfully!',
            result,
            datetime,
        });
    }
    catch (err) {
        console.error('Error in deleteData:', err);
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : 'Failed to delete data from the database.',
        });
    }
};
exports.deleteData = deleteData;
