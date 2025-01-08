import { Request, Response } from 'express';
import crypto from 'crypto';
import pool from '../server/db';

const generateSecretKey = (): string => crypto.randomBytes(32).toString('hex');

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

    res.status(200).json({
      success: true,
      message: 'Data fetched successfully.',
      data: rows,
      timestamp: new Date().toISOString(),
      secretKey,
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
