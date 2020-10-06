import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "@actions/auth";
import AsyncStorage from "@react-native-community/async-storage";
import Splash from "@UI/Splash";
import * as CommonActions from "@actions/common";
import moment from "moment";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const userStoreData = await AsyncStorage.getItem("userStoreData");
      dispatch(authActions.saveUserStore(JSON.parse(userStoreData)));

      const userInfoData = await AsyncStorage.getItem("userInfoData");
      const parsedUserData = JSON.parse(userInfoData);
      dispatch(authActions.setUserInfo(parsedUserData));
      if (parsedUserData && parsedUserData.user_id)
        dispatch(authActions.setIsJoin(true));
      else dispatch(authActions.setIsJoin(false));

      const agreedStatusData = await AsyncStorage.getItem("agreedStatusData");
      dispatch(authActions.setAgreedStatus(JSON.parse(agreedStatusData)));

      const storePopup = await AsyncStorage.getItem("storePopupData");
      // console.warn("null ? ", storePopup);
      let setDate = moment().subtract(1, "days");
      if (storePopup) setDate = moment(storePopup);

      // console.warn(
      //   "storePopup",
      //   setDate,
      //   moment(setDate).isBefore(moment(), "day")
      // );
      //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
      dispatch(
        CommonActions.setStorePopup(moment(setDate).isBefore(moment(), "day"))
      );

      const appPopup = await AsyncStorage.getItem("appPopupData");
      setDate = moment().subtract(1, "days");
      if (appPopup) setDate = moment(appPopup);

      //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
      dispatch(
        CommonActions.setAppPopup(moment(setDate).isBefore(moment(), "day"))
      );

      dispatch(authActions.setDidTryAL());
    })();
  }, [dispatch]);
  return <Splash />;
};

export default StartupScreen;
