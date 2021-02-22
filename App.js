import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Provider, useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  View,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions,
  LogBox,
  Platform,
  StatusBar,
} from "react-native";
import Splash from "./components/UI/Splash";
import AppNavigator from "./navigation/AppNavigator";
import AppLoading from "expo-app-loading";
// import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import authReducer from "./store/reducers/auth";
import branchesReducer from "./store/reducers/branches";
import homeReducer from "./store/reducers/home";
import flyerReducer from "./store/reducers/flyer";
import eventReducer from "./store/reducers/event";
import couponReducer from "./store/reducers/coupon";
import commonReducer from "./store/reducers/common";
import exhibitionReducer from "./store/reducers/exhibition";
import exclusiveReducer from "./store/reducers/exclusive";
import { WITHDRAWAL } from "./store/actions/auth";
import * as Notifications from "expo-notifications";
import * as CommonActions from "./store/actions/common";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Constants from "expo-constants";

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync();

let globalInitialNotificationResponse;

let globalSubscription = Notifications.addNotificationResponseReceivedListener(
  (response) => {
    // global.alert(JSON.stringify(response, null, "\t"));
    // global.alert("Global scope listener triggered");
    CommonActions.saveNotificationToStorage(response.notification);
    globalInitialNotificationResponse = response;
    ensureGlobalSubscriptionIsCleared();
  }
);

function ensureGlobalSubscriptionIsCleared() {
  if (globalSubscription) {
    globalSubscription.remove();
    globalSubscription = null;
  }
}

LogBox.ignoreLogs(["Expected", "No native", "Require cycle", "cycles"]);
// console.disableLogBox = true;
// console.ignoredLogBox = ["Warning:"];
const { width, height } = Dimensions.get("window");

const appReducer = combineReducers({
  auth: authReducer,
  branches: branchesReducer,
  home: homeReducer,
  flyer: flyerReducer,
  event: eventReducer,
  coupon: couponReducer,
  common: commonReducer,
  exhibition: exhibitionReducer,
  exclusive: exclusiveReducer,
});
const rootReducer = (state, action) => {
  if (action.type === WITHDRAWAL) {
    // for all keys defined in your persistConfig(s)
    // AsyncStorage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    state = undefined;
  }
  return appReducer(state, action);
};
const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"), //400
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"), //900
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"), //300
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"), //500
  });
};
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (Constants.manifest.releaseChannel == "prod") {
    usePreventScreenCapture();
  }

  useEffect(() => {
    if (Platform.OS == "android")
      return StatusBar.setBackgroundColor(colors.trueWhite);
    (async () => {
      await StatusBar.setBarStyle("dark-content");
    })();
    setTimeout(() => {
      StatusBar.setBarStyle("dark-content");
    }, 3000);
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
          <AppNavigator />
        </Provider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
