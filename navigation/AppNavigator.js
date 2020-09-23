import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { MainNavigator } from "./MainNavigator";

import JoinNavigator from "./JoinNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";
import {
  setUserStore,
  setUserInfo,
  setAgreedStatus,
  setIsJoin,
} from "@actions/auth";
import Loading from "../components/UI/Loading";
import StartupScreen from "@screens/StartupScreen";
import _ from "lodash";
const AppNavigator = (props) => {
  const dispatch = useDispatch();
  const isPreview = useSelector((state) => state.auth.isPreview);
  const isJoin = useSelector(async (state) => {
    const userInfoData = await AsyncStorage.getItem("userInfoData");
    const data = JSON.parse(userInfoData);
    // console.warn("isJoin==> ", data);
    if (data && data.user_id) {
      return true;
    } else {
      return false;
    }
  });
  const agreedStatus = async (state) => {
    const agreedStatusData = await AsyncStorage.getItem("agreedStatusData");
    const data = JSON.parse(agreedStatusData);
    return data;
  };
  const userStore = async (state) => {
    const userStoreData = await AsyncStorage.getItem("userStoreData");
    const data = JSON.parse(userStoreData);
    return data;
  };
  const userInfo = async (state) => {
    const userInfoData = await AsyncStorage.getItem("userInfoData");
    const data = JSON.parse(userInfoData);

    return data;
  };

  useEffect(() => {
    (async () => {
      const userStoreData = await AsyncStorage.getItem("userStoreData");
      dispatch(setUserStore(JSON.parse(userStoreData)));
      const userInfoData = await AsyncStorage.getItem("userInfoData");
      const parsedUserData = JSON.parse(userInfoData);
      dispatch(setUserInfo(parsedUserData));
      if (parsedUserData.user_id) dispatch(setIsJoin(true));
      else dispatch(setIsJoin(false));
      AgreedStatusData = await AsyncStorage.getItem("AgreedStatusData");
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
      {!userInfo && !agreedStatus && _.isEmpty(userStore) && <StartupScreen />}
      {!isPreview && !isJoin && <JoinNavigator />}
      {(isPreview || isJoin) && <MainNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
