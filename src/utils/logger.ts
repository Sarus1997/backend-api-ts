const { SetColor, COLOR } = require('../utils/colorUtils');

//* อิโมจิ
const SYMBOLS = {
  HEART: '💖',
  HEART_EYES: '❤️',
  HAMMER: '⚒️',
  ROCKET: '🚀',
  BOLT: '⚡',
  SPARKLES: '✨',
  STAR: '⭐',
  COM: "💻",
  CYBER_HEART: '♥',
  BLOCK: '█',
  LIGHT_BLOCK: '▒',
  CROSS: '✕',
  CHECK: '✓',
  RADIO_ON: '◉',
  RADIO_OFF: '◯',
};

const CYBERPUNK_THEME = {
  neon: {
    pink: COLOR.fg.magenta,
    blue: COLOR.fg.cyan,
    green: COLOR.fg.green,
    yellow: COLOR.fg.yellow,
    orange: COLOR.fg.brightOrange
  },
  base: {
    dark: COLOR.fg.brightBlack,
    light: COLOR.fg.brightWhite,
    primary: COLOR.fg.blue,
    highlight: COLOR.fg.brightCyan
  },
  status: {
    success: COLOR.fg.green,
    error: COLOR.fg.red,
    warning: COLOR.fg.yellow,
    info: COLOR.fg.brightBlue
  }
};


//* ออกแบบ ASCII สำหรับแบนเนอร์ (SR และ Server แยกสี)
export const logServerBanner = async () => {
  console.clear();

  await flashText("SYSTEM INITIALIZATION", CYBERPUNK_THEME.neon.green, 3, 150);

  const bannerText = `
  ${SetColor([COLOR.fg.red], '  _____ _____  ')}   ${SetColor([COLOR.fg.cyan], '_____ ______ _______      ________ _____  ')}  
  ${SetColor([COLOR.fg.red], ' / ____|  __ \\ ')} ${SetColor([COLOR.fg.cyan], ' / ____|  ____|  __ \\ \\    / /  ____|  __ \\ ')} 
  ${SetColor([COLOR.fg.red], '| (___ | |__) |')} ${SetColor([COLOR.fg.cyan], '| (___ | |__  | |__) \\ \\  / /| |__  | |__) |')} 
  ${SetColor([COLOR.fg.red], ' \\___ \\|  _  / ')} ${SetColor([COLOR.fg.cyan], ' \\___ \\|  __| |  _  / \\ \\/ / |  __| |  _  / ')} 
  ${SetColor([COLOR.fg.red], ' ____) | | \\ \\ ')} ${SetColor([COLOR.fg.cyan], ' ____) | |____| | \\ \\  \\  /  | |____| | \\ \\ ')} 
  ${SetColor([COLOR.fg.red], '|_____/|_|  \\_\\')} ${SetColor([COLOR.fg.cyan], '|_____/|______|_|  \\_\\  \\/   |______|_|  \\_\\')} 
  `;

  const bannerLines = bannerText.split('\n');
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

  // ข้อความสุดท้าย
  console.log("\n" + SetColor([CYBERPUNK_THEME.neon.green], `  ${SYMBOLS.CYBER_HEART} SR SERVER ACTIVATED SUCCESSFULLY ${SYMBOLS.CYBER_HEART}`));

  // เส้นแบ่งสุดท้าย
  await createPulsingLine(50);

  const message = `
  ${SetColor([COLOR.fg.magenta], '[Server]')} ${SetColor([COLOR.fg.cyan], 'Connect to database')} ${SetColor([COLOR.fg.magenta], process.env.DB1_NAME)} ${SetColor([COLOR.fg.cyan], 'successfully')}
  ${SetColor([COLOR.fg.magenta], '[Server]')} ${SetColor([COLOR.fg.cyan], 'Connect to database')} ${SetColor([COLOR.fg.magenta], process.env.DB2_NAME)} ${SetColor([COLOR.fg.cyan], 'successfully')}

  ${SetColor([COLOR.fg.brightGreen], "Checking system requirements...")}
  `;
  //* แบบ ที่ 2
  for (const char of message) {
    process.stdout.write(char);
    await new Promise((resolve) => setTimeout(resolve, 10)); //* ปรับความเร็วในการแสดงผล
  }
  console.log();

  const systemChecks = [
    { name: "Node.js", status: true, detail: process.version },
    { name: "Express.js", status: true, detail: require('express/package.json').version },
    { name: "Bcrypt.JS", status: true, detail: require('bcrypt/package.json').version },
    { name: "MySQL2", status: true, detail: require('mysql2/package.json').version },
    { name: "TypeScript", status: true, detail: require('typescript/package.json').version },
  ];

  for (const check of systemChecks) {
    process.stdout.write(
      `  ${SetColor([CYBERPUNK_THEME.base.primary], SYMBOLS.RADIO_OFF)} ${SetColor([CYBERPUNK_THEME.base.light], check.name)} `
    );

    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

    if (check.status) {
      const detail = check.detail ? ` ${SetColor([CYBERPUNK_THEME.base.highlight], `[${check.detail}]`)}` : '';
      process.stdout.write(
        `\r  ${SetColor([CYBERPUNK_THEME.status.success], SYMBOLS.RADIO_ON)} ${SetColor([CYBERPUNK_THEME.base.light], check.name)}${detail} ${SetColor([CYBERPUNK_THEME.status.success], SYMBOLS.CHECK)}\n`
      );
    } else {
      process.stdout.write(
        `\r  ${SetColor([CYBERPUNK_THEME.status.error], SYMBOLS.RADIO_ON)} ${SetColor([CYBERPUNK_THEME.base.light], check.name)} ${SetColor([CYBERPUNK_THEME.status.error], SYMBOLS.CROSS)}\n`
      );
    }
  }
  console.log();
  console.log(`\r${SetColor([COLOR.fg.green], '[✔] Check version successfully          ')}`);
};

