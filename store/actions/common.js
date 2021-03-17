import moment from "moment";
import * as Util from "../../util";
import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Updates from "expo-updates";
import * as actionTypes from "./actionTypes";

export const setLink = (link) => {
  return {
    type: actionTypes.SET_LINK,
    link: link,
  };
};

export const setBrightness = (brightness) => {
  return {
    type: actionTypes.SET_BRIGHTNESS,
    brightness: brightness,
  };
};
export const setNotification = (notification) => {
  return {
    type: actionTypes.SET_NOTIFICATION,
    notification: notification,
  };
};
export const setBottomNavigation = (isBottomNavigation) => {
  return {
    type: actionTypes.SET_BOTTOM_NAVIGATION,
    isBottomNavigation: isBottomNavigation,
  };
};
export const setDidTryPopup = (didTryPopup) => {
  return {
    type: actionTypes.SET_DID_TRY_POPUP,
    didTryPopup: didTryPopup,
  };
};

export const setHeaderHeight = (headerHeight) => {
  return {
    type: actionTypes.SET_HEADER_HEIGHT,
    headerHeight: headerHeight,
  };
};

export const setIsStorePopup = (isStorePopup) => {
  return {
    type: actionTypes.SET_IS_STORE_POPUP,
    isStorePopup: isStorePopup,
  };
};

export const saveDateForStorePopupToStorage = (
  isStorePopup,
  store_cd,
  dispatch
) => {
  return (async () => {
    const expirationDate = await new Date(new Date().getTime());
    isStorePopup[store_cd] = expirationDate.toISOString();
    // console.warn("1일 닫기 ", isStorePopup);
    await dispatch(setIsStorePopup(isStorePopup));
    await Util.setStorageItem(
      "dateForStorePopupData",
      JSON.stringify(isStorePopup)
    );
  })();
};

export const setIsAppPopup = (isAppPopup) => {
  return {
    type: actionTypes.SET_IS_APP_POPUP,
    isAppPopup: isAppPopup,
  };
};

export const saveDateForAppPopupToStorage = () => {
  const expirationDate = new Date(new Date().getTime());
  Util.setStorageItem("dateForAppPopupData", expirationDate.toISOString());
};

export const setAlert = (alert) => {
  return { type: actionTypes.SET_ALERT, alert: alert };
};

export const setIsLoading = (isLoading) => {
  return async (dispatch) =>
    await dispatch({ type: actionTypes.SET_IS_LOADING, isLoading: isLoading });
};

export const saveNotificationToStorage = (data) => {
  Util.setStorageItem("notificationData", JSON.stringify(data));
};

export const updateExpo = (dispatch) => {
  if (!__DEV__) {
    return (async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // ... notify user of update ...
          // Util.log("new update");
          await dispatch(
            setAlert({
              message: "새로운 버전이 있습니다. 앱을 재실행 해주세요.",
              confirmText: "업데이트",
              onPressConfirm: () => {
                dispatch(setAlert(null));
                Updates.reloadAsync();
              },
            })
          );
        }
      } catch (e) {
        // handle or log error
        Util.log("update error=>", e);
      }
    })();
  }
};
