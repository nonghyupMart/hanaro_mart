import { initSQLite } from "./db";
import { LogBox } from "react-native";
import { initNotificationReceiver } from "./notification";
import * as SplashScreen from "expo-splash-screen";

export { routingInstrumentation } from "./sentry";
export { store } from "./reducer";
export { fetchFonts } from "./font";
export { initStatusBarStyle } from "./statusBar";

export const init = () => {
  initSQLite();
  initNotificationReceiver();
  SplashScreen.preventAutoHideAsync();
  LogBox.ignoreLogs(["Expected", "No native", "Require cycle", "cycles"]);
};
