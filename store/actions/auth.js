import queryString from "query-string";
import { AsyncStorage } from "react-native";
import { API_URL } from "@constants/settings";

export const SET_PUSH_TOKEN = "SET_PUSH_TOKEN";
export const SET_LOCATION = "SET_LOCATION";
export const SET_BOTTOM_NAVIGATION = "SET_BOTTOM_NAVIGATION";
export const SET_PREVIEW = "SET_PREVIEW";

export const SET_USER_STORE = "SET_USER_STORE";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_AGREED_STATUS = "SET_AGREED_STATUS";

let timer;

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
    // dispatch(
    //   authenticate(
    //     resData.localId,
    //     resData.idToken,
    //     parseInt(resData.expiresIn) * 1000
    //   )
    // );
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

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCC-hJMG7auRFVmeksQ9oS2LjaDRIV3MqI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken));

    saveUserInfoToStorage(resData.idToken);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
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
export const setUserInfo = (userInfo) => {
  return { type: SET_USER_INFO, userInfo: userInfo };
};
export const setUserStore = (userStore) => {
  return { type: SET_USER_STORE, userStore: userStore };
};

export const setAgreedStatus = (status) => {
  return { type: SET_AGREED_STATUS, agreedStatus: status };
};

export const setBottomNavigation = (isBottomNavigation) => {
  return {
    type: SET_BOTTOM_NAVIGATION,
    isBottomNavigation: isBottomNavigation,
  };
};

const saveUserInfoToStorage = (userInfo) => {
  AsyncStorage.setItem("userInfoData", JSON.stringify(userInfo));
};
export const saveUserStoreToStorage = (store) => {
  AsyncStorage.setItem("userStoreData", JSON.stringify(store));
};

export const saveAgreedStatusToStorage = (status) => {
  AsyncStorage.setItem("AgreedStatusData", JSON.stringify(status));
};
