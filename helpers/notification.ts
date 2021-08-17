import * as Notifications from "expo-notifications";
import { saveNotificationToStorage } from "../store/actions/common";
import _ from "lodash";
import * as Util from "../utils";
import * as CommonActions from "../store/actions/common";
import { fetchPushCnt } from "../store/actions/auth";

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
