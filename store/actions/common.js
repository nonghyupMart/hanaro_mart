import { AsyncStorage } from "react-native";
import moment from "moment";
import * as Util from "@util";

export const SET_BOTTOM_NAVIGATION = "SET_BOTTOM_NAVIGATION";
export const SET_IS_STORE_POPUP = "SET_IS_STORE_POPUP";
export const SET_IS_APP_POPUP = "SET_IS_APP_POPUP";

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

export const saveDateForStorePopupToStorage = () => {
  const expirationDate = new Date(new Date().getTime());
  Util.setStorageItem("dateForStorePopupData", expirationDate.toISOString());
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
