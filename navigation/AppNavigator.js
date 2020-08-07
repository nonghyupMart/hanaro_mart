import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { MainNavigator } from "./MainNavigator";

import JoinNavigator from "./JoinNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";

const AppNavigator = (props) => {
  // const isAgreed = false;
  const isAgreed = useSelector((state) => state.auth.isAgreed);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      {isAgreed && <MainNavigator />}
      {!isAgreed && <JoinNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
