import { Request, Response } from 'express';
import pool from '../server/db';
import { generateHexID, generateSecretKey, generateDateTime } from '../core/function';

const postData = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      image_url,
      product_name,
      price,
      brand,
      status,
      created_at,
      updated_at,
    } = req.body;

    if (!image_url || !product_name || !price || !brand) {
      res.status(400).json({
        success: false,
        message: 'Fill in required information.',
      });
      return;
    }

    const product_id = generateHexID(req.body.product_id);

    //* สร้างคีย์ลับเฉพาะสำหรับการตอบสนอง
    const secretKey = generateSecretKey();
    const datetime = generateDateTime();

    //* ตั้งค่าเริ่มต้น
    const productStatus = status || 'active';
    const date_created = created_at || new Date();
    const date_update = updated_at || '0';

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

    const [result] = await pool.execute(sql, params);

    res.json({
      success: true,
      message: 'Data inserted successfully!',
      data: { product_id, product_name },
      result,
      secretKey,
      datetime
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