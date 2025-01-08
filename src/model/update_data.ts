import { Request, Response } from 'express';
import pool from '../server/db';
import { generateSecretKey } from '../core/function';

const updateData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id, product_name, image_url = '', brand = '', status = 'active' } = req.body;

    if (!product_id || !product_name) {
      res.status(400).json({
        success: false,
        message: 'Fill in required information.',
      });
      return;
    }

    const secretKey = generateSecretKey();

    const sql = `
      UPDATE product_
      SET product_name = ?, image_url = ?, brand = ?, status = ?
      WHERE product_id = ?
    `;
    const params = [product_name, image_url, brand, status, product_id];

    const [result] = await pool.execute(sql, params);

    res.json({
      success: true,
      message: 'Data updated successfully!',
      data: { product_id, product_name },
      secretKey,
      result,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update data in the database.',
    });
  }
};

export { updateData };