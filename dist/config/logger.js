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
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "->*")}`);
    }, 0);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "-->*")}`);
    }, 100);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "--->*")}`);
    }, 200);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "---->* SR Server ❤️♡ ❣️♡")}`);
    }, 300);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "----->*")} ${SetColor([COLOR.fg.green], `${getTimestamp()}`)}`);
    }, 400);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "------>*")} ${SetColor([COLOR.fg.green], "Server running...")}`);
    }, 500);
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "------->*")} ${SetColor([COLOR.fg.green], `Running on http://localhost:${port} ⚡`)}`);
    }, 600);
    function getTimestamp() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    setTimeout(() => {
        console.log(`${SetColor([COLOR.fg.magenta], "[Server]")} ${SetColor([COLOR.fg.yellow], "-------->*")} ${SetColor([COLOR.fg.magenta], "***** ***** ***** ***** ***** *****")}`);
    }, 700);
};
exports.logServerRunning = logServerRunning;
