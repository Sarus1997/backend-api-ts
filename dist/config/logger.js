"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logServerRunning = exports.logServerError = void 0;
const { SetColor, COLOR } = require('../config/colorUtils');
//* อิโมจิ
const EMOJIS = {
    HEART: '💖',
    ROCKET: '🚀',
    BOLT: '⚡',
    SPARKLES: '✨',
    STAR: '⭐'
};
//* ออกแบบ ASCII สำหรับแบนเนอร์
const SERVER_BANNER = `
   _____ _____     _____ ______ _______      ________ _____  
  / ____|  __ \\   / ____|  ____|  __ \\ \\    / /  ____|  __ \\ 
 | (___ | |__) | | (___ | |__  | |__) \\ \\  / /| |__  | |__) |
  \\___ \\|  _  /   \\___ \\|  __| |  _  / \\ \\/ / |  __| |  _  / 
  ____) | | \\ \\   ____) | |____| | \\ \\  \\  /  | |____| | \\ \\ 
 |_____/|_|  \\_\\ |_____/|______|_|  \\_\\  \\/   |______|_|  \\_\\
`;
//* ฟังก์ชั่นรับข้อมูลประทับเวลาปัจจุบัน
const getTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
//* ฟังก์ชั่นในการสร้างเฟรมแอนิเมชั่นการโหลด
const createLoadingFrame = (index) => {
    const dots = '•'.repeat(index);
    const spaces = ' '.repeat(8 - index);
    return `[${dots}${spaces}]`;
};
//* เครื่องบันทึกข้อผิดพลาดเซิร์ฟเวอร์หลัก
const logServerError = (error) => {
    console.log(`${SetColor([COLOR.fg.red], '╔════ ERROR ════╗')}\n` +
        `${SetColor([COLOR.fg.magenta], '[Server]')} ${SetColor([COLOR.fg.red], 'Error:')} ${error}\n` +
        `${SetColor([COLOR.fg.red], '╚═══════════════╝')}`);
};
exports.logServerError = logServerError;
//* ตัวบันทึกการเริ่มต้นเซิร์ฟเวอร์ที่ได้รับการปรับปรุง
const logServerRunning = (port) => {
    //* เคลียร์คอนโซลก่อน
    console.clear();
    //* แสดงแบนเนอร์ ASCII
    console.log(SetColor([COLOR.fg.cyan], SERVER_BANNER));
    //* กำลังโหลดแอนิเมชั่น
    for (let i = 0; i <= 8; i++) {
        setTimeout(() => {
            const frame = createLoadingFrame(i);
            const message = i === 8 ? 'Complete!' : 'Loading...';
            console.log(`${SetColor([COLOR.fg.magenta], '[Server]')} ${SetColor([COLOR.fg.yellow], frame)} ${message}`);
        }, i * 100);
    }
    //* ข้อความข้อมูลเซิร์ฟเวอร์
    setTimeout(() => {
        console.log('\n' + SetColor([COLOR.fg.magenta], '╔══════════════ SERVER INFO ══════════════╗'));
        console.log(`${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.SPARKLES} Status    : ${SetColor([COLOR.fg.green], 'Running')}`);
        console.log(`${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.BOLT} Timestamp : ${SetColor([COLOR.fg.green], getTimestamp())}`);
        console.log(`${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.ROCKET} URL       : ${SetColor([COLOR.fg.cyan], `http://localhost:${port}`)}`);
        console.log(SetColor([COLOR.fg.magenta], '╚═════════════════════════════════════════╝'));
    }, 1000);
    //* ข้อความสุดท้าย
    setTimeout(() => {
        console.log('\n' + SetColor([COLOR.fg.green], `${EMOJIS.HEART} SR Server is ready to serve! ${EMOJIS.STAR}`));
    }, 1200);
};
exports.logServerRunning = logServerRunning;
