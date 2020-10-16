import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "@actions/auth";
import AsyncStorage from "@react-native-community/async-storage";
import Splash from "@UI/Splash";
import * as CommonActions from "@actions/common";
import moment from "moment";
import * as Util from "@util";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const userStoreData = await Util.getStorageItem("userStoreData");
      dispatch(authActions.saveUserStore(JSON.parse(userStoreData)));

      const userInfoData = await Util.getStorageItem("userInfoData");
      const parsedUserData = JSON.parse(userInfoData);
      dispatch(authActions.setUserInfo(parsedUserData));
      if (parsedUserData && parsedUserData.user_id) {
        dispatch(authActions.setIsJoin(true));
        dispatch(
          authActions.updateLoginLog({ user_cd: parsedUserData.user_cd })
        );
      } else dispatch(authActions.setIsJoin(false));

      const agreedStatusData = await Util.getStorageItem("agreedStatusData");
      dispatch(authActions.setAgreedStatus(JSON.parse(agreedStatusData)));

      getIsStorePopup(userStoreData);

      const dateForAppPopup = await Util.getStorageItem("dateForAppPopupData");
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

export const getIsStorePopup = (userStore) => {
  (async () => {
    const dateForStorePopup = await Util.getStorageItem(
      "dateForStorePopupData"
    );
    let setDate = moment().subtract(1, "days");
    if (dateForStorePopup) setDate = moment(dateForStorePopup);

    //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
    dispatch(
      CommonActions.setIsStorePopup(moment(setDate).isBefore(moment(), "day"))
    );
  })();
};
export default StartupScreen;
