import { Platform, StatusBar } from "react-native";

export const initStatusBarStyle = async () => {
  if (Platform.OS === "android") {
    return StatusBar.setBackgroundColor(colors.TRUE_WHITE);
  }
  await StatusBar.setBarStyle("dark-content");
  setTimeout(() => {
    StatusBar.setBarStyle("dark-content");
  }, 3000);
};