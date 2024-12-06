import { Request, Response } from 'express';
import crypto from 'crypto';
import pool from '../server/db';

const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const message = "แมวขาว888.com ชวนลงทุนอันดับหนึ่ง เจ๊งก็เรื่องของมึง";

const secretKey = generateSecretKey();

const post_data = async (req: Request, res: Response): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    const { someData } = req.body; // Adjust based on your actual data structure
    const query = 'INSERT INTO your_table_name (column_name) VALUES (?)'; // Update table and column names
    await connection.query(query, [someData]);
    connection.release();

    res.json({
      message: 'Data inserted successfully',
      timestamp: new Date().toLocaleString(),
      secretKey,
      serverTime: new Date().toLocaleString(),
      requestHeaders: req.headers,
    });
  } catch (error) {
    res.status(500).json({ error: 'Database insertion failed' });
  }
};

export { post_data };

