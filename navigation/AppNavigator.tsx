import { NavigationContainer } from "@react-navigation/native";
import * as Analytics from "expo-firebase-analytics";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import { AppState, BackHandler } from "react-native";
import Alert from "../components/UI/Alert";
import Loading from "../components/UI/Loading";
import {
  createBackHandler,
  getBackgroundNotificationListener,
  getForegroundNotificationListener,
  getNotificationData,
  handleAppStateChange,
  initDeepLink,
  theme,
  validateRooting,
} from "../helpers";
import { useAppDispatch, useAppSelector } from "../hooks";
import StartupScreen from "../screens/StartupScreen";
import StorePopupScreen from "../screens/StorePopupScreen";
import UpdateScreen from "../screens/UpdateScreen";
import * as CommonActions from "../store/actions/common";
import * as Util from "../utils";
import { MainNavigator } from "./MainNavigator";
import { isReadyRef, navigationRef } from "./RootNavigation";

const AppNavigator = (props) => {
  const routeNameRef = useRef<string | undefined>();
  const routingInstrumentation = props.routingInstrumentation;
  const notificationListener = useRef() as any;
  const responseListener = useRef() as any;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const alert = useAppSelector((state) => state.common.alert);
  const didTryAutoLogin = useAppSelector((state) => state.auth.didTryAutoLogin);
  const didTryStorePopup = useAppSelector(
    (state) => state.common.didTryStorePopup
  );
  const isAppUpdated = useAppSelector((state) => state.auth.isAppUpdated);
  const isBottomNavigation = useAppSelector(
    (state) => state.common.isBottomNavigation
  );

  useEffect(() => {
    const backHandler = createBackHandler(dispatch, isBottomNavigation);
    return () => {
      backHandler.remove();
    };
  }, [isBottomNavigation]);

  useEffect(() => {
    (async () => {
      try {
        await validateRooting();
        await initDeepLink(dispatch);
        await getNotificationData(dispatch);
      } catch (error) {
        dispatch(
          CommonActions.setAlert({
            message: error.message,
            onPressConfirm: () => {
              BackHandler.exitApp();
            },
          })
        );
      }
    })();

    const appStateHandler = handleAppStateChange.bind(this, dispatch);
    AppState.addEventListener("change", appStateHandler);
    notificationListener.current = getBackgroundNotificationListener(dispatch);
    responseListener.current = getForegroundNotificationListener(dispatch);
    return async () => {
      await Util.removeStorageItem("notificationData");
      AppState.removeEventListener("change", appStateHandler);
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };

    return () => {};
  }, []);

  const currentScreen = () => {
    if (!isAppUpdated) return <UpdateScreen />;
    else if (!didTryAutoLogin) return <StartupScreen />;
    else if (didTryAutoLogin && !didTryStorePopup) return <StorePopupScreen />;
    else if (didTryAutoLogin && didTryStorePopup) return <MainNavigator />;
    return <StartupScreen />;
  };

  const onReady = () => {
    isReadyRef.current = true;
    routingInstrumentation.registerNavigationContainer(navigationRef);
  };

  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    if (!navigationRef.getCurrentRoute()) return;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      // The line below uses the expo-firebase-analytics tracker
      // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
      // Change this line to use another Mobile analytics SDK
      await Analytics.setCurrentScreen(currentRouteName);
    }

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName;
  };
  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
      {alert && <Alert alert={alert} />}
      <NavigationContainer
        theme={theme}
        ref={navigationRef}
        onReady={onReady}
        onStateChange={onStateChange}
      >
        {currentScreen()}
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
