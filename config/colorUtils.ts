export const COLOR = {
  fg: {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
  },
};

export const SetColor = (colors: string[], text: string): string => {
  return colors.join("") + text + "\x1b[0m";
};
