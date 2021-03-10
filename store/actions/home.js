import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Util from "../../util";
import { getResponse } from "../actions/auth";
import _ from "lodash";
import { INTERNAL_APP_VERSION } from "../../constants";

export const SET_HOME_BANNER = "SET_HOME_BANNER";
export const SET_HOME_NOTICE = "SET_HOME_NOTICE";
export const SET_HOME_NOTICE_MORE = "SET_HOME_NOTICE_MORE";
export const SET_HOME_PRODUCTS = "SET_HOME_PRODUCTS";
export const SET_HOME_PRODUCTS_MORE = "SET_HOME_PRODUCTS_MORE";
export const SET_HOME_NARO = "SET_HOME_NARO";
export const SET_STORE_POPUP = "SET_STORE_POPUP";
export const SET_APP_POPUP = "SET_APP_POPUP";

export const fetchHomeBanner = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/home-banner`,
    query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);

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
      const resData = await getResponse(response, dispatch, url, query);

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

export const fetchHomeProducts = (query = {}) => {
  query.limit = 45;
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/home-product`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);
      let type = SET_HOME_PRODUCTS;
      if (query.page > 1) {
        type = SET_HOME_PRODUCTS_MORE;
      } else {
        type = SET_HOME_PRODUCTS;
      }
      dispatch({ type: type, homeProducts: resData.data });
      return resData.data;
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
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);

      dispatch({ type: SET_HOME_NARO, homeNaro: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const clearStorePopup = () => {
  return {
    type: SET_STORE_POPUP,
    storePopup: null,
  };
};

export const fetchPopup = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/popup`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);

      if (query && query.store_cd) {
        dispatch({
          type: SET_STORE_POPUP,
          storePopup: resData.data,
        });
      } else {
        //버전이 같거나 높으면 팝업 목록에서 제거
        _.remove(resData.data.popupList, (currentObject) => {
          if (currentObject.app_ver) {
            let versionCheck = Util.versionCompare(
              INTERNAL_APP_VERSION.slice(0, 3),
              currentObject.app_ver
            );
            return versionCheck >= 0;
          }
        });
        resData.data.popupCnt = resData.data.popupList.length;
        dispatch({ type: SET_APP_POPUP, appPopup: resData.data });
      }
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
