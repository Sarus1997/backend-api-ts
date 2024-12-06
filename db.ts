import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', // ชื่อโฮสต์ของฐานข้อมูล
  user: 'root',      // ชื่อผู้ใช้งานฐานข้อมูล
  password: 'password', // รหัสผ่านของผู้ใช้
  database: 'example_db', // ชื่อฐานข้อมูล
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
