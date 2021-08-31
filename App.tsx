import AppLoading from "expo-app-loading";
import Constants from "expo-constants";
import "expo-dev-client";
import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { AppearanceProvider } from "react-native-appearance";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import {
  fetchFonts, initializeApplication, initStatusBarStyle,
  routingInstrumentation, store
} from "./helpers";
import AppNavigator from "./navigation/AppNavigator";

initializeApplication();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  if (Constants.manifest && Constants.manifest.releaseChannel === "prod") {
    usePreventScreenCapture();
  }

  initStatusBarStyle();

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
