import { Request, Response } from 'express';
import pool from '../server/db';
import { generateSecretKey, generateProductId } from '../core/function';

const postData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_name, image_url = '', brand = '', status = 'active' } = req.body;

    if (!product_name) {
      res.status(400).json({
        success: false,
        message: 'Fill in required information.',
      });
      return;
    }

    const product_id = generateProductId(req.body.product_id);
    const secretKey = generateSecretKey();

    const sql = `
      INSERT INTO product_ 
      (product_id, product_name, image_url, brand, status) 
      VALUES 
      (?, ?, ?, ?, ?)
    `;
    const params = [product_id, product_name, image_url, brand, status];

    const [result] = await pool.execute(sql, params);

    res.json({
      success: true,
      message: 'Data inserted successfully!',
      data: { product_id, product_name },
      secretKey,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to insert data into the database.',
    });
  }
};

export { postData };