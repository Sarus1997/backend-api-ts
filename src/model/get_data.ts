import { Request, Response } from 'express';
import crypto from 'crypto';
import pool from '../server/db';

// Function to generate a secret key
const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate secret key once
const secretKey = generateSecretKey();

const get_data = async (req: Request, res: Response): Promise<void> => {
  try {
    //* SQL query to fetch all employee data *//
    const sqlProducts = `
      SELECT
        id,
        first_name,
        last_name
      FROM
        employees_
    `;

    //* Execute query *//
    const [rows] = await pool.query(sqlProducts);

    //* Respond with employee data *//
    res.json({
      success: true,
      message: 'Data Fetched Successfully.',
      employeeData: rows,
      timestamp: new Date().toLocaleString(),
      secretKey,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data from the database.',
      error: error.message,
    });
  }
};

export { get_data };