import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import JoinNavigator from "./JoinNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";
import StartupScreen from "@screens/StartupScreen";
import Alert from "@UI/Alert";
import Loading from "@UI/Loading";
import colors from "@constants/colors";

const Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.trueWhite,
  },
};

const AppNavigator = (props) => {
  const isPreview = useSelector((state) => state.auth.isPreview);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const isJoin = useSelector((state) => state.auth.isJoin);

  return (
    <Fragment>
      <Loading />
      <Alert />
      <NavigationContainer
        theme={Theme}
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        {!isPreview && !isJoin && !didTryAutoLogin && <StartupScreen />}
        {!isPreview && !isJoin && didTryAutoLogin && <JoinNavigator />}
        {(isPreview || isJoin) && <MainNavigator />}
      </NavigationContainer>
    </Fragment>
  );
};

export default AppNavigator;
