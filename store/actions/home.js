import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_HOME_BANNER = "SET_HOME_BANNER";
export const SET_HOME_NOTICE = "SET_HOME_NOTICE";
export const SET_HOME_NOTICE_MORE = "SET_HOME_NOTICE_MORE";
export const SET_HOME_NARO = "SET_HOME_NARO";

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
