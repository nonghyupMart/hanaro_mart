import queryString from "query-string";
import * as actionTypes from "./actionTypes";
import http from "../../util/axios-instance";

export const fetchAddress1 = () => {
  const url = queryString.stringifyUrl({
    url: `/lname`,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch, true)
      .get(url)
      .then(async (response) => {
        dispatch({ type: actionTypes.SET_ADDRESS1, address1: response.data });
        return response.data;
      });
  };
};

export const fetchAddress2 = (lname) => {
  if (!lname || lname == "") return async () => null;
  const url = queryString.stringifyUrl({
    url: `/${lname}/mname`,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch, true)
      .get(url)
      .then(async (response) => {
        dispatch({ type: actionTypes.SET_ADDRESS2, address2: response.data });
        return response.data;
      });
  };
};

let prevUrl;
export const fetchBranches = (query) => {
  query.limit = 40;
  const url = queryString.stringifyUrl({
    url: `/store`,
    query: query,
  });
  if (url == prevUrl) return async (dispatch, getState) => {};
  prevUrl = url;
  return async (dispatch, getState) => {
    return http
      .init(dispatch, true)
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
  const url = queryString.stringifyUrl({
    url: `/store/${store_cd}`,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch, true)
      .get(url)
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
      .init(dispatch, true)
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
      .init(dispatch, true)
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
      .init(dispatch, true)
      .delete(url)
      .then(async (response) => {
        return response.data;
      });
  };
};
