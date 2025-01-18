import { Request, Response } from 'express';
import pool from '../server/db';
import { generateSecretKey, generateDateTime } from '../core/function';

//* ฟังก์ชันดึงข้อมูลทั้งหมดจากฐานข้อมูล
const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlProducts = `
      SELECT
        *
      FROM
        product_
    `;

    //* ดึงข้อมูลจากฐานข้อมูล
    const [rows] = await pool.query(sqlProducts);

    //* สร้างคีย์ลับเฉพาะสำหรับการตอบสนอง
    const secretKey = generateSecretKey();
    const datetime = generateDateTime();

    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows,
      secretKey,
      datetime,
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

//* ฟังก์ชันดึงข้อมูลที่มีฟิลด์เฉพาะจากฐานข้อมูล
const getFixData = async (req: Request, res: Response): Promise<void> => {
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

    //* ดึงข้อมูลจากฐานข้อมูล
    const [rows] = await pool.query(sqlProducts);

    //* สร้างคีย์ลับเฉพาะสำหรับการตอบสนอง
    const secretKey = generateSecretKey();
    const datetime = generateDateTime();

    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows,
      secretKey,
      datetime,
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

export { getData, getFixData };
