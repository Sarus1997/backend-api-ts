import { Request, Response } from 'express'; // นำเข้า Request และ Response จาก express
import crypto from 'crypto';

// ฟังก์ชั่นในการสร้างรหัสลับแบบสุ่ม
const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const message: string = "แมวขาว888.com ชวนลงทุนอันดับหนึ่ง เจ๊งก็เรื่องของมึง";

// สร้างคีย์ลับแบบสุ่มทุกครั้งที่เซิร์ฟเวอร์เริ่มต้น
const secretKey: string = generateSecretKey();

// ฟังก์ชันที่ใช้ใน route
export const get_data = (req: Request, res: Response): void => {
  res.json({
    message,
    timestamp: new Date().toLocaleString(),
    secretKey,
    serverTime: new Date().toLocaleString(),
    requestHeaders: req.headers,
    requestBody: req.body,
  });
};
