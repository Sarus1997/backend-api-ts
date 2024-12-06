"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_data = void 0;
const db_1 = __importDefault(require("../server/db"));
const post_data = async (req, res) => {
    try {
        const { first_name, last_name } = req.body;
        if (!first_name || !last_name) {
            res.status(400).json({
                success: false,
                message: 'First name and last name are required.',
            });
            return;
        }
        const sql = `
      INSERT INTO employees_ 
      (first_name, last_name) 
      VALUES 
      (?, ?)
    `;
        const params = [first_name, last_name];
        await db_1.default.execute(sql, params);
        res.json({
            success: true,
            message: 'Employee data inserted successfully!',
        });
    }
    catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to insert data into the database.',
        });
    }
};
exports.post_data = post_data;
