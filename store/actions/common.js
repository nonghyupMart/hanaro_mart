import moment from "moment";
import * as Util from "../../util";
import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Updates from "expo-updates";

export const SET_BOTTOM_NAVIGATION = "SET_BOTTOM_NAVIGATION";
export const SET_IS_STORE_POPUP = "SET_IS_STORE_POPUP";
export const SET_IS_APP_POPUP = "SET_IS_APP_POPUP";
export const SET_ALERT = "SET_ALERT";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT";
export const SET_DID_TRY_POPUP = "SET_DID_TRY_POPUP";
export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const SET_BRIGHTNESS = "SET_BRIGHTNESS";
export const SET_LINK = "SET_LINK";
export const SET_UPDATE_POPUP = "SET_UPDATE_POPUP";
export const SET_IS_UPDATED = "SET_IS_UPDATED";

export const setIsUpdated = (isUpdated) => {
  return {
    type: SET_IS_UPDATED,
    isUpdated: isUpdated,
  };
};
export const fetchUpdate = () => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/popup?update_yn=Y`,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url);

      dispatch({ type: SET_UPDATE_POPUP, updatePopup: resData.data });
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
export const setLink = (link) => {
  return {
    type: SET_LINK,
    link: link,
  };
};

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

export const getResponse = async (response, dispatch, url, query) => {
  const resData = await response.json();
  //   console.warn(resData);

  if (!response.ok) {
    //response.status == 500, 400...
    // console.warn(response);
    Util.log("ERROR getResponse=> ", url, query);
    Util.log("ERROR message ==>", resData.error.errorMsg);
    dispatch(
      setAlert({
        message:
          "서비스 연결에\n오류가 발생하였습니다.\n잠시후 다시 실행해 주십시오.",
        onPressConfirm: () => {
          dispatch(setAlert(null));
        },
      })
    );
    return resData;
  }

  if (resData.code == "USE-0000") {
    //회원정보가 없는 경우 자동로그인 해제
    await dispatch(withdrawalFinish());
    Updates.reloadAsync();
    return resData;
  }
  if (resData.code != "200" && resData.code != "201") {
    dispatch(
      setAlert({
        message: resData.error.errorMsg,
        onPressConfirm: () => {
          dispatch(setAlert(null));
        },
      })
    );
    return resData;
  }

  return resData;
};
