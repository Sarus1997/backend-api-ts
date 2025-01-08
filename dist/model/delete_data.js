"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = void 0;
const db_1 = __importDefault(require("../server/db"));
const deleteData = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'ID is required.',
            });
            return;
        }
        const sql = `
      DELETE FROM employees_
      WHERE id = ?
    `;
        const params = [id];
        const [result] = await db_1.default.execute(sql, params);
        if (result.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: `Data with ID ${id} not found.`,
            });
            return;
        }
        res.json({
            success: true,
            message: 'Data Deleted Successfully!',
        });
    }
    catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete data from the database.',
        });
    }
};
exports.deleteData = deleteData;
