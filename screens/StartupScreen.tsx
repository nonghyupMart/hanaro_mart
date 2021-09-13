import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Splash from "../components/UI/Splash";
import { AppDispatch, useAppDispatch, useAppSelector } from "../hooks";
import { UserStore } from "../models/UserStore";
import * as authActions from "../store/actions/auth";
import * as branchesActions from "../store/actions/branches";
import * as CommonActions from "../store/actions/common";
import * as Util from "../utils";

const StartupScreen = (props) => {
  const dispatch = useAppDispatch();
  const permissionStatus = useRef();
  const isJoined = useAppSelector((state) => state.auth.isJoined);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const dateForStorePopup = useAppSelector(
    (state) => state.common.dateForStorePopup
  );
  const timerRef = useRef();

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
      if (!isUpdatedVersion()) return;
      await getExpoPushToken();
      await getLocationPermission();
      await getUserInfoFromStorage();
      await getUserStoreDataFromStorage();
      await getDateForStorePopup(dispatch);
      await initAppPopupData();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isJoined === null || !userStore) return;
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

  useEffect(() => {
    if (!dateForStorePopup) return;
    defineShouldShowStorePopup(dispatch, dateForStorePopup, userStore);
  }, [dateForStorePopup, userStore]);

  const initAppPopupData = async () => {
    const dateForAppPopup = await Util.getStorageItem("dateForAppPopupData");
    let setDate = moment().subtract(1, "days");
    if (dateForAppPopup) setDate = moment(dateForAppPopup);

    //1일동안 보지 않기 설정한 날짜가 오늘보다 이전이면 true
    await dispatch(
      CommonActions.setShouldShowAppPopup(
        moment(setDate).isBefore(moment(), "day")
      )
    );
  };

  const getUserInfoFromStorage = async () => {
    const userInfoData = await Util.getStorageItem("userInfoData");
    await dispatch(authActions.setUserInfo(userInfoData));
  };

  const getUserStoreDataFromStorage = async () => {
    try {
      let userStoreData = await Util.getStorageItem("userStoreData");
      if (!userStoreData) userStoreData = {};
      await dispatch(authActions.saveUserStore(userStoreData));
    } catch (e) {
      console.log(e);
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
        console.log(" Notifications.getExpoPushTokenAsync error =>", error);
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

export const getDateForStorePopup = async (dispatch) => {
  let dateForStorePopup = await Util.getStorageItem("dateForStorePopupData");

  if (!dateForStorePopup) dateForStorePopup = {};
  await dispatch(CommonActions.setDateForStorePopup(dateForStorePopup));
  return dateForStorePopup;
};

export const defineShouldShowStorePopup = (
  dispatch: AppDispatch,
  dateForStorePopup: any,
  userStore: UserStore
): boolean => {
  let setDate = moment().subtract(1, "days");
  if (dateForStorePopup[userStore.storeInfo?.store_cd]) {
    setDate = moment(dateForStorePopup[userStore.storeInfo?.store_cd]);
  }

  if (!moment(setDate).isBefore(moment(), "day")) {
    dispatch(CommonActions.setDidTryStorePopup(true));
    return false;
  }
  return true;
};

export default StartupScreen;
