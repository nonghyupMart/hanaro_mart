import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { MainNavigator } from "./MainNavigator";

import JoinNavigator from "./JoinNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";
import { setUserStore } from "@actions/auth";

const AppNavigator = (props) => {
  const dispatch = useDispatch();
  // const isAgreed = false;
  const isAgreed = useSelector((state) => state.auth.isAgreed);
  const userStore = useSelector((state) => state.auth.userStore);
  useEffect(() => {
    (async () => {
      const userStoreData = await AsyncStorage.getItem("userStoreData");
      const data = JSON.parse(userStoreData);
      dispatch(setUserStore(data));
    })();
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      {isAgreed && <MainNavigator userStore={userStore} />}
      {!isAgreed && <JoinNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
