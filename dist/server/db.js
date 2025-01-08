"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
//** โหลดค่า environment variables *//
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || '13.229.180.6',
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || '7P£]st11j%s7',
    database: process.env.DB_NAME || 'sym',
    //* การตั้งค่าการเชื่อมต่อเพิ่มเติม *//
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
    queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0', 10),
});
exports.default = pool;
