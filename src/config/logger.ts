const { SetColor, COLOR } = require('../config/colorUtils');

// Emoji constants
const EMOJIS = {
  HEART: '💖',
  ROCKET: '🚀',
  BOLT: '⚡',
  SPARKLES: '✨',
  STAR: '⭐'
};

// ASCII art for banner
const SERVER_BANNER = `
   _____ _____    _____ ______ _______      ________ _____  
  / ____|  __ \\  / ____|  ____|  __ \\ \\    / /  ____|  __ \\ 
 | (___ | |__) || (___ | |__  | |__) \\ \\  / /| |__  | |__) |
  \\___ \\|  _  /  \\___ \\|  __| |  _  / \\ \\/ / |  __| |  _  / 
  ____) | | \\ \\  ____) | |____| | \\ \\  \\  /  | |____| | \\ \\ 
 |_____/|_|  \\_\\|_____/|______|_|  \\_\\  \\/   |______|_|  \\_\\
`;

// Function to get current timestamp
const getTimestamp = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// Function to create loading animation frames
const createLoadingFrame = (index: number): string => {
  const dots = '•'.repeat(index);
  const spaces = ' '.repeat(8 - index);
  return `[${dots}${spaces}]`;
};

// Main server error logger
export const logServerError = (error: any) => {
  console.log(
    `${SetColor([COLOR.fg.red], '╔════ ERROR ════╗')}\n` +
    `${SetColor([COLOR.fg.magenta], '[Server]')} ${SetColor([COLOR.fg.red], 'Error:')} ${error}\n` +
    `${SetColor([COLOR.fg.red], '╚═══════════════╝')}`
  );
};

// Enhanced server startup logger
export const logServerRunning = (port: number) => {
  // Clear console first
  console.clear();

  // Show ASCII banner
  console.log(SetColor([COLOR.fg.cyan], SERVER_BANNER));

  // Loading animation
  for (let i = 0; i <= 8; i++) {
    setTimeout(() => {
      const frame = createLoadingFrame(i);
      const message = i === 8 ? 'Complete!' : 'Loading...';
      console.log(
        `${SetColor([COLOR.fg.magenta], '[Server]')} ${SetColor([COLOR.fg.yellow], frame)} ${message}`
      );
    }, i * 100);
  }

  // Server info messages
  setTimeout(() => {
    console.log('\n' + SetColor([COLOR.fg.magenta], '╔══════════════ SERVER INFO ══════════════╗'));
    console.log(
      `${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.SPARKLES} Status    : ${SetColor([COLOR.fg.green], 'Running')}`,
    );
    console.log(
      `${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.BOLT} Timestamp : ${SetColor([COLOR.fg.green], getTimestamp())}`,
    );
    console.log(
      `${SetColor([COLOR.fg.magenta], '║')} ${EMOJIS.ROCKET} URL       : ${SetColor([COLOR.fg.cyan], `http://localhost:${port}`)}`,
    );
    console.log(SetColor([COLOR.fg.magenta], '╚═════════════════════════════════════════╝'));
  }, 1000);

  // Final message
  setTimeout(() => {
    console.log('\n' + SetColor([COLOR.fg.green], `${EMOJIS.HEART} SR Server is ready to serve! ${EMOJIS.STAR}`));
  }, 1200);
};