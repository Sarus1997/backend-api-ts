import { Request, Response } from 'express';
import { getDatabasePool } from '../server/db';
import { generateDateTime } from '../core/function';

const deleteData = async (req: Request<{}, {}, { dbName: string; product_id: string }>, res: Response): Promise<void> => {
  try {
    const { dbName, product_id } = req.body;

    //* ตรวจสอบว่ามีการระบุฐานข้อมูลหรือไม่
    if (!dbName) {
      res.status(400).json({ success: false, message: 'Database name is required.' });
      return;
    }

    //* เลือก Connection Pool ตามฐานข้อมูลที่ระบุ
    let pool;
    try {
      pool = getDatabasePool(dbName);
    } catch (error) {
      res.status(400).json({ success: false, message: `Database ${dbName} is not supported.` });
      return;
    }

    //* ตรวจสอบว่ามี product_id หรือไม่
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
        message: `Product with ID ${product_id} not found in ${dbName}.`,
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
    console.error('Error in deleteData:', err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Failed to delete data from the database.',
    });
  }
};

export { deleteData };
