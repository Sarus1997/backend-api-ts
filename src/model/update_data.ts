import { Request, Response } from 'express';
import pool from '../server/db';
import { generateSecretKey, generateDateTime } from "../core/function";

const updateData = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      product_id,
      image_url,
      product_name,
      price,
      brand,
      status,
      updated_at
    } = req.body;

    if (!product_id) {
      res.status(400).json({ success: false, message: 'product_id is required.' });
      return;
    }

    //* สร้างคีย์ลับเฉพาะสำหรับการตอบสนอง
    const secretKey = generateSecretKey();
    const datetime = generateDateTime();

    //* ตั้งค่าเริ่มต้นสำหรับฟิลด์ที่จะอัปเดต
    const fieldsToUpdate: string[] = [];
    const params: any[] = [];

    const fields = {
      image_url,
      product_name,
      price,
      brand,
      status,
      updated_at: updated_at || new Date()
    };

    //* สร้างคำสั่ง SQL สำหรับอัปเดตฟิลด์ที่มีการเปลี่ยนแปลง
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        fieldsToUpdate.push(`${key} = ?`);
        params.push(value);
      }
    }

    if (fieldsToUpdate.length === 0) {
      res.status(400).json({ success: false, message: 'No fields to update.' });
      return;
    }

    //* เพิ่ม product_id ลงใน params เพื่อใช้ใน WHERE condition
    const sql = `UPDATE product_ SET ${fieldsToUpdate.join(', ')} WHERE product_id = ?`;
    params.push(product_id);

    //* ทำการ execute คำสั่ง SQL
    const [result] = await pool.execute(sql, params);

    //* ตรวจสอบว่าได้อัปเดตข้อมูลจริงๆ หรือไม่
    if ((result as any).affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `Product with ID ${product_id} not found or no changes were made.`,
      });
      return;
    }

    res.json({
      success: true,
      message: 'Data updated successfully!',
      data: { product_id, product_name },
      result,
      secretKey,
      datetime,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Failed to update data in the database.' });
  }
};

export { updateData };
