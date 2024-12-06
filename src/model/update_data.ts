import { Request, Response } from 'express';
import pool from '../server/db';

const update_data = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, first_name, last_name } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID is required.',
      });
      return;
    }

    if (!first_name || !last_name) {
      res.status(400).json({
        success: false,
        message: 'First name and last name are required.',
      });
      return;
    }

    const sql = `
      UPDATE employees_
      SET first_name = ?, last_name = ?
      WHERE id = ?
    `;

    const params = [first_name, last_name, id];

    const [result]: any = await pool.execute(sql, params);

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `Employee with ID ${id} not found.`,
      });
      return;
    }

    res.json({
      success: true,
      message: 'Employee data updated successfully!',
    });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update data in the database.',
    });
  }
};


export { update_data };
