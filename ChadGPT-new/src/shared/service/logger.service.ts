import { getEnvironment } from "#app/environment";

export const Logger = {
  info: (...message: string[]) => {
    if (getEnvironment() !== "DEVELOPMENT") return;
    // eslint-disable-next-line no-console
    console.log(message);
  },
  error: (...message: string[]) => {
    if (getEnvironment() !== "DEVELOPMENT") return;
    // eslint-disable-next-line no-console
    console.error(message);
  },
};
