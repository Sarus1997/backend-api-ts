"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetColor = exports.COLOR = void 0;
exports.COLOR = {
    fg: {
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
    },
};
const SetColor = (colors, text) => {
    return colors.join("") + text + "\x1b[0m";
};
exports.SetColor = SetColor;
