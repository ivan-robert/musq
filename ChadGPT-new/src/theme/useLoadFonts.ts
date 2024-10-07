import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { fonts } from "./typography";

export const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync(fonts);
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return { areFontsLoaded: fontsLoaded };
};
