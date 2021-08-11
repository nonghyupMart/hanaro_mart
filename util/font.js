import * as Font from "expo-font";

export const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"), //400
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"), //900
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"), //300
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"), //500
  });
};
