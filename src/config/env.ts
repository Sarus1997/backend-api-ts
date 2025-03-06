import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

interface DBConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
  queueLimit: number;
}

//* ฟังก์ชันสร้าง Connection Pool
const createPool = (dbConfig: DBConfig) => {
  return mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: dbConfig.connectionLimit,
    queueLimit: dbConfig.queueLimit,
  });
};

//* Pool สำหรับฐานข้อมูลที่ 1 (employee_db)
const pool1 = createPool({
  host: process.env.DB1_HOST || "127.0.0.1",
  port: Number(process.env.DB1_PORT) || 3306,
  user: process.env.DB1_USER || "root",
  password: process.env.DB1_PASSWORD || "root",
  database: process.env.DB1_NAME || "employee_db",
  connectionLimit: Number(process.env.DB1_CONNECTION_LIMIT) || 10,
  queueLimit: Number(process.env.DB1_QUEUE_LIMIT) || 0,
});

//* Pool สำหรับฐานข้อมูลที่ 2 (finance_db)
const pool2 = createPool({
  host: process.env.DB2_HOST || "127.0.0.1",
  port: Number(process.env.DB2_PORT) || 3306,
  user: process.env.DB2_USER || "root",
  password: process.env.DB2_PASSWORD || "root",
  database: process.env.DB2_NAME || "finance_db",
  connectionLimit: Number(process.env.DB2_CONNECTION_LIMIT) || 10,
  queueLimit: Number(process.env.DB2_QUEUE_LIMIT) || 0,
});

//* ฟังก์ชันเลือก Pool ตามฐานข้อมูลที่ต้องการ
const getDatabasePool = (dbName: string) => {
  switch (dbName) {
    case process.env.DB1_NAME || "employee_db":
      return pool1;
    case process.env.DB2_NAME || "finance_db":
      return pool2;
    default:
      throw new Error(`❌ Database "${dbName}" is not supported.`);
  }
};

export { getDatabasePool };
