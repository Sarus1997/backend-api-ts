import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { generateHexID, generateDateTime } from '../core/function';
import { getDatabasePool } from '../config/env';

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

const pool = getDatabasePool('employee_db'); // ใช้ฐานข้อมูล employee_db ตายตัว

const postRegister = async (req: Request<{}, {}, ProductData>, res: Response): Promise<void> => {
  try {
    const { username, email, password_hash, f_name, l_name, profile_picture, status, created_at, updated_at } = req.body;

    //* ตรวจสอบข้อมูลที่จำเป็น
    if (!username || !email || !password_hash || !f_name || !l_name) {
      res.status(400).json({ success: false, message: 'Fill in required information.' });
      return;
    }

    //* ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Invalid email format.' });
      return;
    }

    //* ตรวจสอบความยาวของรหัสผ่าน
    if (password_hash.length < 8) {
      res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' });
      return;
    }

    //* ตรวจสอบข้อมูลซ้ำ (Username และ Email)
    const [userCheck] = await pool.execute(
      'SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    const userExists = (userCheck as any)[0].count > 0;
    if (userExists) {
      res.status(400).json({ success: false, message: 'Username or email already exists.' });
      return;
    }

    //* เข้ารหัสรหัสผ่านด้วย bcrypt
    const saltRounds = 10;
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
    const reset_token = req.body.reset_token || crypto.randomBytes(32).toString('hex');
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
      reset_token || null,
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

export { postRegister };
