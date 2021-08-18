import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../store/actions/auth";
import Splash from "../components/UI/Splash";
import * as CommonActions from "../store/actions/common";
import moment from "moment";
import * as Util from "../utils";
import _ from "lodash";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as branchesActions from "../store/actions/branches";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const isJoined = useSelector((state) => state.auth.isJoined);
  const permissionStatus = useRef();
  const userStore = useSelector((state) => state.auth.userStore);
  const timerRef = useRef();

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
      if (!isUpdatedVersion()) return;
      await getExpoPushToken();
      await getLocationPermission();
      await getUserInfoFromStorage();
      await getUserStoreDataFromStorage();
      await getIsStorePopup(dispatch);
      await initAppPopupData();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isJoined === null) return;
      if (isJoined || !_.isEmpty(userStore)) {
        // 이미 가입한 경우 또는 이미 설정한 매장이 있는 경우 홈화면으로 이동
        await finish();
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
  }, [isJoined, userStore]);

  const initAppPopupData = async () => {
    const dateForAppPopup = await Util.getStorageItem("dateForAppPopupData");
    setDate = moment().subtract(1, "days");
    if (dateForAppPopup) setDate = moment(dateForAppPopup);

    //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
    await dispatch(
      CommonActions.setIsAppPopup(moment(setDate).isBefore(moment(), "day"))
    );
  };

  const getUserInfoFromStorage = async () => {
    const userInfoData = await Util.getStorageItem("userInfoData");
    await dispatch(authActions.setUserInfo(userInfoData));
  };

  const getUserStoreDataFromStorage = async () => {
    try {
      const userStoreData = await Util.getStorageItem("userStoreData");
      if (!userStoreData) return;
      await dispatch(authActions.saveUserStore(userStoreData));
    } catch (e) {
      Util.log(e);
    }
  };

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    permissionStatus.current = status;
  };

  const getExpoPushToken = async () => {
    if (Constants.isDevice) {
      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        // if (finalStatus !== "granted") {
        //   alert("Failed to get push token for push notification!");
        //   return;
        // }

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
        dispatch(authActions.setIsAppUpdated(false));
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
    await dispatch(authActions.setDidTryAL());
  };

  return <Splash />;
};

export const getIsStorePopup = async (dispatch) => {
  const dateForStorePopup = await Util.getStorageItem("dateForStorePopupData");
  if (!dateForStorePopup) return {};
  await dispatch(CommonActions.setIsStorePopup(dateForStorePopup));
  return dateForStorePopup;
};
export default StartupScreen;
