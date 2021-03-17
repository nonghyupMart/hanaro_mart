import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Util from "../../util";
import { getResponse } from "../actions/auth";
import * as actionTypes from "./actionTypes";

export const fetchExclusive = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/exclu`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);
      let type = actionTypes.SET_EXCLUSIVE;
      if (query.page > 1) {
        type = actionTypes.SET_EXCLUSIVE_MORE;
      } else {
        type = actionTypes.SET_EXCLUSIVE;
      }
      dispatch({ type: type, exclusive: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchExclusiveDetail = (query) => {
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/exclu/${event_cd}`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);
      dispatch({
        type: actionTypes.SET_EXCLUSIVE_DETAIL,
        exclusiveDetail: resData.data.info,
      });
    } catch (err) {
      throw err;
    }
  };
};