//* เอฟเฟคแฟลช - กระพริบข้อความ
const flashText = async (text, color, times = 3, speed = 100) => {
  for (let i = 0; i < times; i++) {
    process.stdout.write('\r' + SetColor([color], text));
    await new Promise(resolve => setTimeout(resolve, speed));
    process.stdout.write('\r' + ' '.repeat(text.length));
    await new Promise(resolve => setTimeout(resolve, speed / 2));
  }
  console.log('\r' + SetColor([color], text));
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


//* สร้างเส้นแบ่งกระพริบ
const createPulsingLine = async (width = 50, speed = 30) => {
  for (let i = 0; i <= width; i++) {
    const progressChars = SYMBOLS.BLOCK.repeat(i);
    const remainingChars = SYMBOLS.LIGHT_BLOCK.repeat(width - i);
    process.stdout.write(`\r${SetColor([CYBERPUNK_THEME.neon.pink], progressChars)}${SetColor([CYBERPUNK_THEME.base.dark], remainingChars)}`);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
  console.log();
};

//* แสดงข้อผิดพลาดเซิร์ฟเวอร์
export const logServerError = (error) => {
  console.log(
    `${SetColor([COLOR.fg.red], '╔════ ERROR ════╗')}`,
    `\n${SetColor([COLOR.fg.magenta], '[Server]')} ${SetColor([COLOR.fg.red], 'Error:')} ${error}`,
    `\n${SetColor([COLOR.fg.red], '╚═══════════════╝')}`
  );
};

const timestamp = getTimestamp();
const date = timestamp.split(' ')[0];
const time = timestamp.split(' ')[1];

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
    console.log(`\r${SetColor([COLOR.fg.green], '[✔] Connection successful          ')}`);
    console.log('\n' + SetColor([COLOR.fg.magenta], '╔══════════════ SERVER INFO ══════════════╗'));
    console.log(`${SetColor([COLOR.fg.magenta], '║')} ${SYMBOLS.SPARKLES} Status    : ${SetColor([COLOR.fg.green], 'Running')}`);
    console.log(`${SetColor([COLOR.fg.magenta], '║')} ${SYMBOLS.BOLT} Date     : ${SetColor([COLOR.fg.green], date)}`);
    console.log(`${SetColor([COLOR.fg.magenta], '║')} ${SYMBOLS.BOLT} Time     : ${SetColor([COLOR.fg.green], time)}`);
    console.log(`${SetColor([COLOR.fg.magenta], '║')} ${SYMBOLS.ROCKET} URL       : ${SetColor([COLOR.fg.cyan], `http://localhost:${port}`)}`);
    console.log(SetColor([COLOR.fg.magenta], '╚═════════════════════════════════════════╝'));

    console.log('\n' + SetColor([COLOR.fg.green], `${SYMBOLS.HEART} SR Server is ready to serve! ${SYMBOLS.STAR}`));
    console.log(SetColor([COLOR.fg.green], `${SYMBOLS.HEART} Server is running on port ${port} ${SYMBOLS.BOLT}`));
    console.log(SetColor([COLOR.fg.green], `${SYMBOLS.HAMMER}  Developed ${SYMBOLS.HEART_EYES}  by Sarus`));
  }, 2000);

};
