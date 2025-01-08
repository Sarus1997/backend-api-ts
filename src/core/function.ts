import { Request, Response } from 'express';
import pool from '../server/db';

const delete_data = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID is required.',
      });
      return;
    }

    const sql = `
      DELETE FROM employees_
      WHERE id = ?
    `;

    const params = [id];

    const [result]: any = await pool.execute(sql, params);

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `Data with ID ${id} not found.`,
      });
      return;
    }

    res.json({
      success: true,
      message: 'Data Deleted Successfully!',
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete data from the database.',
    });
  }
};

export { delete_data };
