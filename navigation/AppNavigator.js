import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import JoinNavigator from "./JoinNavigator";
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

const Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.trueWhite,
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const AppNavigator = (props) => {
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const alert = useSelector((state) => state.common.alert);
  const isPreview = useSelector((state) => state.auth.isPreview);
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
    else if (!isPreview && !isJoin && didTryAutoLogin) return <JoinNavigator />;
    else if ((isPreview || isJoin) && didTryAutoLogin && didTryPopup)
      return <MainNavigator />;
    else if (isPreview && didTryAutoLogin) return <MainNavigator />;
    return <StartupScreen />;
  };

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // console.log("App has come to the foreground!");
      CommonActions.updateExpo(dispatch);

      const userInfoData = await Util.getStorageItem("userInfoData");
      const parsedUserData = await JSON.parse(userInfoData);
      if (!_.isEmpty(parsedUserData)) {
        dispatch(fetchPushCnt({ user_cd: parsedUserData.user_cd }));
      }
    }
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
    })();
    AppState.addEventListener("change", _handleAppStateChange);
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.warn(JSON.stringify(response, null, "\t"));
        // console.warn(response.notification.request.content.data);
        dispatch(CommonActions.setNotification(response.notification));
      }
    );
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        // console.warn(JSON.stringify(notification, null, "\t"));
        //  console.warn(notification.request.content.data);
        dispatch(CommonActions.setNotification(notification));
        const userInfoData = await Util.getStorageItem("userInfoData");
        const parsedUserData = await JSON.parse(userInfoData);
        if (!_.isEmpty(parsedUserData)) {
          dispatch(fetchPushCnt({ user_cd: parsedUserData.user_cd }));
        }
      }
    );

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      backgroundSubscription.remove();
      foregroundSubscription.remove();
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
        }}
      >
        {currentScreen()}
      </NavigationContainer>
    </Fragment>
  );
};

export default AppNavigator;
