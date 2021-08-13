import { DefaultTheme } from "@react-navigation/native";
import colors from "../constants/Colors";

export const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.TRUE_WHITE,
  },
};
