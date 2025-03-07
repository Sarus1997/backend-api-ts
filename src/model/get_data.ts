import { Request, Response } from 'express';
import { getDatabasePool } from '../config/env';
import { generateDateTime } from '../core/function';

//* ใช้ employee_db เป็นค่า default
const pool = getDatabasePool('employee_db');

//* ฟังก์ชันดึงข้อมูลทั้งหมด *//
const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("🔹 Received Authorization Header:", req.headers.authorization);

    const sqlProducts = `SELECT * FROM product_`;
    const [rows] = await pool.query(sqlProducts);

    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows,
      datetime: generateDateTime(),
    });
  } catch (error: any) {
    console.error(`Error fetching data [${req.method} ${req.url}]:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data from the database.',
      error: error.message || 'Unknown error occurred.',
    });
  }
};


//* ฟังก์ชันดึงข้อมูลเฉพาะบางคอลัมน์ *//
const getFixData = async (req: Request, res: Response): Promise<void> => {
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
      datetime: generateDateTime(),
    });
  } catch (error: any) {
    console.error(`Error fetching data [${req.method} ${req.url}]:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data from the database.',
      error: error.message || 'Unknown error occurred.',
    });
  }
};

//* ฟังก์ชันดึงข้อมูลตาม ID *//
const getDataID = async (req: Request, res: Response): Promise<void> => {
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
      datetime: generateDateTime(),
    });
  } catch (error: any) {
    console.error(`Error fetching data [${req.method} ${req.url}]:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data from the database.',
      error: error.message || 'Unknown error occurred.',
    });
  }
};

export { getData, getFixData, getDataID };
