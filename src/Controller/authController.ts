import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// ฟังก์ชันสร้าง JWT Token
const generateToken = (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required' });
  }

  if (!process.env.SECRET_KEY) {
    console.error('❌ SECRET_KEY is missing in .env file');
    return res.status(500).json({ success: false, message: 'Internal Server Error: Missing SECRET_KEY' });
  }

  // สร้าง JWT Token
  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });

  console.log("✅ Generated Token:", token);
  res.status(200).json({ success: true, token });
};

export { generateToken };
