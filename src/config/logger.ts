const { SetColor, COLOR } = require('../config/colorUtils');

export const logServerStartup = () => {
  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "SSSSS")}`
  );
  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server starting...")}`
  );
  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server starting...")}`
  );
};

export const logServerRunning = (port: number) => {
  console.log(
    `${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server running...")}`
  );
  console.log(
    SetColor([COLOR.fg.green], `Server running on http://localhost:${port}`)
  );
};
