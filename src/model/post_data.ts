import { Request, Response } from 'express';
import { getDatabasePool } from '../server/db';
import { generateHexID, generateDateTime } from '../core/function';

interface ProductData {
  dbName: string; // เพิ่ม database name
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
    const {
      dbName,
      image_url,
      product_name,
      price,
      brand,
      status,
      created_at,
      updated_at,
      product_id,
    } = req.body;

    // ตรวจสอบว่า dbName ถูกส่งมาหรือไม่
    if (!dbName || typeof dbName !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Database name is required.',
      });
      return;
    }

    // ตรวจสอบค่าที่จำเป็น
    if (!image_url || !product_name || !price || !brand) {
      res.status(400).json({
        success: false,
        message: 'Fill in required information.',
      });
      return;
    }

    // ใช้ database pool ตาม dbName
    const pool = getDatabasePool(dbName);

    // กำหนดค่าให้ product_id และ timestamps
    const newProductId = product_id || generateHexID();
    const datetime = generateDateTime();
    const productStatus = status || 'active';
    const date_created = created_at || new Date();
    const date_update = updated_at || null;

    const sql = `
      INSERT INTO product_ 
      (product_id, image_url, product_name, price, brand, status, created_at, updated_at) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      newProductId,
      image_url,
      product_name,
      price,
      brand,
      productStatus,
      date_created,
      date_update,
    ];
    const [result] = await pool.execute(sql, params);

    res.json({
      success: true,
      message: 'Data inserted successfully!',
      data: { product_id: newProductId, product_name },
      result,
      datetime,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Failed to insert data into the database.',
    });
  }
};

export { postData };
