import { Request, Response } from 'express';
import { getDatabasePool } from '../config/env';
import { generateHexID, generateDateTime } from '../core/function';

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

const pool = getDatabasePool('employee_db');

const postData = async (req: Request<{}, {}, ProductData>, res: Response): Promise<void> => {
  try {
    const { image_url, product_name, price, brand, status, created_at, updated_at, product_id } = req.body;

    //* ตรวจสอบค่าที่จำเป็น
    if (!image_url || !product_name || !price || !brand) {
      res.status(400).json({
        success: false,
        message: 'Fill in required information.',
      });
      return;
    }

    //* กำหนดค่าให้ product_id และ timestamps
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
