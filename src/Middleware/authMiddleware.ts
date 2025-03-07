import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];

  if (!process.env.SECRET_KEY) {
    console.error('❌ SECRET_KEY is missing in .env file');
    return res.status(500).json({ success: false, message: 'Internal Server Error: Missing SECRET_KEY' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    (req as any).user = decoded;

    console.log("✅ Decoded Token:", decoded);
    next();
  } catch (error) {
    console.error('❌ JWT Verification Error:', error.message);
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
  }
};

export default authenticate;
