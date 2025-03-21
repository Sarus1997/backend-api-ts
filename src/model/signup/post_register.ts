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

const pool = getDatabasePool('employee_db');

const registerLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,
  max: 5,
  message: 'Too many registration attempts. Please try again later.',
});

const postRegister = async (req: Request<{}, {}, ProductData>, res: Response): Promise<void> => {
  try {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(400).json({ success: false, message: 'Invalid content type' });
      return;
    }

    let { username, email, password_hash, f_name, l_name, profile_picture, status, created_at, updated_at } = req.body;

    if (!username || !email || !password_hash || !f_name || !l_name) {
      res.status(400).json({ success: false, message: 'Fill in required information.' });
      return;
    }

    username = username.trim();
    email = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Invalid email format.' });
      return;
    }

    if (password_hash.length < 10) {
      res.status(400).json({ success: false, message: 'Password must be at least 10 characters long.' });
      return;
    }

    const [rows]: any = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    await bcrypt.hash(crypto.randomBytes(60).toString('hex'), 12);

    if (rows.length > 0) {
      res.status(400).json({ success: false, message: 'Invalid credentials or registration failed.' });
      return;
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    const id = req.body.id || generateHexID();
    const datetime = generateDateTime();
    const oauth_provider = req.body.oauth_provider || 'email';
    const allowedRoles = ['user', 'admin'];
    const userRole = req.body.role && allowedRoles.includes(req.body.role) ? req.body.role : 'user';
    const oauth_id = req.body.oauth_id || null;
    const registerStatus = status || 'active';
    const last_login_at = req.body.last_login_at || new Date();

    const reset_token = crypto.randomBytes(32).toString('hex');
    const hashed_reset_token = await bcrypt.hash(reset_token, 10);

    const reset_token_expires_at = req.body.reset_token_expires_at || new Date();
    const date_created = created_at || new Date();
    const date_update = updated_at || null;

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
      hashed_reset_token,
      reset_token_expires_at || null,
      date_created,
      date_update
    ];

    const [result] = await pool.execute(sql, params);

    res.json({
      success: true,
      message: 'User registered successfully!',
      data: {
        id,
        email,
        status: registerStatus,
      },
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
