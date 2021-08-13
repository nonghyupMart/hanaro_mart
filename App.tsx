import "expo-dev-client";
import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import AppLoading from "expo-app-loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Constants from "expo-constants";
import {
  store,
  fetchFonts,
  initStatusBarStyle,
  routingInstrumentation,
  init,
} from "./helpers/initialize";

init();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<Boolean>(false);
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