export const Logger = {
  info: (...messages: any[]) => {
    console.log(...messages);
  },
  error: (...messages: any[]) => {
    console.error(...messages);
  },
};
