import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

//** โหลดค่า environment variables *//
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'employee_db',

  //* การตั้งค่าการเชื่อมต่อเพิ่มเติม *//
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0', 10),
});

export default pool;