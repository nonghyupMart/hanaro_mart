import queryString from "query-string";
import * as Util from "../../utils";
import _ from "lodash";
import Constants from "expo-constants";
import * as actionTypes from "./actionTypes";
import { AppDispatch } from "../../hooks";

export const fetchHomeBanner = (query = {}) => {
  const url = queryString.stringifyUrl({
    url: `/home-banner`,
    query,
  });
  return async (dispatch: AppDispatch, getState) => {
    return Util.http
      .init({ dispatch: dispatch, isAutoOff: true, isNoLoading: true })
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_HOME_BANNER,
          homeBanner: response.data,
        });
        return response.data;
      });
  };
};

export const fetchHomeNotice = (query = {}) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `/home-notice`,
    query: query,
  });
  return async (dispatch: AppDispatch, getState) => {
    return Util.http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_HOME_NOTICE;
        if (query.page > 1) {
          type = actionTypes.SET_HOME_NOTICE_MORE;
        } else {
          type = actionTypes.SET_HOME_NOTICE;
        }
        dispatch({ type: type, homeNotice: response.data });
        return response.data;
      });
  };
};

export const fetchHomeProducts = (query = {}) => {
  query.limit = 45;
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `/home-product`,
    query: query,
  });
  return async (dispatch, getState) => {
    return Util.http
      .init({ dispatch: dispatch, isAutoOff: true, isNoLoading: true })
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_HOME_PRODUCTS;
        if (query.page > 1) {
          type = actionTypes.SET_HOME_PRODUCTS_MORE;
        } else {
          type = actionTypes.SET_HOME_PRODUCTS;
        }
        dispatch({ type: type, data: response.data });
        return response.data;
      });
  };
};

export const fetchHomeNaro = (query) => {
  const url = queryString.stringifyUrl({
    url: `/home-naro`,
    query: query,
  });
  return async (dispatch, getState) => {
    return Util.http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        dispatch({ type: actionTypes.SET_HOME_NARO, homeNaro: response.data });
        return response.data;
      });
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
    url: `/popup`,
    query: query,
  });
  return async (dispatch, getState) => {
    return Util.http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        if (query && query.store_cd) {
          dispatch({
            type: actionTypes.SET_STORE_POPUP,
            storePopup: response.data,
          });
        } else {
          //버전이 같거나 높으면 팝업 목록에서 제거
          _.remove(response.data.popupList, (currentObject) => {
            if (currentObject.app_ver) {
              const index = Constants.manifest.version.indexOf(".", 2);
              let versionCheck = Util.versionCompare(
                Constants.manifest.version.slice(0, index),
                currentObject.app_ver
              );
              return versionCheck >= 0;
            }
          });
          response.data.popupCnt = response.data.popupList.length;
          dispatch({
            type: actionTypes.SET_APP_POPUP,
            appPopup: response.data,
          });
        }
        return response.data;
      });
  };
};
