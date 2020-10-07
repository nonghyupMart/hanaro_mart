import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_HOME_BANNER = "SET_HOME_BANNER";
export const SET_HOME_NOTICE = "SET_HOME_NOTICE";
export const SET_HOME_NOTICE_MORE = "SET_HOME_NOTICE_MORE";
export const SET_HOME_NARO = "SET_HOME_NARO";
export const SET_STORE_POPUP = "SET_STORE_POPUP";
export const SET_APP_POPUP = "SET_APP_POPUP";
export const CLEAR_STORE_POPUP = "CLEAR_STORE_POPUP";

export const fetchHomeBanner = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/home-banner`);
      const resData = await response.json();

      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchHomeBanner went wrong!");
      }

      // console.log("===> ", resData.data);

      dispatch({ type: SET_HOME_BANNER, homeBanner: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchHomeNotice = (query = {}) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/home-notice`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchHomeNotice went wrong!");
      }

      //   console.log("===> ", resData.data);
      let type = SET_HOME_NOTICE;
      if (query.page > 1) {
        type = SET_HOME_NOTICE_MORE;
      } else {
        type = SET_HOME_NOTICE;
      }
      dispatch({ type: type, homeNotice: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchHomeNaro = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/home-naro`,
    query: query,
  });
  // console.warn(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchHomeNaro went wrong!");
      }

      dispatch({ type: SET_HOME_NARO, homeNaro: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const clearStorePopup = () => {
  return { type: CLEAR_STORE_POPUP };
};

export const fetchPopup = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/popup`,
    query: query,
  });
  // console.warn(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchPopup went wrong!");
      }

      if (query && query.store_cd) {
        dispatch({
          type: SET_STORE_POPUP,
          storePopup: resData.data,
        });
        console.warn("fetchStorePopup", resData.data);
      } else {
        dispatch({ type: SET_APP_POPUP, appPopup: resData.data });
        console.warn("fetchAppPopup", resData.data);
      }
    } catch (err) {
      throw err;
    }
  };
};
