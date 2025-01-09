import { Request, Response } from 'express';
import pool from '../server/db';
import { generateSecretKey, generateDateTime } from '../core/function';

const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlProducts = `
      SELECT
        *
      FROM
        product_
    `;

    //* Fetch data from the database
    const [rows] = await pool.query(sqlProducts);

    //* Generate a unique secret key for the response
    const secretKey = generateSecretKey();
    const datetime = generateDateTime();

    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows,
      secretKey,
      datetime
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

export { getData };
