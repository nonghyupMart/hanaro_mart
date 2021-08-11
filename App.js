import "expo-dev-client";
import * as Sentry from "sentry-expo";
import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Provider, useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
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
import memoReducer from "./store/reducers/memo";
import wishReducer from "./store/reducers/wish";
import { WITHDRAWAL } from "./store/actions/auth";
import * as Notifications from "expo-notifications";
import * as CommonActions from "./store/actions/common";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Constants from "expo-constants";
import * as Util from "./util";
import { init } from "./helpers/db";
import { SERVER_URL } from "./constants";
import { RewriteFrames as RewriteFramesIntegration } from "@sentry/integrations";
const routingInstrumentation =
  new Sentry.Native.ReactNavigationV5Instrumentation();

Sentry.init({
  dsn: "https://f9dc315fd77b4b46886b29ceb067bcb3@o941457.ingest.sentry.io/5890267",
  enableInExpoDevelopment: false,
  debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
      beforeNavigate: (context) => {
        // Decide to not send a transaction by setting sampled = false
        if (context.data.route.name === "Do Not Send") {
          context.sampled = false;
        }

        // Modify the transaction context
        context.name = context.name.toUpperCase();
        context.tags = {
          ...context.tags,
          customTag: "value",
        };

        return context;
      },
      tracingOrigins: ["localhost", SERVER_URL, /^\//],
    }),
    new RewriteFramesIntegration({
      iteratee: (frame) => {
        if (frame.filename) {
          // the values depend on what names you give the bundle files you are uploading to Sentry
          frame.filename =
            Platform.OS === "android"
              ? "app:///index.android.bundle"
              : "app:///main.jsbundle";
        }
        return frame;
      },
    }),
  ],
  tracesSampleRate: 0.25,
});

init()
  .then(() => {
    Util.log("Initialized database");
  })
  .catch((err) => {
    Util.log("Initializing db failed.");
    Util.log(err);
  });

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true }),
});

try {
  // Prevent native splash screen from autohiding before App component declaration
  SplashScreen.preventAutoHideAsync();
} catch (e) {
  Util.log("SplashScreen error=>", e);
}

let globalInitialNotificationResponse;

let globalSubscription = Notifications.addNotificationResponseReceivedListener(
  (response) => {
    // When App is not running.
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
  wish: wishReducer,
  memo: memoReducer,
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
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (Constants.manifest.releaseChannel === "prod") {
    usePreventScreenCapture();
  }

  useEffect(() => {
    if (Platform.OS === "android")
      return StatusBar.setBackgroundColor(colors.TRUE_WHITE);
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
          <AppNavigator routingInstrumentation={routingInstrumentation} />
        </Provider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
