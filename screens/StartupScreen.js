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

      const dateForStorePopup = await AsyncStorage.getItem(
        "dateForStorePopupData"
      );
      let setDate = moment().subtract(1, "days");
      if (dateForStorePopup) setDate = moment(dateForStorePopup);

      //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
      dispatch(
        CommonActions.setIsStorePopup(moment(setDate).isBefore(moment(), "day"))
      );

      const dateForAppPopup = await AsyncStorage.getItem("dateForAppPopupData");
      setDate = moment().subtract(1, "days");
      if (dateForAppPopup) setDate = moment(dateForAppPopup);

      //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
      dispatch(
        CommonActions.setIsAppPopup(moment(setDate).isBefore(moment(), "day"))
      );

      dispatch(authActions.setDidTryAL());
    })();
  }, [dispatch]);
  return <Splash />;
};

export default StartupScreen;
