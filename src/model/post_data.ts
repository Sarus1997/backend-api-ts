import { Request, Response } from 'express';
import pool from '../server/db';
import { generateHexID, generateSecretKey, generateDateTime } from '../core/function';

//* สร้าง interface สำหรับ Product Data
interface ProductData {
  image_url: string;
  product_name: string;
  price: number;
  brand: string;
  status?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  product_id?: string;
}

const postData = async (req: Request<{}, {}, ProductData>, res: Response): Promise<void> => {
  try {
    //* ดึงข้อมูลจาก body
    const {
      image_url,
      product_name,
      price,
      brand,
      status,
      created_at,
      updated_at,
    } = req.body;

    //* ตรวจสอบว่าข้อมูลสำคัญครบถ้วนหรือไม่
    if (!image_url || !product_name || !price || !brand) {
      res.status(400).json({
        success: false,
        message: 'Fill in required information.',
      });
      return;
    }

    //* ถ้าไม่มี product_id ให้สร้างขึ้นใหม่
    const product_id = req.body.product_id || generateHexID();

    //* สร้างคีย์ลับและเวลา
    const secretKey = generateSecretKey();
    const datetime = generateDateTime();

    //* ตั้งค่าเริ่มต้น
    const productStatus = status || 'active';
    const date_created = created_at || new Date();
    const date_update = updated_at || null; // ใช้ null แทน 0 เพื่อความชัดเจน

    //* สร้าง SQL query
    const sql = `
      INSERT INTO product_ 
      (product_id, image_url, product_name, price, brand, status, created_at, updated_at) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      product_id,
      image_url,
      product_name,
      price,
      brand,
      productStatus,
      date_created,
      date_update,
    ];

    //* ใช้ MySQL Pool เพื่อทำการ execute query
    const [result] = await pool.execute(sql, params);

    //* ส่งผลลัพธ์กลับไป
    res.json({
      success: true,
      message: 'Data inserted successfully!',
      data: { product_id, product_name },
      result,
      secretKey,
      datetime
    });
  } catch (err) {
    //* จัดการข้อผิดพลาด
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Failed to insert data into the database.',
    });
  }
};

export { postData };
