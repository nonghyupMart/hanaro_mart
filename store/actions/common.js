
import moment from "moment";
import * as Util from "../../util";

export const SET_BOTTOM_NAVIGATION = "SET_BOTTOM_NAVIGATION";
export const SET_IS_STORE_POPUP = "SET_IS_STORE_POPUP";
export const SET_IS_APP_POPUP = "SET_IS_APP_POPUP";
export const SET_ALERT = "SET_ALERT";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_DID_TRY_POPUP = "SET_DID_TRY_POPUP";
export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const SET_BRIGHTNESS = "SET_BRIGHTNESS";

export const setBrightness = (brightness) => {
  return {
    type: SET_BRIGHTNESS,
    brightness: brightness,
  };
};
export const setNotification = (notification) => {
  return {
    type: SET_NOTIFICATION,
    notification: notification,
  };
};
export const setBottomNavigation = (isBottomNavigation) => {
  return {
    type: SET_BOTTOM_NAVIGATION,
    isBottomNavigation: isBottomNavigation,
  };
};
export const setDidTryPopup = (didTryPopup) => {
  return {
    type: SET_DID_TRY_POPUP,
    didTryPopup: didTryPopup,
  };
};

export const setHeaderHeight = (headerHeight) => {
  return {
    type: SET_HEADER_HEIGHT,
    headerHeight: headerHeight,
  };
};

export const setIsStorePopup = (isStorePopup) => {
  return {
    type: SET_IS_STORE_POPUP,
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
    type: SET_IS_APP_POPUP,
    isAppPopup: isAppPopup,
  };
};

export const saveDateForAppPopupToStorage = () => {
  const expirationDate = new Date(new Date().getTime());
  Util.setStorageItem("dateForAppPopupData", expirationDate.toISOString());
};

export const setAlert = (alert) => {
  return { type: SET_ALERT, alert: alert };
};

export const setIsLoading = (isLoading) => {
  return async (dispatch) =>
    await dispatch({ type: SET_IS_LOADING, isLoading: isLoading });
};

export const saveNotificationToStorage = (data) => {
  Util.setStorageItem("notificationData", JSON.stringify(data));
};
