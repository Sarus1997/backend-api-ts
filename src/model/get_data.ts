import { Request, Response } from 'express';
import pool from '../server/db';
import { generateDateTime } from '../core/function';

const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlProducts = `
      SELECT * FROM product_
    `;
    const [rows] = await pool.query(sqlProducts);
    const datetime = generateDateTime();
    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows,
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

//* ข้อมูลที่ 2 *//
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
    const [rows] = await pool.query(sqlProducts);
    const datetime = generateDateTime();
    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows,
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
