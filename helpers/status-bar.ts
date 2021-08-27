import { Platform, StatusBar } from "react-native";
import colors from "../constants/Colors";
import { useEffect } from "react";

export const initStatusBarStyle = async () => {
  if (Platform.OS === "android") {
    return StatusBar.setBackgroundColor(colors.TRUE_WHITE);
  }
  await StatusBar.setBarStyle("dark-content");
  setTimeout(() => {
    StatusBar.setBarStyle("dark-content");
  }, 3000);
};

export const setIOSStatusBarStyle = () => {
  useEffect(() => {
    (async () => {
      if (Platform.OS === "ios") {
        setTimeout(() => {
          StatusBar.setBarStyle("dark-content");
        }, 1000);
      }
    })();
  }, []);
};
