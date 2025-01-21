import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

//** โหลดค่า environment variables *//
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  //* การตั้งค่าการเชื่อมต่อเพิ่มเติม *//
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT),
});

export default pool;

