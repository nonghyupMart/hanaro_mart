import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  View,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import Splash from "@UI/Splash";
import AppNavigator from "./navigation/AppNavigator";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import * as Notifications from "expo-notifications";
import authReducer from "@reducers/auth";
import branchesReducer from "@reducers/branches";
import homeReducer from "@reducers/home";
import flyerReducer from "@reducers/flyer";
import eventReducer from "@reducers/event";
import couponReducer from "@reducers/coupon";
import commonReducer from "@reducers/common";
import { WITHDRAWAL } from "@actions/auth";
LogBox.ignoreLogs(["Expected", "No native"]);
// console.disableLogBox = true;
// console.ignoredLogBox = ["Warning:"];
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});
const { width, height } = Dimensions.get("window");

const appReducer = combineReducers({
  auth: authReducer,
  branches: branchesReducer,
  home: homeReducer,
  flyer: flyerReducer,
  event: eventReducer,
  coupon: couponReducer,
  common: commonReducer,
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

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  if (!__DEV__) {
    usePreventScreenCapture();
  }
  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.warn(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.warn(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="light" backgroundColor="white" />
      <AppNavigator />
    </Provider>
  );
}