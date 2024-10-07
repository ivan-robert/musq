export type Flatten<T> = T extends object ? Flatten<T[keyof T]> : T;
