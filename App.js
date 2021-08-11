import "expo-dev-client";
import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { LogBox, StatusBar } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Constants from "expo-constants";
import { initSQLite } from "./helpers/db";
import { routingInstrumentation } from "./util/sentry";
import { initNotification } from "./util/notification";
import { store } from "./util/reducer";
import { fetchFonts } from "./util/font";
import { initStatusBarStyle } from "./util/statusBar";

initSQLite();
initNotification();
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(["Expected", "No native", "Require cycle", "cycles"]);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (Constants.manifest.releaseChannel === "prod") {
    usePreventScreenCapture();
  }

  useEffect(() => {
    initStatusBarStyle();
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <AppNavigator routingInstrumentation={routingInstrumentation} />
        </Provider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
