import queryString from "query-string";
import { AsyncStorage } from "react-native";
import { API_URL, PRODUCT_SERVER_URL } from "@constants/settings";
import { clearStorePopup } from "@actions/home";
import * as Util from "@util";

export const SET_PUSH_TOKEN = "SET_PUSH_TOKEN";
export const SET_LOCATION = "SET_LOCATION";

export const SET_PREVIEW = "SET_PREVIEW";

export const SET_USER_STORE = "SET_USER_STORE";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_AGREED_STATUS = "SET_AGREED_STATUS";
export const SET_IS_JOIN = "SET_IS_JOIN";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const WITHDRAWAL = "WITHDRAWAL";
export const SET_CI = "SET_CI";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const sendSMS = (query) => {
  const url = queryString.stringifyUrl({
    url: `${PRODUCT_SERVER_URL}/api/sms`,
    query: query,
  });
  return async (dispatch) => {
    const response = await fetch(url);

    const resData = await response.json();
    if (!response.ok) {
      Util.log(url, resData.error.errorMsg);
      throw new Error("sendSMS went wrong!");
    }

    // Util.log(resData);
    return resData.data;
  };
};
export const signup = (query) => {
  const url = `${API_URL}/users`;
  Util.log(url, query);
  return async (dispatch) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const resData = await response.json();
    if (!response.ok) {
      Util.log(url, resData.error.errorMsg);
      throw new Error("signup went wrong!");
    }

    Util.log("signup userInfo==>", resData.data.userInfo);
    dispatch(setUserInfo(resData.data.userInfo));
    saveUserInfoToStorage(resData.data.userInfo);
    return resData.data.userInfo;
  };
};

export const setPushToken = (pushToken) => {
  return { type: SET_PUSH_TOKEN, pushToken: pushToken };
};

export const setLocation = (location) => {
  return { type: SET_LOCATION, location: location };
};

export const setPreview = (status) => {
  return { type: SET_PREVIEW, isPreview: status };
};
export const setIsJoin = (status) => {
  return { type: SET_IS_JOIN, isJoin: status };
};
export const setUserInfo = (userInfo) => {
  return { type: SET_USER_INFO, userInfo: userInfo };
};
export const setCI = (ci) => {
  return { type: SET_CI, ci: ci };
};
export const saveUserStore = (userStore) => {
  return { type: SET_USER_STORE, userStore: userStore };
};
export const setUserStore = (query, userStore) => {
  const url = `${API_URL}/users`;
  Util.log(url, query);
  return async (dispatch) => {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const resData = await response.json();
    if (!response.ok) {
      Util.log(url, resData.error.errorMsg);
      throw new Error("setUserStore went wrong!");
    }

    dispatch(saveUserStore(userStore));
    saveUserStoreToStorage(userStore);

    return resData.data;
  };
};

export const setAgreedStatus = (status) => {
  return { type: SET_AGREED_STATUS, agreedStatus: status };
};

export const withdrawal = (user_cd) => {
  const url = `${API_URL}/users/${user_cd}`;
  Util.log(url);
  return async (dispatch) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    if (!response.ok) {
      Util.log(url, resData.error.errorMsg);
      throw new Error("withdrawal went wrong!");
    }

    Util.log(resData.data);
    clearAllData();
    dispatch({ type: WITHDRAWAL });
    return resData.data;
  };
};
const saveUserInfoToStorage = (userInfo) => {
  AsyncStorage.setItem("userInfoData", JSON.stringify(userInfo));
};
export const saveUserStoreToStorage = (store) => {
  AsyncStorage.setItem("userStoreData", JSON.stringify(store));
};

export const saveAgreedStatusToStorage = (status) => {
  AsyncStorage.setItem("agreedStatusData", JSON.stringify(status));
};

export const saveIsJoinToStorage = (status) => {
  AsyncStorage.setItem("isJoinData", true);
};

const clearAllData = () => {
  AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
  // .then(() => alert('success'));
};
