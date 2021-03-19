import queryString from "query-string";
import * as Util from "../../util";
import { getResponse } from "../actions/auth";
import * as actionTypes from "./actionTypes";
import http from "../../util/axios-instance";

export const fetchAddress1 = () => {
  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get("/lname")
      .then(async (response) => {
        dispatch({ type: actionTypes.SET_ADDRESS1, address1: response.data });
        return response.data;
      });
  };
};

export const fetchAddress2 = (lname) => {
  if (!lname || lname == "") return async () => null;
  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(`/${lname}/mname`)
      .then(async (response) => {
        dispatch({ type: actionTypes.SET_ADDRESS2, address2: response.data });
        return response.data;
      });
  };
};

export const fetchBranches = (query) => {
  query.limit = 40;
  const url = queryString.stringifyUrl({
    url: `/store`,
    query: query,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(url)
      .then(async (response) => {
        if (query.page > 1) {
          dispatch({
            type: actionTypes.SET_BRANCHES_MORE,
            branches: response.data,
          });
        } else {
          dispatch({ type: actionTypes.SET_BRANCHES, branches: response.data });
        }
        return response.data;
      });
  };
};
export const fetchBranch = (store_cd) => {
  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(`/store/${store_cd}`)
      .then(async (response) => {
        dispatch({ type: actionTypes.SET_BRANCH, branch: response.data });
        return response.data;
      });
  };
};

export const fetchBranchNear = (query) => {
  const url = queryString.stringifyUrl({
    url: `/store-near`,
    query,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(url)
      .then(async (response) => {
        dispatch({ type: actionTypes.SET_BRANCH, branch: response.data });
        return response.data;
      });
  };
};

export const fetchStoreMark = (query) => {
  const url = queryString.stringifyUrl({
    url: `/store-mark`,
    query,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_STORE_MARK,
          storeMark: response.data,
        });
        return response.data;
      });
  };
};

export const deleteMarkedStore = (query) => {
  const url = queryString.stringifyUrl({
    url: `/store-mark`,
    query: query,
  });

  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .delete(url)
      .then(async (response) => {
        return response.data;
      });
  };
};
