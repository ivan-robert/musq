import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

const setStringItem = (key: string, value: string) => {
  storage.set(key, value);
};

const getStringItem = (key: string): string | null => {
  return storage.getString(key) || null;
};

const removeItem = (key: string) => {
  storage.delete(key);
};

interface ILocalStorage {
  getStringItem: (key: string) => string | null;
  setStringItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clearAll: () => void;
}

export const LocalStorage: ILocalStorage = {
  getStringItem,
  setStringItem,
  removeItem,
  clearAll: () => storage.clearAll(),
};
