import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Util from "../../util";
import { getResponse } from "../actions/auth";
import _ from "lodash";
import { INTERNAL_APP_VERSION } from "../../constants";
import * as actionTypes from "../actions/actionTypes";

export const fetchHomeBanner = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/home-banner`,
    query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);

      dispatch({ type: actionTypes.SET_HOME_BANNER, homeBanner: resData.data });
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

      let type = actionTypes.SET_HOME_NOTICE;
      if (query.page > 1) {
        type = actionTypes.SET_HOME_NOTICE_MORE;
      } else {
        type = actionTypes.SET_HOME_NOTICE;
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
      let type = actionTypes.SET_HOME_PRODUCTS;
      if (query.page > 1) {
        type = actionTypes.SET_HOME_PRODUCTS_MORE;
      } else {
        type = actionTypes.SET_HOME_PRODUCTS;
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

      dispatch({ type: actionTypes.SET_HOME_NARO, homeNaro: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const clearStorePopup = () => {
  return {
    type: actionTypes.SET_STORE_POPUP,
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
          type: actionTypes.SET_STORE_POPUP,
          storePopup: resData.data,
        });
      } else {
        //버전이 같거나 높으면 팝업 목록에서 제거
        _.remove(resData.data.popupList, (currentObject) => {
          if (currentObject.app_ver) {
            const index = INTERNAL_APP_VERSION.indexOf(".", 2);
            let versionCheck = Util.versionCompare(
              INTERNAL_APP_VERSION.slice(0, index),
              currentObject.app_ver
            );
            return versionCheck >= 0;
          }
        });
        resData.data.popupCnt = resData.data.popupList.length;
        dispatch({ type: actionTypes.SET_APP_POPUP, appPopup: resData.data });
      }
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
