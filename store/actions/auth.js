import queryString from "query-string";
import { AsyncStorage } from "react-native";
import { API_URL, PRODUCT_SERVER_URL } from "../../constants";
import * as Util from "../../util";
import * as Updates from "expo-updates";
import _ from "lodash";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { setAlert } from "../actions/common";
import * as actionTypes from "./actionTypes";
import http from "../../util/axios-instance";

export const setIsUpdated = (isUpdated) => {
  return {
    type: actionTypes.SET_IS_UPDATED,
    isUpdated: isUpdated,
  };
};

export const setDidTryAL = () => {
  return { type: actionTypes.SET_DID_TRY_AL };
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
  return { type: actionTypes.SET_PUSH_TOKEN, pushToken: pushToken };
};

export const setLocation = (location) => {
  return { type: actionTypes.SET_LOCATION, location: location };
};

export const setPreview = (status) => {
  return { type: actionTypes.SET_PREVIEW, isPreview: status };
};
export const setIsJoin = (status) => {
  return { type: actionTypes.SET_IS_JOIN, isJoin: status };
};
export const setUserInfo = (userInfo) => {
  return async (dispatch) => {
    if (!_.isEmpty(userInfo)) {
      await dispatch({
        type: actionTypes.SET_PUSH_CNT,
        pushCnt: userInfo.push_cnt,
      });
    }
    dispatch({ type: actionTypes.SET_USER_INFO, userInfo: userInfo });
  };
};
export const setCI = (ci) => {
  return { type: actionTypes.SET_CI, ci: ci };
};
export const saveUserStore = (userStore) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SET_USER_STORE, userStore: userStore });
  };
};

export const fetchPushCnt = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/push-cnt`,
    query: query,
  });
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);

      dispatch({
        type: actionTypes.SET_PUSH_CNT,
        pushCnt: resData.data.result.push_cnt,
      });
      return resData.data;
    } catch (err) {
      throw err;
    }
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
  return { type: actionTypes.SET_AGREED_STATUS, agreedStatus: status };
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
    await Util.clearAllData();
    await dispatch({ type: actionTypes.WITHDRAWAL });
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

export const fetchUpdate = () => {
  return async (dispatch, getState) => {
    try {
      return http
        .init(dispatch)
        .get("/popup?update_yn=Y")
        .then(async (response) => {
          dispatch({
            type: actionTypes.SET_UPDATE_POPUP,
            updatePopup: response.data,
          });
          return response.data;
        });
    } catch (err) {
      throw err;
    }
  };
};
