"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
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
exports.default = pool;
