import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../store/actions/auth";
import Splash from "../components/UI/Splash";
import * as CommonActions from "../store/actions/common";
import moment from "moment";
import * as Util from "../util";
import _ from "lodash";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as branchesActions from "../store/actions/branches";
import { INTERNAL_APP_VERSION } from "../constants";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const isJoin = useSelector((state) => state.auth.isJoin);
  const permissionStatus = useRef(null);
  const userStore = useSelector((state) => state.auth.userStore);
  const timerRef = useRef(null);

  useEffect(() => {
    (async () => {
      await dispatch(authActions.fetchUpdate()).then((data) => {
        if (data.popupCnt <= 0) return;
        let obj = data.popupList[0];
        if (!obj.app_ver) return;
        const index = INTERNAL_APP_VERSION.indexOf(".", 2);
        let versionCheck = Util.versionCompare(
          INTERNAL_APP_VERSION.slice(0, index),
          obj.app_ver
        );

        if (versionCheck < 0) {
          //버전이 낮을때만 업데이트 팝업 페이지로 이동
          dispatch(authActions.setIsUpdated(false));
          return;
        }
      });
      if (Constants.isDevice) {
        try {
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          if (token) await dispatch(authActions.setPushToken(token));
        } catch (error) {
          Util.log(" Notifications.getExpoPushTokenAsync error =>", error);
        }
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      permissionStatus.current = status;

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
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isJoin == null) return;
      if (isJoin) {
        // 이미 가입한 경우 홈화면으로 이동
        await dispatch(authActions.setDidTryAL());
        await SplashScreen.hideAsync();
        await dispatch(CommonActions.setIsLoading(false));
        return;
      }

      if (permissionStatus.current !== "granted") {
        //권한 거부시 신촌점 호출
        fetchBranchNear();
        return;
      }

      let location = await Location.getLastKnownPositionAsync();
      fetchBranchNear(location);
    })();
  }, [isJoin]);

  const fetchBranchNear = async (location) => {
    let query = {};
    if (location) {
      query.lat = location.coords.latitude;
      query.lng = location.coords.longitude;
    }
    dispatch(branchesActions.fetchBranchNear(query)).then(async (data) => {
      if (!data || !data.storeInfo || !_.isEmpty(userStore)) return;
      dispatch(authActions.saveUserStore(data)).then(async (d) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        await dispatch(CommonActions.setIsLoading(false));
        await dispatch(authActions.setDidTryAL());
        await SplashScreen.hideAsync();
      });
    });
  };

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
