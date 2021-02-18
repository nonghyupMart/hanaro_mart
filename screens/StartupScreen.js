import React, { useEffect, useState } from "react";
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
let timer;
const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const isJoin = useSelector((state) => state.auth.isJoin);
  const [permissionStatus, setPermissionStatus] = useState();
  const [location, setLocation] = useState(null);
  const userStore = useSelector((state) => state.auth.userStore);
  const [isLocationReady, setIsLocationReady] = useState(false);

  useEffect(() => {
    dispatch(CommonActions.setIsLoading(true));
    (async () => {
      if (Constants.isDevice) {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        if (token) await dispatch(authActions.setPushToken(token));
      }
      let { status } = await Location.requestPermissionsAsync();
      setPermissionStatus(status);

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
      // 비가입시에만 실행
      if (!permissionStatus || isJoin) return;
      if (permissionStatus !== "granted") {
        // 매장을 선택해주세요. 매장 설정 화면으로 ...
        dispatch(
          setAlert({
            message: "선택된 매장이 없습니다.\n매장을 선택해 주세요.",
            onPressConfirm: async () => {
              await dispatch(setAlert(null));
              RootNavigation.navigate("StoreChange");
            },
            onPressCancel: async () => {
              await dispatch(setAlert(null));
              await dispatch(setDidTryPopup(true));
            },
            confirmText: "매장선택",
            cancelText: "취소",
          })
        );
        return;
      }
      if (location == null) {
        let location = await Location.getLastKnownPositionAsync();
        setLocation(location);
      }
    })();
  }, [permissionStatus]);

  useEffect(() => {
    (async () => {
      // 비가입시에만 실행
      // 가장 가까운 매장 상세정보 호출 후 세팅
      if ((!location && permissionStatus == "granted") || isJoin) {
        await dispatch(authActions.setDidTryAL());
        await SplashScreen.hideAsync();
        await dispatch(CommonActions.setIsLoading(false));
      }
      if (!location) {
        timer = setTimeout(() => {
          console.log("dddd");
          fetchBranchNear();
        }, 10000);
        return;
      }
      clearTimeout(timer);
      fetchBranchNear();
    })();
  }, [location]);

  const fetchBranchNear = async () => {
    let query = {};
    if (location) {
      query.lat = location.coords.latitude;
      query.lng = location.coords.longitude;
    }
    const fetchBranchNear = dispatch(branchesActions.fetchBranchNear(query));
    fetchBranchNear.then(async (data) => {
      if (!data || !data.storeInfo || !_.isEmpty(userStore)) return;
      dispatch(authActions.saveUserStore(data)).then(async (d) => {
        clearTimeout(timer);
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
