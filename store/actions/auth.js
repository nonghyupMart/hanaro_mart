import queryString from "query-string";
import { AsyncStorage } from "react-native";
import { API_URL, PRODUCT_SERVER_URL } from "../../constants";
import * as Util from "../../util";
import { getResponse } from "../actions/common";
import _ from "lodash";
import Constants from "expo-constants";

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
    const resData = await getResponse(response, dispatch, url, query);

    return resData.data;
  };
};
export const signup = (query) => {
  let url = `${API_URL}/v1/user_add`;
  let method = "POST";
  if (query.user_cd) {
    url = `${API_URL}/v1/user_modify`;
    method = "PATCH";
  }

  return async (dispatch) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const resData = await getResponse(response, dispatch, url, query);

    if (resData.data.userInfo && !resData.data.userInfo.user_cd)
      return resData.data.userInfo;
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
  return async (dispatch) => {
    dispatch({ type: SET_USER_STORE, userStore: userStore });
  };
};

export const updateLoginLog = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/v2/user`,
  });
  return async (dispatch) => {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const resData = await getResponse(response, dispatch, url, query);
    return resData.data;
  };
};
export const updateLoginLogV1 = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/v1/user`,
  });
  return async (dispatch) => {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const resData = await getResponse(response, dispatch, url, query);
    return resData.data;
  };
};
export const setUserStore = (query, userStore) => {
  const url = `${API_URL}/users`;
  return async (dispatch) => {
    const method = "PATCH";
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const resData = await getResponse(response, dispatch, url, query);

    await dispatch(saveUserStore(userStore));
    await saveUserStoreToStorage(userStore);

    return resData.data;
  };
};

export const setAgreedStatus = (status) => {
  return { type: SET_AGREED_STATUS, agreedStatus: status };
};

export const withdrawal = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/users`,
  });
  // console.warn(url, query);
  return async (dispatch) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const resData = await getResponse(response, dispatch, url, query);

    // Util.log(resData.data);
    return resData.data;
  };
};
export const withdrawalFinish = () => {
  return async (dispatch) => {
    await clearAllData();
    await dispatch({ type: WITHDRAWAL });
  };
};
export const saveUserInfoToStorage = (userInfo) => {
  Util.setStorageItem("userInfoData", JSON.stringify(userInfo));
};
export const saveUserTelToStorage = async (tel) => {
  const telData = await Util.getStorageItem("telData");
  const telParsed = await JSON.parse(telData);
  if (!tel) return telParsed;
  if (telParsed) return;
  await Util.setStorageItem("telData", JSON.stringify(tel));
};
export const saveUserStoreToStorage = (store) => {
  if (_.isEmpty(store)) {
    return Util.removeStorageItem("userStoreData");
  }
  Util.setStorageItem("userStoreData", JSON.stringify(store));
};

export const saveAgreedStatusToStorage = (status) => {
  Util.setStorageItem("agreedStatusData", JSON.stringify(status));
};

export const saveIsJoinToStorage = (status) => {
  Util.setStorageItem("isJoinData", true);
};

const clearAllData = async () => {
  return await AsyncStorage.getAllKeys().then(async (keys) => {
    if (_.isEmpty(keys)) return;
    await AsyncStorage.multiRemove(keys);
  });
  // .then(() => alert('success'));
};

export const setReference = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/recommend`,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
      const resData = await getResponse(response, dispatch, url, query);
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const updateUserInfo = async (dispatch, userInfo, token) => {
  if (_.isEmpty(userInfo) || !userInfo.recommend) return;

  let tk = `${token}`.trim();

  if (!tk || tk == "") tk = (await Notifications.getExpoPushTokenAsync()).data;
  let action;
  tk = `${tk}`.trim();

  if (!Constants.isDevice) tk = "";

  if (tk && tk != "") {
    action = updateLoginLog({
      token: token,
      user_cd: userInfo.user_cd,
      recommend: userInfo.recommend,
    });
    await dispatch(setPushToken(tk));
  } else {
    action = updateLoginLogV1({
      user_cd: userInfo.user_cd,
      recommend: userInfo.recommend,
    });
  }

  return dispatch(action).then(async (data) => {
    if (_.isEmpty(data.userInfo) || data.userInfo.user_cd != userInfo.user_cd)
      return;

    dispatch(setUserInfo(data.userInfo));
    saveUserInfoToStorage(data.userInfo);
    saveUserTelToStorage(data.userInfo.tel);

    let obj;
    if (!_.isEmpty(data.storeInfo)) {
      obj = { storeInfo: data.storeInfo, menuList: data.menuList };
    }
    dispatch(saveUserStore(obj));
    saveUserStoreToStorage(obj);
    if (_.isEmpty(obj)) {
      dispatch(CommonActions.setDidTryPopup(false));
    }
    return Promise.resolve(data);
  });
};
