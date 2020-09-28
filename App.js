import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  View,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  ActivityIndicator,
  Dimensions,
  LogBox,
} from "react-native";
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

LogBox.ignoreLogs(["Expected"]);
// console.disableLogBox = true;
// console.ignoredLogBox = ["Warning:"];
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});
const { width, height } = Dimensions.get("window");

const rootReducer = combineReducers({
  auth: authReducer,
  branches: branchesReducer,
  home: homeReducer,
  flyer: flyerReducer,
  event: eventReducer,
  coupon: couponReducer,
  common: commonReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  usePreventScreenCapture();
  const [isReady, setIsReady] = useState(false);
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
  SplashScreen.preventAutoHideAsync();

  const _cacheResourcesAsync = async () => {
    SplashScreen.hideAsync();
    const images = [
      require("./assets/images/20200811_83175949013327_5_1280x480 (1).jpg"),
      // require("./assets/images/slack-icon.png"),
    ];

    // const cacheImages = images.map((image) => {
    //   return Asset.fromModule(image).downloadAsync();
    // });
    // const cacheImages = () => {
    //   return new Promise((resolve) => setTimeout(resolve, 1000));
    // };

    // await Promise.all(cacheImages);
    await new Promise((resolve) => setTimeout(resolve, 0));
    setIsReady(() => true);
  };
  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("@images/img1242x2436.png")}
          onLoad={_cacheResourcesAsync}
          style={{ resizeMode: "cover", width: "100%", height: "100%" }}
        />
        <ActivityIndicator
          size="large"
          color={colors.cerulean}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </View>
    );
  }
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
