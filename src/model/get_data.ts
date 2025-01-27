import { Request, Response } from 'express';
import pool from '../server/db';
import { generateDateTime } from '../core/function';

//* ข้อมูลที่ 1 *//
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

//* ข้อมูลที่ 3 Get Data By ID *//
const getDataID = async (req: Request<{}, {}, { product_id: string }>, res: Response): Promise<void> => {
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
    const [rows] = await pool.execute(sqlProducts, [product_id]);
    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `Product with ID ${product_id} not found.`,
      });
      return;
    }
    const datetime = generateDateTime();
    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows[0],
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

export { getData, getFixData, getDataID };
