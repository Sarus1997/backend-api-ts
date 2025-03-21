import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { generateHexID, generateDateTime } from '../../core/function';
import { getDatabasePool } from '../../config/env';
import rateLimit from 'express-rate-limit';

interface ProductData {
  username: string;
  email: string;
  password_hash: string;
  f_name: string;
  l_name: string;
  profile_picture?: string;
  oauth_provider?: string;
  role?: string;
  oauth_id?: string;
  status?: string;
  last_login_at?: string | Date;
  reset_token?: string;
  reset_token_expires_at?: string | Date;
  created_at?: string | Date;
  updated_at?: string | Date;
  id?: string;
}

//* ใช้ฐานข้อมูล employee_db
const pool = getDatabasePool('employee_db');

//* จำกัดการสมัครไม่ให้เกิด Brute Force Attack
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 5, // จำกัด 5 requests ต่อ 15 นาที ต่อ IP
  message: 'Too many registration attempts. Please try again later.',
});

const postRegister = async (req: Request<{}, {}, ProductData>, res: Response): Promise<void> => {
  try {
    let { username, email, password_hash, f_name, l_name, profile_picture, status, created_at, updated_at } = req.body;

    //* ตรวจสอบข้อมูลที่จำเป็น
    if (!username || !email || !password_hash || !f_name || !l_name) {
      res.status(400).json({ success: false, message: 'Fill in required information.' });
      return;
    }

    //* Sanitize input เพื่อลดความเสี่ยง SQL Injection
    username = username.trim();
    email = email.trim().toLowerCase();

    //* ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Invalid email format.' });
      return;
    }

    //* ตรวจสอบความยาวของรหัสผ่าน
    if (password_hash.length < 10) {
      res.status(400).json({ success: false, message: 'Password must be at least 10 characters long.' });
      return;
    }

    //* ตรวจสอบข้อมูลซ้ำ (Username และ Email)
    const [userCheck] = await pool.execute(
      'SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    const userExists = (userCheck as any)[0].count > 0;

    //* ป้องกัน Timing Attack โดยเพิ่ม bcrypt.compare() แบบสุ่ม
    await bcrypt.compare("test", "$2b$12$something");

    if (userExists) {
      res.status(400).json({ success: false, message: 'Registration failed. Please try again.' });
      return;
    }

    //* เข้ารหัสรหัสผ่านด้วย bcrypt
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    //* กำหนดค่า Default และสร้างค่าใหม่
    const id = req.body.id || generateHexID();
    const datetime = generateDateTime();
    const oauth_provider = req.body.oauth_provider || "email";
    const allowedRoles = ['user', 'admin'];
    const userRole = req.body.role && allowedRoles.includes(req.body.role) ? req.body.role : 'user';
    const oauth_id = req.body.oauth_id || null;
    const registerStatus = status || "active";
    const last_login_at = req.body.last_login_at || new Date();

    //* ป้องกัน token leak โดยการเข้ารหัส reset_token
    const reset_token = crypto.randomBytes(32).toString('hex');
    const hashed_reset_token = await bcrypt.hash(reset_token, 10);

    const reset_token_expires_at = req.body.reset_token_expires_at || new Date();
    const date_created = created_at || new Date();
    const date_update = updated_at || null;

    //* Query สำหรับ Insert ข้อมูลลงฐานข้อมูล
    const sql = `
      INSERT INTO users 
      (id, username, email, password_hash, f_name, l_name, profile_picture, oauth_provider, role, oauth_id, status, last_login_at, reset_token, reset_token_expires_at, created_at, updated_at) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      id,
      username,
      email,
      hashedPassword,
      f_name,
      l_name,
      profile_picture || null,
      oauth_provider || null,
      userRole,
      oauth_id || null,
      registerStatus,
      last_login_at,
      hashed_reset_token, //* เก็บ reset_token ที่เข้ารหัสแล้ว
      reset_token_expires_at || null,
      date_created,
      date_update
    ];

    const [result] = await pool.execute(sql, params);

    res.json({
      success: true,
      message: 'User registered successfully!',
      data: { id, email },
      result,
      datetime
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }
};

export { registerLimiter, postRegister };
