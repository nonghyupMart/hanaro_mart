import moment from "moment";
import * as Util from "../../util";
import queryString from "query-string";
import * as Updates from "expo-updates";
import * as actionTypes from "./actionTypes";
import * as Linking from "expo-linking";
import { CATEGORY } from "../../constants";
import _ from "lodash";

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
    await Util.setStorageItem("dateForStorePopupData", isStorePopup);
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
  Util.setStorageItem("notificationData", data);
};

export const updateExpo = async (dispatch) => {
  if (!__DEV__) {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
      }
    } catch (e) {
      // handle or log error
      Util.log("update error=>", e);
    }
  }
};

export const navigateByScheme = async (dispatch, url) => {
  let { queryParams } = await Linking.parse(url + "");
  if (_.isEmpty(queryParams)) return;
  await dispatch(
    setLink({
      link_gbn: queryParams.link_gbn,
      category: CATEGORY[queryParams.link_gbn],
      link_code: queryParams.link_code,
    })
  );
};

export const postWish = (dispatch, object, item, type, value = "Y") => {
  const tempObject = { ...object };
  const index = tempObject.productList.indexOf(item);
  tempObject.productList[index].wish_yn = value;
  dispatch({
    type: type,
    data: tempObject,
  });
};

export const showServiceErrorAlert = (dispatch) => {
  return dispatch(
    setAlert({
      message:
        "서비스 연결에\n오류가 발생하였습니다.\n잠시후 다시 실행해 주십시오.",
      confirmText: "재실행",
      onPressConfirm: async () => {
        try {
          if (!__DEV__) {
            await dispatch(setIsLoading(true));
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
              await Updates.fetchUpdateAsync();
            }
          }
        } catch (e) {
          // handle or log error
          Util.log("update error=>", e);
        } finally {
          await dispatch(setIsLoading(false));
          await Updates.reloadAsync();
        }
      },
    })
  );
};
