import queryString from "query-string";
import * as actionTypes from "./actionTypes";
import http from "../../util/axios-instance";
import { API_URL } from "../../constants";
import { getResponse } from "./auth";

export const fetchWishItem = (query) => {
  query.limit = 45;
  const url = queryString.stringifyUrl({
    url: `/wish`,
    query: query,
  });

  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_WISH_ITEM;
        if (query.page > 1) type = actionTypes.SET_WISH_ITEM_MORE;

        dispatch({ type, data: response.data });
        return response.data;
      });
  };
};

export const addWishItem = (query) => {
  const url = queryString.stringifyUrl({
    url: `/wish`,
  });
  const data = JSON.stringify(query);

  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true, isNoLoading: true })
      .post(url, data)
      .then(async (response) => {
        return response.data;
      });
  };
};

export const deleteWishItem = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/wish`,
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
