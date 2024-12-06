import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  //* ชื่อโฮสต์ของฐานข้อมูล *//
  host: 'localhost',

  //* ชื่อผู้ใช้งานฐานข้อมูล *//
  user: 'root',

  //* รหัสผ่านของผู้ใช้ *//
  password: 'root',

  //* ชื่อฐานข้อมูล *//
  database: 'employee_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
