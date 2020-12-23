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
import Splash from "@UI/Splash";
import AppNavigator from "./navigation/AppNavigator";
import { AppLoading } from "expo";
// import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import authReducer from "@reducers/auth";
import branchesReducer from "@reducers/branches";
import homeReducer from "@reducers/home";
import flyerReducer from "@reducers/flyer";
import eventReducer from "@reducers/event";
import couponReducer from "@reducers/coupon";
import commonReducer from "@reducers/common";
import exhibitionReducer from "@reducers/exhibition";
import exclusiveReducer from "@reducers/exclusive";
import { WITHDRAWAL } from "@actions/auth";
import * as Notifications from "expo-notifications";
import * as CommonActions from "@actions/common";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    CustomFont: require("./assets/fonts/Roboto-Regular.ttf"),
    "CustomFont-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!__DEV__) {
    usePreventScreenCapture();
  }

  useEffect(() => {
    if (Platform.OS == "android") return;
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
      />
    );
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
