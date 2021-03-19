import queryString from "query-string";
import * as actionTypes from "./actionTypes";
import http from "../../util/axios-instance";

export const fetchExclusive = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `/exclu`,
    query: query,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch, true)
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_EXCLUSIVE;
        if (query.page > 1) {
          type = actionTypes.SET_EXCLUSIVE_MORE;
        } else {
          type = actionTypes.SET_EXCLUSIVE;
        }
        dispatch({ type: type, exclusive: response.data });
        return response.data;
      });
  };
};

export const fetchExclusiveDetail = (query) => {
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `/exclu/${event_cd}`,
    query: query,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_EXCLUSIVE_DETAIL,
          exclusiveDetail: response.data.info,
        });
        return response.data;
      });
  };
};
