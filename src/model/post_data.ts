import { Request, Response } from 'express';
import pool from '../server/db';

const postData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
      res.status(400).json({
        success: false,
        message: 'Fill in required information.',
      });
      return;
    }

    const sql = `
      INSERT INTO employees_ 
      (first_name, last_name) 
      VALUES 
      (?, ?)
    `;

    const params = [first_name, last_name];

    await pool.execute(sql, params);

    res.json({
      success: true,
      message: 'Data Inserted Successfully!',
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to insert data into the database.',
    });
  }
};

export { postData };