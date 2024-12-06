"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetColor = exports.COLOR = void 0;
exports.COLOR = {
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        brightBlack: "\x1b[90m",
        brightRed: "\x1b[91m",
        brightGreen: "\x1b[92m",
        brightYellow: "\x1b[93m",
        brightBlue: "\x1b[94m",
        brightMagenta: "\x1b[95m",
        brightCyan: "\x1b[96m",
        brightWhite: "\x1b[97m",
    },
};
const SetColor = (colors, text) => {
    return colors.join("") + text + "\x1b[0m";
};
exports.SetColor = SetColor;
