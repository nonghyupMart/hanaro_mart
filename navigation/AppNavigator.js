import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { MainNavigator } from "./MainNavigator";

import JoinNavigator from "./JoinNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";

import Loading from "../components/UI/Loading";
import StartupScreen from "@screens/StartupScreen";
import _ from "lodash";
const AppNavigator = (props) => {
  const isPreview = useSelector((state) => state.auth.isPreview);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const isJoin = useSelector((state) => state.auth.isJoin);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      {!isPreview && !isJoin && !didTryAutoLogin && <StartupScreen />}
      {!isPreview && !isJoin && didTryAutoLogin && <JoinNavigator />}
      {(isPreview || isJoin) && <MainNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
