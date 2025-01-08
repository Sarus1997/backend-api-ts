"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logServerRunning = exports.logServerError = void 0;
const { SetColor, COLOR } = require('../config/colorUtils');
const logServerError = (error) => {
    console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.red], "Server error:")} ${error}`);
};
exports.logServerError = logServerError;
const logServerRunning = (port) => {
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
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "----------------------> SR Server ❤️ ❤️")}`);
    }, 500);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server running...")}`);
    }, 600);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], "Server running on port: 8888")}`);
    }, 700);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.green], `Running on หhttp://localhost:${port} ⚡`)}`);
    }, 800);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "***** ***** ***** ***** ***** ***** *****")}`);
    }, 900);
};
exports.logServerRunning = logServerRunning;
