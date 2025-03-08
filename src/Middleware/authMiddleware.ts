import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
  }

  //* ดึง Token ออกจาก Authorization header
  const token = authHeader.split(' ')[1];

  if (!process.env.SECRET_KEY) {
    console.error('❌ SECRET_KEY is missing in .env file');
    return res.status(500).json({ success: false, message: 'Internal Server Error: Missing SECRET_KEY' });
  }

  try {
    //* ตรวจสอบความถูกต้องของ Token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //* เก็บข้อมูลที่ decode จาก Token ไว้ใน req.user
    (req as any).user = decoded;

    console.log("✅ Decoded Token:", decoded);
    //* ถ้า Token ถูกต้อง ให้ทำงานต่อไป
    next();
  } catch (error) {
    console.error('❌ JWT Verification Error:', error.message);
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
  }
};

export default authenticate;
