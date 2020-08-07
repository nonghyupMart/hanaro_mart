import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { StyleSheet, BackHandler, Alert } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import * as Notifications from "expo-notifications";
import authReducer from "./store/reducers/auth";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const rootReducer = combineReducers({ auth: authReducer });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  usePreventScreenCapture();
  const [fontLoaded, setFontLoaded] = useState(false);
  // const [pushToken, setPushToken] = useState();

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    // BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
      // BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
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
    <Provider store={store}>
      <StatusBar barStyle="light" backgroundColor="white" />
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ringPickerContainer: {
    flex: 1,
    position: "absolute",
    bottom: -200,
  },
});
