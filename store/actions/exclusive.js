import queryString from "query-string";
import { API_URL } from "../../constants/settings";
import * as Util from "../../util";
import * as Network from "../../util/network";

export const SET_EXCLUSIVE = "SET_EXCLUSIVE";
export const SET_EXCLUSIVE_MORE = "SET_EXCLUSIVE_MORE";
export const SET_EXCLUSIVE_DETAIL = "SET_EXCLUSIVE_DETAIL";

export const fetchExclusive = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/exclu`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await Network.getResponse(response, dispatch, url, query);
      let type = SET_EXCLUSIVE;
      if (query.page > 1) {
        type = SET_EXCLUSIVE_MORE;
      } else {
        type = SET_EXCLUSIVE;
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
      const resData = await Network.getResponse(response, dispatch, url, query);
      dispatch({
        type: SET_EXCLUSIVE_DETAIL,
        exclusiveDetail: resData.data.info,
      });
    } catch (err) {
      throw err;
    }
  };
};
