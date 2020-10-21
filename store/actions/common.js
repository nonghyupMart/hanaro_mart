import { AsyncStorage } from "react-native";
import moment from "moment";
import * as Util from "@util";

export const SET_BOTTOM_NAVIGATION = "SET_BOTTOM_NAVIGATION";
export const SET_IS_STORE_POPUP = "SET_IS_STORE_POPUP";
export const SET_IS_APP_POPUP = "SET_IS_APP_POPUP";
export const SET_ALERT = "SET_ALERT";
export const SET_IS_LOADING = "SET_IS_LOADING";

export const setBottomNavigation = (isBottomNavigation) => {
  return {
    type: SET_BOTTOM_NAVIGATION,
    isBottomNavigation: isBottomNavigation,
  };
};

export const setIsStorePopup = (isStorePopup) => {
  return {
    type: SET_IS_STORE_POPUP,
    isStorePopup: isStorePopup,
  };
};

export const saveDateForStorePopupToStorage = (store_cd, dispatch) => {
  (async () => {
    // 스토리지에서 데이터를 가져온다.
    const dateForStorePopup = await Util.getStorageItem(
      "dateForStorePopupData"
    );

    let obj = await JSON.parse(dateForStorePopup);
    if (!obj) obj = {};

    const expirationDate = new Date(new Date().getTime());
    obj[store_cd] = expirationDate.toISOString();

    Util.setStorageItem("dateForStorePopupData", JSON.stringify(obj));
    dispatch(CommonActions.setIsStorePopup(obj));
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
