"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logServerRunning = exports.logServerStartup = void 0;
const chalk = require('chalk'); // Import chalk for colored text
const { SetColor, COLOR } = require('../config/colorUtils');
const logServerStartup = () => {
    // สร้างข้อความแบบ ASCII Art ด้วยตัวเอง
    console.log(chalk.blue('________  ___       _______'));
    console.log(chalk.yellow('/ ____/\\ \\/ / |     / / ___/___  ______   _____  _____'));
    console.log(chalk.magenta('/ /      \\  /| | /| / /\\__ \\/ _ \\/ ___/ | / / _ \\/ ___/'));
    console.log(chalk.cyan('/ /___    / / | |/ |/ /___/ /  __/ /   | |/ /  __/ /'));
    console.log(chalk.red('\\____/   /_/  |__/|__//____/\\___/_/    |___/\\___/_/'));
    const msg = "Develop ⚒️  by: Saharat Suwannapapond";
    const serverLines = [
        { red: "SSSSS", blue: "RRRRR" },
        { red: "S    ", blue: "R   R" },
        { red: "SSSSS", blue: "RRRR " },
        { red: "    S", blue: "R  R " },
        { red: "SSSSS", blue: "R   R 💕" },
    ];
    serverLines.forEach(({ red, blue }) => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.brightRed], red)} ${SetColor([COLOR.fg.brightBlue], blue)}`);
    });
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} \t\b${SetColor([COLOR.fg.green], msg)}`);
    const arrowsButtom = [
        { red: "----------->", green: "-------->", yellow: "----->" },
    ];
    arrowsButtom.forEach(({ green, red, yellow }) => {
        console.log(`${SetColor([COLOR.fg.green], green)}`);
        console.log(`${SetColor([COLOR.fg.yellow], yellow)}`);
        console.log(`${SetColor([COLOR.fg.red], red)}`);
    });
};
exports.logServerStartup = logServerStartup;
const logServerRunning = (port) => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server running...")}`);
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], `Server running on port: ${port}`)}`);
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], `Running on http://localhost:${port} ⚡`)}`);
    console.log(`${SetColor([COLOR.fg.magenta], "***** ***** ***** ***** ***** ***** *****")}`);
};
exports.logServerRunning = logServerRunning;
