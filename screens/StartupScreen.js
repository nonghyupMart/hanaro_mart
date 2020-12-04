import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "@actions/auth";
import Splash from "@UI/Splash";
import * as CommonActions from "@actions/common";
import moment from "moment";
import * as Util from "@util";
import _ from "lodash";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      if (token) await dispatch(authActions.setPushToken(token));
      const userStoreData = await Util.getStorageItem("userStoreData");
      await dispatch(authActions.saveUserStore(JSON.parse(userStoreData)));

      const userInfoData = await Util.getStorageItem("userInfoData");
      const parsedUserData = await JSON.parse(userInfoData);
      await dispatch(authActions.setUserInfo(parsedUserData));
      if (parsedUserData && parsedUserData.user_id) {
        await dispatch(authActions.setPreview(false));
        await dispatch(authActions.setIsJoin(true));
      } else await dispatch(authActions.setIsJoin(false));

      const agreedStatusData = await Util.getStorageItem("agreedStatusData");
      await dispatch(authActions.setAgreedStatus(JSON.parse(agreedStatusData)));

      await getIsStorePopup(userStoreData, dispatch);

      const dateForAppPopup = await Util.getStorageItem("dateForAppPopupData");
      setDate = moment().subtract(1, "days");
      if (dateForAppPopup) setDate = moment(dateForAppPopup);

      //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
      await dispatch(
        CommonActions.setIsAppPopup(moment(setDate).isBefore(moment(), "day"))
      );
      await SplashScreen.hideAsync();
      await dispatch(authActions.setDidTryAL());
    })();
  }, []);
  return <Splash />;
};

export const getIsStorePopup = async (userStore, dispatch) => {
  const dateForStorePopup = await Util.getStorageItem("dateForStorePopupData");

  let obj = await JSON.parse(dateForStorePopup);
  if (!obj) obj = {};
  // console.warn(obj);
  await dispatch(CommonActions.setIsStorePopup(obj));
  return obj;
};
export default StartupScreen;
