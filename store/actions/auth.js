import queryString from "query-string";
import { AsyncStorage } from "react-native";
import { API_URL } from "@constants/settings";

export const SET_PUSH_TOKEN = "SET_PUSH_TOKEN";
export const SET_LOCATION = "SET_LOCATION";

export const SET_PREVIEW = "SET_PREVIEW";

export const SET_USER_STORE = "SET_USER_STORE";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_AGREED_STATUS = "SET_AGREED_STATUS";
export const SET_IS_JOIN = "SET_IS_JOIN";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const WITHDRAWAL = "WITHDRAWAL";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userInfo) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userInfo: userInfo });
  };
};

export const sendSMS = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/sms`,
    query: query,
  });
  return async (dispatch) => {
    const response = await fetch(url);

    const resData = await response.json();
    if (!response.ok) {
      console.warn(url, resData.error.errorMsg);
      const errorResData = await response.json();
      throw new Error(message);
    }

    // console.warn(resData);
    return resData.data;
  };
};
export const signup = (query) => {
  const url = `${API_URL}/users`;
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
      console.warn(url, resData.error.errorMsg);
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "signup went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }

    console.warn(resData.data.userInfo);
    dispatch(setUserInfo(resData.data.userInfo));
    saveUserInfoToStorage(resData.data.userInfo);
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
export const setUserStore = (userStore) => {
  return { type: SET_USER_STORE, userStore: userStore };
};

export const setAgreedStatus = (status) => {
  return { type: SET_AGREED_STATUS, agreedStatus: status };
};

export const withdrawal = (user_cd) => {
  const url = `${API_URL}/users/${user_cd}`;
  return async (dispatch) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();
    if (!response.ok) {
      console.warn(url, resData.error.errorMsg);
      const errorResData = await response.json();

      throw new Error(message);
    }

    console.warn(resData.data);
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
