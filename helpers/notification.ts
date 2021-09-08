import * as Notifications from "expo-notifications";
import { saveNotificationToStorage } from "../store/actions/common";
import _ from "lodash";
import * as Util from "../utils";
import * as CommonActions from "../store/actions/common";
import { fetchPushCnt } from "../store/actions/auth";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { TabMenus } from "../constants/menu";
import { CATEGORY } from "../constants";
import { SET_NOTIFICATION } from "../store/actions/actionTypes";
import * as RootNavigation from "../navigation/RootNavigation";

export const initNotificationReceiver = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  let globalInitialNotificationResponse;
  let globalSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      // When App is not running.
      saveNotificationToStorage(response.notification);
      globalInitialNotificationResponse = response;
      ensureGlobalSubscriptionIsCleared();
    });

  function ensureGlobalSubscriptionIsCleared() {
    if (globalSubscription) {
      globalSubscription.remove();
      globalSubscription = null;
    }
  }
};

export const getNotificationData = async (dispatch) => {
  // When App is not running set received Notification to redux
  let data = await Util.getStorageItem("notificationData");
  if (_.isEmpty(data)) return;
  await dispatch(CommonActions.setNotification(data));
  await Util.removeStorageItem("notificationData");
};

export const getBackgroundNotificationListener = (dispatch) =>
  Notifications.addNotificationResponseReceivedListener((response) => {
    // When App is running in the background.
    dispatch(CommonActions.setNotification(response.notification));
  });

export const getForegroundNotificationListener = (dispatch) =>
  Notifications.addNotificationReceivedListener(async (notification) => {
    // When app is running in the foreground.
    const userInfoData = await Util.getStorageItem("userInfoData");
    if (!_.isEmpty(userInfoData)) {
      dispatch(fetchPushCnt({ user_cd: userInfoData.user_cd }));
    }
  });

export const processNotifications = () => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.auth.userStore);
  const notification = useAppSelector((state) => state.common.notification);
  const isLoading = useAppSelector((state) => state.common.isLoading);

  useEffect(() => {
    if (
      !userStore ||
      isLoading ||
      !notification ||
      !notification.request ||
      !notification.request.content ||
      !notification.request.content.data
    ) {
      return;
    }

    (async () => {
      const category = notification.request.content.data.category;
      const store_cd = notification.request.content.data.store_cd;
      const store_nm = notification.request.content.data.store_nm;
      const cd = notification.request.content.data.cd;

      if (!category) return;

      if (userStore?.storeInfo?.store_cd === store_cd) {
        const currentTab = TabMenus.filter(
          (tab) => tab.name === CATEGORY[category]
        );
        const tab = userStore.menuList.filter(
          (menu) => menu.r_menu_nm === currentTab[0].title
        );
        if (_.isEmpty(tab)) return;

        let param = {};
        if (!!cd) param["link_code"] = cd;
        if (!!category) param["category"] = category;
        switch (category) {
          case "A": //매장공지
            if (!!cd) param["notice_cd"] = cd;
            param["type"] = "C";
            break;
          case "H": //통합공지
            if (!!cd) param["notice_cd"] = cd;
            param["type"] = "H";
            break;
          default:
            break;
        }
        await dispatch(
          CommonActions.setLink({
            category: CATEGORY[param["category"]],
            link_code: param["link_code"],
          })
        );
        setTimeout(() => {
          RootNavigation.navigate(CATEGORY[param["category"]], param);
        }, 500);
      } else {
        dispatch(
          setAlert({
            message: `${store_nm}에서 발송한 알림입니다.\n매장을 변경하시겠습니까?`,
            confirmText: "매장설정",
            onPressConfirm: () => {
              dispatch(setAlert(null));
              RootNavigation.navigate("Home");
              RootNavigation.navigate("StoreChange");
            },
            onPressCancel: () => {
              dispatch(setAlert(null));
            },
          })
        );
      }
      dispatch({ type: SET_NOTIFICATION, notification: null });
    })();
  }, [userStore, notification, isLoading]);
};
