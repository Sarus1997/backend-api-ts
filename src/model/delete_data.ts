import { Request, Response } from 'express';
import pool from '../server/db';
import { generateSecretKey, generateDateTime } from '../core/function';

const deleteData = async (req: Request<{}, {}, { product_id: string }>, res: Response): Promise<void> => {
  try {
    const { product_id } = req.body;

    //* ตรวจสอบว่า product_id ถูกส่งมาหรือไม่
    if (!product_id) {
      res.status(400).json({
        success: false,
        message: 'product_id is required.',
      });
      return;
    }

    //* สร้างคีย์ลับและเวลาปัจจุบัน
    const secretKey = generateSecretKey();
    const datetime = generateDateTime();

    //* SQL สำหรับการลบข้อมูล
    const sql = `
      DELETE FROM product_
      WHERE product_id = ?
    `;
    const params = [product_id];

    //* ใช้ MySQL Pool เพื่อ execute SQL
    const [result] = await pool.execute(sql, params);

    //* ตรวจสอบว่าไม่มีแถวที่ถูกลบ
    if ((result as any).affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `Product with ID ${product_id} not found.`,
      });
      return;
    }

    //* ส่งผลลัพธ์กลับไป
    res.json({
      success: true,
      message: 'Data deleted successfully!',
      result,
      secretKey, //* ส่งคีย์ลับกลับหากจำเป็น
      datetime,  //* ส่งเวลาปัจจุบันกลับหากจำเป็น
    });
  } catch (err) {
    //* จัดการข้อผิดพลาด
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Failed to delete data from the database.',
    });
  }
};

export { deleteData };
