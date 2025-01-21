import { Request, Response } from 'express';
import pool from '../server/db';
import { generateDateTime } from '../core/function';

const deleteData = async (req: Request<{}, {}, { product_id: string }>, res: Response): Promise<void> => {
  try {
    const { product_id } = req.body;
    if (!product_id) {
      res.status(400).json({
        success: false,
        message: 'product_id is required.',
      });
      return;
    }

    const datetime = generateDateTime();
    const sql = `
      DELETE FROM product_
      WHERE product_id = ?
    `;
    const params = [product_id];
    const [result] = await pool.execute(sql, params);
    if ((result as any).affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `Product with ID ${product_id} not found.`,
      });
      return;
    }
    res.json({
      success: true,
      message: 'Data deleted successfully!',
      result,
      datetime,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Failed to delete data from the database.',
    });
  }
};

export { deleteData };
