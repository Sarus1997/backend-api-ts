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
  console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.red], "█████  ██████")}`);
  console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.white], "██     ██  ██")}`);
  console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.blue], "█████  █████")}`);
  console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.white], "   ██  ██  ██")}`);
  console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.red], "█████  ██   ██")}`);
  console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "----------------------> SR Server")}`);
  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server running...")}`
  );
  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor(
      [COLOR.fg.green],
      "Server running on port: 8888"
    )}`
  );
  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], `Running on หhttp://localhost:${port} ⚡`)}`
  );
  console.log(
    `${SetColor([COLOR.fg.magenta], "***** ***** ***** ***** ***** ***** *****")}`
  );
};