"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logServerRunning = exports.logServerStartup = void 0;
const { SetColor, COLOR } = require('../config/colorUtils');
const logServerStartup = () => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server starting...")}`);
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server starting...")}`);
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server starting...")}`);
};
exports.logServerStartup = logServerStartup;
const logServerRunning = (port) => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server running...")}`);
    console.log(SetColor([COLOR.fg.green], `Server running on http://localhost:${port}`));
};
exports.logServerRunning = logServerRunning;
