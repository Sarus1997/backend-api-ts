"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataID = exports.getFixData = exports.getData = void 0;
const env_1 = require("../config/env");
const function_1 = require("../core/function");
//* ใช้ employee_db เป็นค่า default
const pool = (0, env_1.getDatabasePool)('employee_db');
//* ฟังก์ชันดึงข้อมูลทั้งหมด *//
const getData = async (req, res) => {
    try {
        const sqlProducts = `SELECT * FROM product_`;
        const [rows] = await pool.query(sqlProducts);
        res.status(200).json({
            success: true,
            message: 'Data fetched successfully.',
            data: rows,
            datetime: (0, function_1.generateDateTime)(),
        });
    }
    catch (error) {
        console.error(`Error fetching data [${req.method} ${req.url}]:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data from the database.',
            error: error.message || 'Unknown error occurred.',
        });
    }
};
exports.getData = getData;
//* ฟังก์ชันดึงข้อมูลเฉพาะบางคอลัมน์ *//
const getFixData = async (req, res) => {
    try {
        const sqlProducts = `
      SELECT image_url, product_name, price, brand
      FROM product_
    `;
        const [rows] = await pool.query(sqlProducts);
        res.status(200).json({
            success: true,
            message: 'Data fetched successfully.',
            data: rows,
            datetime: (0, function_1.generateDateTime)(),
        });
    }
    catch (error) {
        console.error(`Error fetching data [${req.method} ${req.url}]:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data from the database.',
            error: error.message || 'Unknown error occurred.',
        });
    }
};
exports.getFixData = getFixData;
//* ฟังก์ชันดึงข้อมูลตาม ID *//
const getDataID = async (req, res) => {
    try {
        const { product_id } = req.body;
        if (!product_id) {
            res.status(400).json({ success: false, message: 'product_id is required.' });
            return;
        }
        const sqlProducts = `
      SELECT image_url, product_name, price, brand
      FROM product_
      WHERE product_id = ?
    `;
        const [rows] = await pool.execute(sqlProducts, [product_id]);
        if (!Array.isArray(rows) || rows.length === 0) {
            res.status(404).json({
                success: false,
                message: `Product with ID ${product_id} not found.`,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Data fetched successfully.',
            data: rows[0],
            datetime: (0, function_1.generateDateTime)(),
        });
    }
    catch (error) {
        console.error(`Error fetching data [${req.method} ${req.url}]:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data from the database.',
            error: error.message || 'Unknown error occurred.',
        });
    }
};
exports.getDataID = getDataID;
