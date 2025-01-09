import crypto from 'crypto';

//* ฟังก์ชันสำหรับสร้าง secret key *//
const generateSecretKey = (): string => crypto.randomBytes(32).toString('hex');

//* ฟังก์ชันสำหรับสร้าง id แบบสุ่ม ไม่ซ้ำ *// 
const generateID = (providedId?: string): string => {
  return providedId || crypto.randomUUID();
};

//* ฟังก์ชันสำหรับสร้างวันที่และเวลา *//
const generateDateTime = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export { generateSecretKey, generateID, generateDateTime };
