import { AsyncStorage } from "react-native";
import moment from "moment";

export const SET_BOTTOM_NAVIGATION = "SET_BOTTOM_NAVIGATION";
export const SET_STORE_POPUP = "SET_STORE_POPUP";
export const SET_APP_POPUP = "SET_APP_POPUP";

export const setBottomNavigation = (isBottomNavigation) => {
  return {
    type: SET_BOTTOM_NAVIGATION,
    isBottomNavigation: isBottomNavigation,
  };
};

export const setStorePopup = (isStorePopup) => {
  return {
    type: SET_STORE_POPUP,
    isStorePopup: isStorePopup,
  };
};

export const saveStorePopupToStorage = () => {
  const expirationDate = new Date(new Date().getTime());
  AsyncStorage.setItem("storePopupData", expirationDate.toISOString());
};

export const setAppPopup = (isAppPopup) => {
  return {
    type: SET_APP_POPUP,
    isAppPopup: isAppPopup,
  };
};

export const saveAppPopupToStorage = () => {
  const expirationDate = new Date(new Date().getTime());
  AsyncStorage.setItem("appPopupData", expirationDate.toISOString());
};
