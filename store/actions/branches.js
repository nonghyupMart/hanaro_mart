import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Util from "../../util";
import { getResponse } from "../actions/auth";
import * as actionTypes from "./actionTypes";

export const fetchAddress1 = () => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/lname`,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url);

      dispatch({ type: actionTypes.SET_ADDRESS1, address1: resData.data });
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
      const resData = await getResponse(response, dispatch, url);

      dispatch({ type: actionTypes.SET_ADDRESS2, address2: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchBranches = (query) => {
  query.limit = 40;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/store`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);

      if (query.page > 1) {
        dispatch({ type: actionTypes.SET_BRANCHES_MORE, branches: resData.data });
      } else {
        dispatch({ type: actionTypes.SET_BRANCHES, branches: resData.data });
      }
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
      const resData = await getResponse(response, dispatch, url, store_cd);

      dispatch({ type: actionTypes.SET_BRANCH, branch: resData.data });
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const fetchBranchNear = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/store-near`,
    query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);

      dispatch({ type: actionTypes.SET_BRANCH, branch: resData.data });
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
      const resData = await getResponse(response, dispatch, url, query);

      dispatch({ type: actionTypes.SET_STORE_MARK, storeMark: resData.data });
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
      const resData = await getResponse(response, dispatch, url, query);
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
