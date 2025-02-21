"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabasePool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Pool สำหรับฐานข้อมูลที่ 1 (employee_db)
const pool1 = promise_1.default.createPool({
    host: process.env.DB1_HOST,
    port: parseInt(process.env.DB1_PORT),
    user: process.env.DB1_USER,
    password: process.env.DB1_PASSWORD,
    database: process.env.DB1_NAME,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB1_CONNECTION_LIMIT),
    queueLimit: parseInt(process.env.DB1_QUEUE_LIMIT),
});
// Pool สำหรับฐานข้อมูลที่ 2 (finance_db)
const pool2 = promise_1.default.createPool({
    host: process.env.DB2_HOST,
    port: parseInt(process.env.DB2_PORT),
    user: process.env.DB2_USER,
    password: process.env.DB2_PASSWORD,
    database: process.env.DB2_NAME,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB2_CONNECTION_LIMIT),
    queueLimit: parseInt(process.env.DB2_QUEUE_LIMIT),
});
// ฟังก์ชันเลือก Pool ตามฐานข้อมูลที่ต้องการ
const getDatabasePool = (dbName) => {
    if (dbName === 'employee_db')
        return pool1;
    if (dbName === 'finance_db')
        return pool2;
    throw new Error(`Database ${dbName} is not supported`);
};
exports.getDatabasePool = getDatabasePool;
