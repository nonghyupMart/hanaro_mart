import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as Analytics from "expo-firebase-analytics";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";
import StartupScreen from "../screens/StartupScreen";
import PopupScreen from "../screens/PopupScreen";
import UpdateScreen from "../screens/UpdateScreen";
import Alert from "../components/UI/Alert";
import Loading from "../components/UI/Loading";
import colors from "../constants/Colors";
import * as CommonActions from "../store/actions/common";
import * as Notifications from "expo-notifications";
import { BackHandler, AppState } from "react-native";
import * as Device from "expo-device";
import { fetchPushCnt } from "../store/actions/auth";
import _ from "lodash";
import * as Util from "../util";
import * as Linking from "expo-linking";

const Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.TRUE_WHITE,
  },
};

const AppNavigator = (props) => {
  const routeNameRef = useRef();
  const routingInstrumentation = props.routingInstrumentation;
  const notificationListener = useRef();
  const responseListener = useRef();
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const alert = useSelector((state) => state.common.alert);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const didTryPopup = useSelector((state) => state.common.didTryPopup);
  const isUpdated = useSelector((state) => state.auth.isUpdated);
  const isBottomNavigation = useSelector(
    (state) => state.common.isBottomNavigation
  );
  const userInfo = useSelector((state) => state.auth.userInfo);

  const currentScreen = () => {
    if (!isUpdated) return <UpdateScreen />;
    else if (didTryAutoLogin && !didTryPopup) return <PopupScreen />;
    else if (!didTryAutoLogin && !didTryPopup) return <StartupScreen />;
    else if (isJoin && didTryAutoLogin && didTryPopup) return <MainNavigator />;
    else if (didTryAutoLogin) return <MainNavigator />;
    return <StartupScreen />;
  };

  const _handleUrl = async (data) => {
    // this.setState({ url });
    if (!data.url) return;
    CommonActions.navigateByScheme(dispatch, data.url);
  };

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // console.log("App has come to the foreground!");
      const userInfoData = await Util.getStorageItem("userInfoData");
      if (!_.isEmpty(userInfoData)) {
        dispatch(fetchPushCnt({ user_cd: userInfoData.user_cd }));
      }
    } else {
      // console.log("App has come to the background!");
      Util.removeStorageItem("notificationData");
    }
    CommonActions.updateExpo(dispatch);
    appState.current = nextAppState;
  };

  useEffect(() => {
    const backAction = () => {
      dispatch(CommonActions.setBottomNavigation(isBottomNavigation));
      dispatch(CommonActions.setIsLoading(false));
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, [isBottomNavigation]);

  useEffect(() => {
    (async () => {
      await Linking.addEventListener("url", _handleUrl);
      const isRooted = await Device.isRootedExperimentalAsync();
      if (isRooted) {
        return dispatch(
          CommonActions.setAlert({
            message: "루팅이 감지되었습니다.\n고객센터에 문의해주세요.",
            onPressConfirm: () => {
              BackHandler.exitApp();
            },
          })
        );
      }

      const schemeUrl = await Linking.getInitialURL();
      CommonActions.navigateByScheme(dispatch, schemeUrl);

      // When App is not running set received Notification to redux
      let data = await Util.getStorageItem("notificationData");
      if (_.isEmpty(data)) return;
      await dispatch(CommonActions.setNotification(data));
      await Util.removeStorageItem("notificationData");
    })();

    AppState.addEventListener("change", _handleAppStateChange);
    notificationListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // When App is running in the background.
        // console.warn(JSON.stringify(response, null, "\t"));
        // console.warn(response.notification.request.content.data);
        dispatch(CommonActions.setNotification(response.notification));
      });
    responseListener.current = Notifications.addNotificationReceivedListener(
      async (notification) => {
        // When app is running in the foreground.
        // console.warn(JSON.stringify(notification, null, "\t"));
        //  console.warn(notification.request.content.data);
        // dispatch(CommonActions.setNotification(notification));
        const userInfoData = await Util.getStorageItem("userInfoData");
        if (!_.isEmpty(userInfoData)) {
          dispatch(fetchPushCnt({ user_cd: userInfoData.user_cd }));
        }
      }
    );
    return async () => {
      await Util.removeStorageItem("notificationData");
      AppState.removeEventListener("change", _handleAppStateChange);
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Fragment>
      {isLoading && <Loading isLoading={isLoading} />}
      {alert && <Alert alert={alert} />}
      <NavigationContainer
        theme={Theme}
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
          routingInstrumentation.registerNavigationContainer(navigationRef);
        }}
        onStateChange={async (prevState, currentState) => {
          const previousRouteName = routeNameRef.current;
          if (!navigationRef.current.getCurrentRoute()) return;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            // The line below uses the expo-firebase-analytics tracker
            // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
            // Change this line to use another Mobile analytics SDK
            await Analytics.setCurrentScreen(currentRouteName);
          }

          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}
      >
        {currentScreen()}
      </NavigationContainer>
    </Fragment>
  );
};

export default AppNavigator;
