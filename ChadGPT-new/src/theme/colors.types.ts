import { darkColors } from "./colors";
import { Flatten } from "./utils";

type Colors = typeof darkColors;

export type Color = Flatten<Colors>;
