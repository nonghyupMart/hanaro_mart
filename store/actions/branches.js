import queryString from "query-string";
import { API_URL } from "@constants/settings";
import * as Util from "@util";
import * as Network from "@util/network";
export const SET_ADDRESS1 = "SET_ADDRESS1";
export const SET_ADDRESS2 = "SET_ADDRESS2";
export const SET_BRANCHES = "SET_BRANCHES";
export const SET_BRANCH = "SET_BRANCH";
export const SET_STORE_MARK = "SET_STORE_MARK";

export const fetchAddress1 = () => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/lname`,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await Network.getResponse(response, dispatch, url);

      dispatch({ type: SET_ADDRESS1, address1: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchAddress2 = (lname) => {
  if (!lname || lname == "") return async () => null;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/${lname}/mname`,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await Network.getResponse(response, dispatch, url);

      dispatch({ type: SET_ADDRESS2, address2: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchBranches = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/store`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await Network.getResponse(response, dispatch, url, query);

      dispatch({ type: SET_BRANCHES, branches: resData.data });
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
export const fetchBranch = (store_cd) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/store/${store_cd}`,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await Network.getResponse(
        response,
        dispatch,
        url,
        store_cd
      );

      dispatch({ type: SET_BRANCH, branch: resData.data });
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const fetchStoreMark = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/store-mark`,
    query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await Network.getResponse(response, dispatch, url, query);

      dispatch({ type: SET_STORE_MARK, storeMark: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteMarkedStore = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/store-mark`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await Network.getResponse(response, dispatch, url, query);
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
