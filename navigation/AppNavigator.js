import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { MainNavigator } from "./MainNavigator";

import JoinNavigator from "./JoinNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";
import {
  setUserStore,
  setUserInfo,
  setAgreedStatus,
  setPreview,
} from "@actions/auth";
import Loading from "../components/UI/Loading";
import StartupScreen from "@screens/StartupScreen";

const AppNavigator = (props) => {
  const dispatch = useDispatch();
  const isPreview = useSelector((state) => state.auth.isPreview);
  const agreedStatus = useSelector((state) => state.auth.agreedStatus);
  const userStore = useSelector((state) => state.auth.userStore);
  let logic = false;
  let AgreedStatusData;
  useEffect(() => {
    (async () => {
      if (agreedStatus) console.warn("agreedStatus", agreedStatus);
      const userStoreData = await AsyncStorage.getItem("userStoreData");
      dispatch(setUserStore(JSON.parse(userStoreData)));
      const userInfoData = await AsyncStorage.getItem("userInfoData");
      dispatch(setUserInfo(JSON.parse(userInfoData)));
      AgreedStatusData = await AsyncStorage.getItem("AgreedStatusData");
      console.warn(JSON.parse(AgreedStatusData));
      dispatch(setAgreedStatus(JSON.parse(AgreedStatusData)));
  })();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      {!isPreview && !agreedStatus && <StartupScreen />}
      {!isPreview &&
        (!agreedStatus ||
          (agreedStatus && Object.keys(agreedStatus).length === 0)) && (
          <JoinNavigator />
        )}
      {(isPreview ||
        (agreedStatus && Object.keys(agreedStatus).length !== 0)) && (
        <MainNavigator userStore={userStore} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
