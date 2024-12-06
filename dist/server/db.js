"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// โหลดค่า environment variables
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    //* ชื่อโฮสต์ของฐานข้อมูล *//
    host: process.env.DB_HOST || 'localhost',
    //* ชื่อผู้ใช้งานฐานข้อมูล *//
    user: process.env.DB_USER || 'root',
    //* รหัสผ่านของผู้ใช้ *//
    password: process.env.DB_PASSWORD || 'root',
    //* ชื่อฐานข้อมูล *//
    database: process.env.DB_NAME || 'employee_db',
    //* การตั้งค่าการเชื่อมต่อเพิ่มเติม *//
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
    queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0', 10),
});
exports.default = pool;
