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

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const isJoin = useSelector((state) => state.auth.isJoin);
  const permissionStatus = useRef(null);
  const userStore = useSelector((state) => state.auth.userStore);
  const timerRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (!isUpdatedVersion()) return;
      getExpoPushToken();
      getLocationPermission();
      const userStoreData = getUserStoreData();
      getUserInfo();
      await getIsStorePopup(userStoreData, dispatch);
      await initAppPopupData();
      finish();
    })();
  }, []);

  const initAppPopupData = async () => {
    const dateForAppPopup = await Util.getStorageItem("dateForAppPopupData");
    setDate = moment().subtract(1, "days");
    if (dateForAppPopup) setDate = moment(dateForAppPopup);

    //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
    await dispatch(
      CommonActions.setIsAppPopup(moment(setDate).isBefore(moment(), "day"))
    );
  };

  const getUserInfo = async () => {
    const userInfoData = await Util.getStorageItem("userInfoData");
    const parsedUserData = await JSON.parse(userInfoData);
    await dispatch(authActions.setUserInfo(parsedUserData));
    if (parsedUserData && parsedUserData.user_id) {
      await dispatch(authActions.setIsJoin(true));
    } else await dispatch(authActions.setIsJoin(false));
  };

  const getUserStoreData = async () => {
    const userStoreData = await Util.getStorageItem("userStoreData");
    await dispatch(authActions.saveUserStore(JSON.parse(userStoreData)));
    return userStoreData;
  };

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    permissionStatus.current = status;
  };

  const getExpoPushToken = async () => {
    if (Constants.isDevice) {
      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        if (token) await dispatch(authActions.setPushToken(token));
      } catch (error) {
        Util.log(" Notifications.getExpoPushTokenAsync error =>", error);
      }
    }
  };

  const isUpdatedVersion = async () => {
    await dispatch(authActions.fetchUpdate()).then((data) => {
      if (data.popupCnt <= 0) return;
      let obj = data.popupList[0];
      if (!obj.app_ver) return;
      const index = Constants.manifest.version.indexOf(".", 2);
      let versionCheck = Util.versionCompare(
        Constants.manifest.version.slice(0, index),
        obj.app_ver
      );

      if (versionCheck < 0) {
        //버전이 낮을때만 업데이트 팝업 페이지로 이동
        dispatch(authActions.setIsUpdated(false));
        return false;
      }
      return true;
    });
  };

  const fetchBranchNear = async (location) => {
    let query = {};
    if (location) {
      query.lat = location.coords.latitude;
      query.lng = location.coords.longitude;
    }
    dispatch(branchesActions.fetchBranchNear(query)).then(async (data) => {
      if (!data || !data.storeInfo || !_.isEmpty(userStore)) return finish();
      dispatch(authActions.saveUserStore(data)).then(async (d) => {
        finish();
      });
    });
  };

  const finish = async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    await dispatch(CommonActions.setIsLoading(false));
    await dispatch(authActions.setDidTryAL());
    await SplashScreen.hideAsync();
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
