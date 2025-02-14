"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataID = exports.getFixData = exports.getData = void 0;
const db_1 = __importDefault(require("../server/db"));
const function_1 = require("../core/function");
//* ข้อมูลที่ 1 *//
const getData = async (req, res) => {
    try {
        const sqlProducts = `
      SELECT * FROM product_
    `;
        const [rows] = await db_1.default.query(sqlProducts);
        const datetime = (0, function_1.generateDateTime)();
        res.status(200).json({
            success: true,
            message: 'Data fetched successfully.',
            data: rows,
            datetime,
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
//* ข้อมูลที่ 2 *//
const getFixData = async (req, res) => {
    try {
        const sqlProducts = `
      SELECT
        image_url,
        product_name,
        price,
        brand
      FROM
        product_
    `;
        const [rows] = await db_1.default.query(sqlProducts);
        const datetime = (0, function_1.generateDateTime)();
        res.status(200).json({
            success: true,
            message: 'Data fetched successfully.',
            data: rows,
            datetime,
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
//* ข้อมูลที่ 3 Get Data By ID *//
const getDataID = async (req, res) => {
    try {
        const { product_id } = req.body;
        if (!product_id) {
            res.status(400).json({
                success: false,
                message: 'product_id is required.',
            });
            return;
        }
        const sqlProducts = `
      SELECT
        image_url,
        product_name,
        price,
        brand
      FROM
        product_
      WHERE
        product_id = ?
    `;
        const [rows] = await db_1.default.execute(sqlProducts, [product_id]);
        if (!Array.isArray(rows) || rows.length === 0) {
            res.status(404).json({
                success: false,
                message: `Product with ID ${product_id} not found.`,
            });
            return;
        }
        const datetime = (0, function_1.generateDateTime)();
        res.status(200).json({
            success: true,
            message: 'Data fetched successfully.',
            data: rows[0],
            datetime,
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
