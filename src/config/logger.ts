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
  }, 200);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.blue], "█████  █████")}`);
  }, 400);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.white], "   ██  ██  ██")}`);
  }, 600);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.red], "█████  ██   ██")}`);
  }, 800);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "----------------------> SR Server ❤️ ❤️")}`);
  }, 1000);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server running...")}`);
  }, 1200);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], `Running on http://localhost:${port} ⚡`)}`);
  }, 1400);
  setTimeout(() => {
    console.log(`${SetColor([COLOR.fg.magenta], "***** ***** ***** ***** ***** ***** *****")}`);
  }, 1600);
};

