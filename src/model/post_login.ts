import { Request, Response } from 'express';
import { getDatabasePool } from '../server/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    let { dbName, usernameOrEmail, password } = req.body;

    //* กำหนดค่าเริ่มต้นให้ dbName ถ้าไม่มีการส่งมา
    if (!dbName) {
      dbName = "employee_db";
    }

    //* เลือก Connection Pool ตามฐานข้อมูลที่ระบุ
    let pool;
    try {
      pool = getDatabasePool(dbName);
    } catch (error) {
      res.status(400).json({ success: false, message: `Database ${dbName} is not supported.` });
      return;
    }

    //* ตรวจสอบข้อมูลที่จำเป็น
    if (!usernameOrEmail || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide both username/email and password.',
      });
      return;
    }

    //* ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const [rows] = await pool.execute(
      'SELECT id, username, email, password_hash, f_name, l_name, profile_picture, role FROM users WHERE username = ? OR email = ? LIMIT 1',
      [usernameOrEmail, usernameOrEmail]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
      return;
    }

    const user = (rows as any)[0];

    //* ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
      return;
    }

    //* ตรวจสอบว่า SECRET_KEY มีค่าหรือไม่
    if (!process.env.SECRET_KEY) {
      console.error('JWT SECRET_KEY is not defined in environment variables.');
      res.status(500).json({ success: false, message: 'Internal server error.' });
      return;
    }

    //* สร้าง JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    //* ส่งข้อมูลผู้ใช้กลับไปพร้อม Token
    res.json({
      success: true,
      message: 'Login successful!',
      data: {
        id: user.id,
        email: user.email,
        f_name: user.f_name,
        l_name: user.l_name,
        profile_picture: user.profile_picture,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error('Error in postLogin:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }
};


export { postLogin };
