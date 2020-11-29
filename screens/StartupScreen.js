import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "@actions/auth";
import Splash from "@UI/Splash";
import * as CommonActions from "@actions/common";
import moment from "moment";
import * as Util from "@util";
import _ from "lodash";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userStoreData = await Util.getStorageItem("userStoreData");
      await dispatch(authActions.saveUserStore(JSON.parse(userStoreData)));

      const userInfoData = await Util.getStorageItem("userInfoData");
      const parsedUserData = await JSON.parse(userInfoData);
      await dispatch(authActions.setUserInfo(parsedUserData));
      if (parsedUserData && parsedUserData.user_id) {
        dispatch(authActions.setPreview(false));
        dispatch(authActions.setIsJoin(true));
      } else dispatch(authActions.setIsJoin(false));

      const agreedStatusData = await Util.getStorageItem("agreedStatusData");
      dispatch(authActions.setAgreedStatus(JSON.parse(agreedStatusData)));

      await getIsStorePopup(userStoreData, dispatch);

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

export const getIsStorePopup = async (userStore, dispatch) => {
  const dateForStorePopup = await Util.getStorageItem("dateForStorePopupData");

  let obj = await JSON.parse(dateForStorePopup);
  if (!obj) obj = {};
  // console.warn(obj);
  await dispatch(CommonActions.setIsStorePopup(obj));
  return obj;
};
export default StartupScreen;
