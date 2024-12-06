const { SetColor, COLOR } = require('../config/colorUtils');

export const logServerStartup = () => {
  const arrowsTop = [
    { green: "----->", yellow: "-------->", red: "----------->" },
  ];

  arrowsTop.forEach(({ green, yellow, red }) => {
    console.log(
      `${SetColor([COLOR.fg.green], green)}`
    );
    console.log(
      `${SetColor([COLOR.fg.yellow], yellow)}`
    );
    console.log(
      `${SetColor([COLOR.fg.red], red)}`
    );
  });

  const msg = "Develop ⚒️  by: Saharat Suwannapapond";

  const serverLines = [
    { red: "SSSSS", blue: "RRRRR" },
    { red: "S    ", blue: "R   R" },
    { red: "SSSSS", blue: "RRRR " },
    { red: "    S", blue: "R  R " },
    { red: "SSSSS", blue: "R   R 💕" },
  ];

  serverLines.forEach(({ red, blue }) => {
    console.log(
      `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.brightRed], red)} ${SetColor([COLOR.fg.brightBlue], blue)}`
    );
  });

  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} \t\b${SetColor(
      [COLOR.fg.green],
      msg
    )}`
  );

  const arrowsButtom = [
    { green: "----------->", yellow: "-------->", red: "----->" },
  ];

  arrowsButtom.forEach(({ green, yellow, red }) => {
    console.log(
      `${SetColor([COLOR.fg.red], green)}`
    );
    console.log(
      `${SetColor([COLOR.fg.yellow], yellow)}`
    );
    console.log(
      `${SetColor([COLOR.fg.green], red)}`
    );
  });
};


export const logServerRunning = (port: number) => {
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
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], `Running on http://localhost:${port} ⚡`)}`
  );
  console.log(
    `${SetColor([COLOR.fg.magenta], "***** ***** ***** ***** ***** ***** *****")}`
  );
};