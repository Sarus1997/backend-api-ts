import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//* Dummy ข้อมูลผู้ใช้
const users = [{ username: 'admin', password: '1234' }];

export const createToken = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  //* สร้าง JWT Token
  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY as string, { expiresIn: '1h' });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
  });
};

