const { SetColor, COLOR } = require('../config/colorUtils');

//* อิโมจิ
const EMOJIS = {
  HEART: '💖',
  ROCKET: '🚀',
  BOLT: '⚡',
  SPARKLES: '✨',
  STAR: '⭐'
};

//* ออกแบบ ASCII สำหรับแบนเนอร์ (SR และ Server แยกสี)
export const logServerBanner = async () => {
  console.clear();

  const bannerText = `
  ${SetColor([COLOR.fg.red], '  _____ _____  ')}   ${SetColor([COLOR.fg.cyan], '_____ ______ _______      ________ _____  ')}  
  ${SetColor([COLOR.fg.red], ' / ____|  __ \\ ')} ${SetColor([COLOR.fg.cyan], ' / ____|  ____|  __ \\ \\    / /  ____|  __ \\ ')} 
  ${SetColor([COLOR.fg.red], '| (___ | |__) |')} ${SetColor([COLOR.fg.cyan], '| (___ | |__  | |__) \\ \\  / /| |__  | |__) |')} 
  ${SetColor([COLOR.fg.red], ' \\___ \\|  _  / ')} ${SetColor([COLOR.fg.cyan], ' \\___ \\|  __| |  _  / \\ \\/ / |  __| |  _  / ')} 
  ${SetColor([COLOR.fg.red], ' ____) | | \\ \\ ')} ${SetColor([COLOR.fg.cyan], ' ____) | |____| | \\ \\  \\  /  | |____| | \\ \\ ')} 
  ${SetColor([COLOR.fg.red], '|_____/|_|  \\_\\')} ${SetColor([COLOR.fg.cyan], '|_____/|______|_|  \\_\\  \\/   |______|_|  \\_\\')} 
  `;

  const bannerLines = bannerText.split('\n');

  //* แสดงผลเฟรมแบนเนอร์
  //* แบบ ที่ 1
  await Promise.all(
    bannerLines.map((line, index) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log(line);
          resolve();
        }, index * 200); //* ปรับความเร็วของแอนิเมชัน (50ms ต่อแถว)
      })
    )
  );

  console.log();

  //* แบบ ที่ 2
  // for (const char of bannerText) {
  //   process.stdout.write(char);
  //   await new Promise((resolve) => setTimeout(resolve, 0.1)); //* ปรับความเร็วในการแสดงผล
  // }
  // console.log();
};

//* ฟังก์ชั่นรับข้อมูลประทับเวลาปัจจุบัน
const getTimestamp = () => {
  const date = new Date();
  return date.toISOString().replace('T', ' ').split('.')[0];
};

//* ฟังก์ชั่นสร้างเฟรมแอนิเมชันการโหลด
const createLoadingFrame = (index: number): string => {
  const frames = ['|', '/', '-', '\\'];
  return frames[index % frames.length];
};

//* เครื่องบันทึกข้อผิดพลาดเซิร์ฟเวอร์หลัก
export const logServerError = (error) => {
  console.log(
    `${SetColor([COLOR.fg.red], '╔════ ERROR ════╗')}`,
    `\n${SetColor([COLOR.fg.magenta], '[Server]')} ${SetColor([COLOR.fg.red], 'Error:')} ${error}`,
    `\n${SetColor([COLOR.fg.red], '╚═══════════════╝')}`
  );
};

//* ตัวบันทึกการเริ่มต้นเซิร์ฟเวอร์ที่มีอนิเมชัน
export const logServerRunning = async (port) => {
  await logServerBanner();

  //* สร้างการโหลดข้อมูล
  let i = 0;
  const loadingInterval = setInterval(() => {
    process.stdout.write(`\r${SetColor([COLOR.fg.yellow], `[${createLoadingFrame(i)}]`)} Loading...`);
    i++;
  }, 80);

  //* แสดงผลลัพธ์
  setTimeout(() => {
    clearInterval(loadingInterval);
    console.log(`\r${SetColor([COLOR.fg.green], '[✔] Complete!          ')}`);
    console.log('\n' + SetColor([COLOR.fg.magenta], '╔══════════════ SERVER INFO ══════════════╗'));
    console.log(`${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.SPARKLES} Status    : ${SetColor([COLOR.fg.green], 'Running')}`);
    console.log(`${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.BOLT} Timestamp : ${SetColor([COLOR.fg.green], getTimestamp())}`);
    console.log(`${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.ROCKET} URL       : ${SetColor([COLOR.fg.cyan], `http://localhost:${port}`)}`);
    console.log(SetColor([COLOR.fg.magenta], '╚═════════════════════════════════════════╝'));

    console.log('\n' + SetColor([COLOR.fg.green], `${EMOJIS.HEART} SR Server is ready to serve! ${EMOJIS.STAR}`));
    console.log(SetColor([COLOR.fg.green], `${EMOJIS.HEART} Server is running on port ${port} ${EMOJIS.BOLT}`));
  }, 2000);
};
