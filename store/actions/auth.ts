import queryString from "query-string";
import * as Sentry from "sentry-expo";
import * as Analytics from "expo-firebase-analytics";
import { API_URL, PRODUCT_SERVER_URL } from "../../constants";
import * as Util from "../../utils";
import _ from "lodash";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import {
  setAlert,
  setIsLoading,
  setDidTryStorePopup,
  showServiceErrorAlert,
} from "./common";
import * as actionTypes from "./actionTypes";
import * as RootNavigation from "../../navigation/RootNavigation";
import { UserData } from "../../models/UserData";
import { UserStore } from "../../models/UserStore";
import { UserInfo } from "../../models/UserInfo";
import { AppDispatch } from "../../hooks";

export const setIsAppUpdated = (isAppUpdated) => {
  return {
    type: actionTypes.SET_IS_APP_UPDATED,
    isAppUpdated: isAppUpdated,
  };
};

export const setDidTryAL = () => {
  return { type: actionTypes.SET_DID_TRY_AL };
};

export const signUp = (query) => {
  let url;
  const data = JSON.stringify(query);

  return async (dispatch) => {
    const setResponse = async (response) => {
      if (response.data.userInfo && !response.data.userInfo.user_cd)
        return response.data;
      await dispatch(setUserInfo(response.data.userInfo));
      await saveUserInfoToStorage(response.data.userInfo);
      return response.data;
    };
    if (!query.user_cd) {
      url = queryString.stringifyUrl({
        url: `/v1/user_add`,
      });
      return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
        .post(url, data)
        .then(async (response) => setResponse(response));
    } else {
      url = queryString.stringifyUrl({
        url: `/v1/user_modify`,
      });
      return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
        .patch(url, data)
        .then(async (response) => setResponse(response));
    }
  };
};

export const setPushToken = (pushToken) => {
  return { type: actionTypes.SET_PUSH_TOKEN, pushToken: pushToken };
};

export const setLocation = (location) => {
  return { type: actionTypes.SET_LOCATION, location: location };
};

export const setUserInfo = (userInfo: UserInfo) => {
  return async (dispatch: AppDispatch) => {
    if (!_.isEmpty(userInfo)) {
      await dispatch({
        type: actionTypes.SET_PUSH_CNT,
        pushCnt: userInfo.push_cnt,
      });
      await dispatch({
        type: actionTypes.SET_WISH_CNT,
        wishCnt: userInfo.wish_cnt,
      });
    }
    dispatch({ type: actionTypes.SET_USER_INFO, userInfo: userInfo });
  };
};

export const setCI = (ci) => {
  return { type: actionTypes.SET_CI, ci: ci };
};

export const setUserStore = (userStore: UserStore) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.SET_USER_STORE, userStore: userStore });
  };
};

export const setUserData = (userData: UserData) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.SET_USER_DATA, userData: userData });
  };
};

export const fetchPushCnt = (query) => {
  const url = queryString.stringifyUrl({
    url: `push-cnt`,
  });
  return async (dispatch) => {
    return Util.axiosInit({
      dispatch: dispatch,
      isAutoOff: true,
      isNoLoading: true,
    })
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_PUSH_CNT,
          updatePopup: response.data.result.push_cnt,
        });
        return response.data;
      });
  };
};

export const getWishCnt = (query) => {
  const url = queryString.stringifyUrl({
    url: `wish-cnt`,
    query: query,
  });

  return async (dispatch) => {
    return Util.axiosInit({
      dispatch: dispatch,
      isAutoOff: true,
      isNoLoading: true,
    })
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_WISH_CNT,
          wishCnt: response.data.wish_cnt,
        });
        return response.data;
      });
  };
};

export const loginWithUserCd = (query, isNoLoading = false) => {
  const url = queryString.stringifyUrl({
    url: `/v3/user`,
  });
  const data = JSON.stringify(query);

  return async (dispatch) => {
    return Util.axiosInit({
      dispatch: dispatch,
      isAutoOff: true,
      isNoLoading: isNoLoading,
    })
      .patch(url, data)
      .then(async (response) => {
        return response.data;
      });
  };
};

export const fetchUserStore = (query, userStore) => {
  const url = queryString.stringifyUrl({
    url: `/users`,
  });
  const data = JSON.stringify(query);
  return async (dispatch) => {
    return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
      .patch(url, data)
      .then(async (response) => {
        await dispatch(setUserStore(userStore));
        await saveUserStoreToStorage(userStore);
        return response.data;
      });
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
    return resData.data;
  };
};

export const withdrawalFinish = () => {
  return async (dispatch) => {
    await Util.clearAllData();
    await Analytics.resetAnalyticsData();
    await dispatch({ type: actionTypes.WITHDRAWAL });
    await dispatch(setIsLoading(false));
  };
};

export const saveUserInfoToStorage = async (userInfo) => {
  return Util.setStorageItem("userInfoData", userInfo);
};

export const saveUserTelToStorage = async (tel?: string) => {
  const telData = await Util.getStorageItem("telData");
  if (!tel) return telData;
  if (telData) return;
  await Util.setStorageItem("telData", tel);
};

