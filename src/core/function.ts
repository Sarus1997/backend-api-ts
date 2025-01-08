// src/core/function.ts
import crypto from 'crypto';

//* ฟังก์ชันสำหรับสร้าง secret key *//
const generateSecretKey = (): string => crypto.randomBytes(32).toString('hex');

//* ฟังก์ชันสำหรับสร้าง id แบบสุ่ม ไม่ซ้ำ *// 
const generateID = (providedId?: string): string => {
  return providedId || crypto.randomUUID();
};


export { generateSecretKey, generateID };