import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as Analytics from "expo-firebase-analytics";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";
import StartupScreen from "../screens/StartupScreen";
import StorePopupScreen from "../screens/StorePopupScreen";
import UpdateScreen from "../screens/UpdateScreen";
import Alert from "../components/UI/Alert";
import Loading from "../components/UI/Loading";
import * as CommonActions from "../store/actions/common";
import * as Notifications from "expo-notifications";
import { BackHandler, AppState } from "react-native";
import _ from "lodash";
import * as Util from "../utils";
import {
  initDeepLink,
  getNotificationData,
  validateRooting,
  theme,
  handleAppStateChange,
  getBackgroundNotificationListener,
  getForegroundNotificationListener,
  createBackHandler,
} from "../helpers";
import { RootState, useAppDispatch, useAppSelector } from "../hooks";

const AppNavigator = (props) => {
  const routeNameRef = useRef();
  const routingInstrumentation = props.routingInstrumentation;
  const notificationListener = useRef() as any;
  const responseListener = useRef() as any;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const alert = useAppSelector((state) => state.common.alert);
  const didTryAutoLogin = useAppSelector((state) => state.auth.didTryAutoLogin);
  const isJoined = useAppSelector((state) => state.auth.isJoined);
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
    else if (didTryAutoLogin && !didTryStorePopup) return <StorePopupScreen />;
    else if (!didTryAutoLogin && !didTryStorePopup) return <StartupScreen />;
    else if (didTryAutoLogin && didTryStorePopup) return <MainNavigator />;
    return <StartupScreen />;
  };

  const onReady = () => {
    isReadyRef.current = true;
    routingInstrumentation.registerNavigationContainer(navigationRef);
  };

  const onStateChange = async () => {
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
