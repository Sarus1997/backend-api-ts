const { SetColor, COLOR } = require('../config/colorUtils');

export const logServerError = (error: any) => {
  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor(
      [COLOR.fg.red],
      "Server error:"
    )} ${error}`
  );
};

export const logServerRunning = (port: number) => {
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.red], "█████  ██████")}`);
  }, 0);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.white], "██     ██  ██")}`);
  }, 100);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.blue], "█████  █████")}`);
  }, 200);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.white], "   ██  ██  ██")}`);
  }, 300);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.red], "█████  ██   ██")}`);
  }, 400);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "----------------------> SR Server ❤️♡ ❣️♡")}`);
  }, 500);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server running...")}`);
  }, 600);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], `Running on http://localhost:${port} ⚡`)}`);
  }, 700);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "***** ***** ***** ***** ***** ***** *****")}`);
  }, 800);
};

