import { Request, Response } from 'express';
import pool from '../server/db';  // เชื่อมต่อฐานข้อมูล
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usernameOrEmail, password } = req.body;

    //* ตรวจสอบข้อมูลที่จำเป็น
    if (!usernameOrEmail || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
      return;
    }

    //* ค้นหาผู้ใช้จากฐานข้อมูล โดยใช้ username หรือ email
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [usernameOrEmail, usernameOrEmail]
    );
    const user = (rows as any)[0];

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    //* ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    //* สร้าง JWT Token โดยใช้ SECRET_KEY จาก .env
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.SECRET_KEY as string,
      { expiresIn: '1h' }
    );

    //* ส่ง Token กลับไปให้ผู้ใช้
    res.json({
      success: true,
      message: 'getLogin successful!',
      data: {
        id: user.id,
        email: user.email,
        f_name: user.f_name,
        l_name: user.l_name,
        profile_picture: user.profile_picture,
        role: user.role
      },
      token,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }
};

export { postLogin };

