"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = void 0;
const db_1 = __importDefault(require("../server/db"));
const updateData = async (req, res) => {
    try {
        const { id, first_name, last_name } = req.body;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'ID is required.',
            });
            return;
        }
        if (!first_name || !last_name) {
            res.status(400).json({
                success: false,
                message: 'First name and last name are required.',
            });
            return;
        }
        const sql = `
      UPDATE employees_
        SET first_name = ?, 
        last_name = ?
      WHERE id = ?
    `;
        const params = [first_name, last_name, id];
        const [result] = await db_1.default.execute(sql, params);
        if (result.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: `Employee with ID ${id} not found.`,
            });
            return;
        }
        res.json({
            success: true,
            message: 'Data Updated Successfully!',
        });
    }
    catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update data in the database.',
        });
    }
};
exports.updateData = updateData;
