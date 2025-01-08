import { Request, Response } from 'express';
import crypto from 'crypto';
import pool from '../server/db';

// ฟังก์ชันสำหรับสร้าง secret key
const generateSecretKey = (): string => crypto.randomBytes(32).toString('hex');

const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    // SQL query สำหรับดึงข้อมูลสินค้า
    const sqlProducts = `
      SELECT
        *
      FROM
        __pos_product
    `;

    // ดึงข้อมูลจากฐานข้อมูล
    const [rows] = await pool.query(sqlProducts);

    // สร้าง secret key ใหม่สำหรับคำร้องนี้
    const secretKey = generateSecretKey();

    // ส่งข้อมูลกลับไปยัง client
    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows,
      timestamp: new Date().toISOString(), // ใช้รูปแบบ ISO สำหรับ timestamp
      secretKey,
    });
  } catch (error: any) {
    console.error('Error fetching data:', error);

    // จัดการข้อผิดพลาดโดยส่งข้อความที่เหมาะสม
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data from the database.',
      error: error.message || 'Unknown error occurred.',
    });
  }
};

export { getData };
