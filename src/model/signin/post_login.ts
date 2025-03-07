import { Request, Response } from 'express';
import { getDatabasePool } from '../../config/env';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    let { dbName, usernameOrEmail, password } = req.body;
    console.log('Request body:', req.body);

    if (!process.env.SECRET_KEY) {
      console.error('No SECRET_KEY');
      res.status(500).json({ success: false, message: 'Internal server error.' });
      return;
    }

    dbName = dbName || "employee_db";
    console.log('Using database:', dbName);

    if (!usernameOrEmail || typeof password !== 'string') {
      console.log('Missing credentials');
      res.status(400).json({
        success: false,
        message: 'Please provide both username/email and a valid password.',
      });
      return;
    }

    let pool;
    try {
      pool = getDatabasePool(dbName);
      console.log('Database pool acquired');
    } catch (error) {
      console.error('Database error:', error);
      res.status(400).json({ success: false, message: `Database ${dbName} is not supported.` });
      return;
    }

    const [rows] = await pool.execute(
      'SELECT id, username, email, password_hash, f_name, l_name, profile_picture, role FROM users WHERE username = ? OR email = ? LIMIT 1',
      [usernameOrEmail, usernameOrEmail]
    );
    console.log('Query result:', rows);

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log('No user found for:', usernameOrEmail);
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const user = (rows as any)[0];
    console.log('User data:', user);

    if (!user.password_hash) {
      console.log('No password hash for user');
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    console.log('Verifying password...');
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    console.log('Password verification result:', isPasswordValid);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: 'Login successful!',
      data: { id: user.id, email: user.email, f_name: user.f_name, l_name: user.l_name, profile_picture: user.profile_picture, role: user.role },
      token,
    });
  } catch (err) {
    console.error('Error in postLogin:', err);
    res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
  }
};

export { postLogin };