export const saveUserStoreToStorage = async (store) => {
  if (_.isEmpty(store)) {
    return Util.removeStorageItem("userStoreData");
  }
  Util.setStorageItem("userStoreData", store);
};

export const saveIsJoinToStorage = (status) => {
  Util.setStorageItem("isJoinData", true);
};

export const setReference = (query) => {
  const url = queryString.stringifyUrl({
    url: `/recommend`,
  });
  return async (dispatch, getState) => {
    return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
      .post(url, JSON.stringify(query))
      .then(async (response) => {
        return response.data;
      });
  };
};

export const fetchUserData = async ({
  dispatch,
  userInfo,
  pushToken,
  userStore,
}) => {
  if (_.isEmpty(userInfo) || !userInfo.recommend) return;

  let tk = `${pushToken}`.trim();

  if (Constants.isDevice && !tk)
    tk = (await Notifications.getExpoPushTokenAsync()).data.trim();

  if (!Constants.isDevice) tk = "";

  let query = {
    user_cd: userInfo.user_cd,
    store_cd: userStore.storeInfo.store_cd,
  };
  if (tk) {
    query["token"] = tk;
    await dispatch(setPushToken(tk));
  }

  return dispatch(loginWithUserCd(query, true)).then(async (data) => {
    if (
      data?.userInfo?.user_cd !== userInfo?.user_cd ||
      !data?.userInfo?.recommend
    )
      return;

    await Analytics.setUserId(data.userInfo.user_cd);
    _.forEach(data.userInfo, async (value, name) => {
      if (name === "user_id" || value.length > 37) return;
      await Analytics.setUserProperty(name, value.toString());
    });
    Sentry.Browser.setTags(data.userInfo);
    await Analytics.setUserProperty(
      "app_internal_version",
      Constants.manifest?.version + ""
    );

    if (
      !_.isEqual(data.userInfo, userInfo) ||
      userStore?.storeInfo?.store_cd !== data?.storeInfo?.store_cd
    ) {
      await saveUserData(dispatch, data);
    }
    return data;
  });
};

export const saveUserData = async (dispatch, data) => {
  await dispatch(setUserData(data));
  await dispatch(setUserInfo(data.userInfo));
  saveUserInfoToStorage(data.userInfo);
  saveUserTelToStorage(data.userInfo.tel);

  let obj;
  if (!_.isEmpty(data.storeInfo)) {
    obj = { storeInfo: data.storeInfo, menuList: data.menuList };
  }
  await dispatch(setUserStore(obj));
  await saveUserStoreToStorage(obj);
  if (_.isEmpty(obj)) {
    dispatch(setDidTryStorePopup(false));
  }
};

export const getResponse = async (response, dispatch, url, query) => {
  const resData = await response.json();
  //   console.warn(resData);

  if (!response.ok) {
    // console.warn(response);
    console.log("ERROR getResponse=> ", url, query);
    console.log("ERROR message ==>", resData.error.errorMsg);
    showServiceErrorAlert(dispatch);
    return resData;
  }

  if (resData.code === "USE-0000") {
    //??????????????? ?????? ?????? ??????????????? ??????
    return await dispatch(withdrawalFinish());
  }
  if (String(resData.code) !== "200" && String(resData.code) !== "201") {
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
  const url = queryString.stringifyUrl({
    url: `/popup?update_yn=Y`,
  });
  return async (dispatch, getState) => {
    return Util.axiosInit({ dispatch: dispatch, isNoLoading: true })
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_UPDATE_POPUP,
          updatePopup: response.data,
        });
        return response.data;
      });
  };
};

export const checkAuth = (dispatch, isJoined) => {
  if (isJoined) return true;
  dispatch(
    setAlert({
      message: "???????????? ???????????? ???\n?????? ???????????????.",
      confirmText: "?????????",
      onPressConfirm: async () => {
        await dispatch(setAlert(null));
        await RootNavigation.navigate("Login");
      },
      onPressCancel: async () => {
        await dispatch(setAlert(null));
      },
    })
  );
  return false;
};

export const checkSetStore = (dispatch, userStore) => {
  if (!_.isEmpty(userStore) && userStore.storeInfo) return true;
  dispatch(
    setAlert({
      message: "????????? ???????????? ??????\n???????????? ??? ?????? ???????????????.",
      confirmText: "????????????",
      onPressConfirm: () => {
        dispatch(setAlert(null));
        RootNavigation.navigate("Home");
        RootNavigation.navigate("StoreChange");
      },
      onPressCancel: () => {
        dispatch(setAlert(null));
        RootNavigation.navigate("Home");
      },
    })
  );
  return false;
};

export const loginWithID = (query) => {
  const url = queryString.stringifyUrl({
    url: `/v4/user`,
  });
  const data = JSON.stringify(query);
  return async (dispatch) => {
    return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
      .patch(url, data)
      .then(async (response) => {
        let data = response.data;
        if (response.data.userInfo) {
          await dispatch({ type: actionTypes.CHANGE_SHOP });
          await saveUserData(dispatch, data);
          await dispatch(setAlert(null));
          await dispatch(setDidTryStorePopup("Home"));
        }
        return response.data;
      });
  };
};
