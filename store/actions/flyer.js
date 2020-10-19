import queryString from "query-string";
import { API_URL } from "@constants/settings";
import * as Util from "@util";

export const SET_LEAFLET = "SET_LEAFLET";
export const SET_LEAFLET_DETAIL = "SET_LEAFLET_DETAIL";
export const SET_PRODUCT = "SET_PRODUCT";
export const SET_PRODUCT_MORE = "SET_PRODUCT_MORE";
export const SET_SEARCHED_PRODUCT = "SET_SEARCHED_PRODUCT";
export const SET_SEARCHED_PRODUCT_MORE = "SET_SEARCHED_PRODUCT_MORE";
export const SET_PRODUCT_DETAIL = "SET_PRODUCT_DETAIL";

export const fetchLeaflet = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/leaflet`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      if (!response.ok) {
        Util.log(url, resData.error.errorMsg);
        throw new Error("fetchLeaflet Something went wrong!");
      }

      dispatch({ type: SET_LEAFLET, leaflet: resData.data });
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const fetchLeafletDetail = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/leaflet/${query.leaf_cd}`,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      if (!response.ok) {
        Util.log(url, resData.error.errorMsg);
        throw new Error("fetchLeafletDetail Something went wrong!");
      }

      dispatch({
        type: SET_LEAFLET_DETAIL,
        leafletDetail: resData.data.leafletInfo,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchProduct = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/product`,
    query: query,
  });
  console.warn(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      if (!response.ok) {
        Util.log(url, resData.error.errorMsg);
        throw new Error("fetchProduct Something went wrong!");
      }

      let type = SET_PRODUCT;
      if (query.product_nm) {
        if (query.page > 1) type = SET_SEARCHED_PRODUCT_MORE;
        else type = SET_SEARCHED_PRODUCT;
      } else {
        if (query.page > 1) type = SET_PRODUCT_MORE;
        else type = SET_PRODUCT;
      }
      dispatch({ type, product: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchProductDetail = (query) => {
  const cd = query.product_cd;
  delete query.product_cd;

  const url = queryString.stringifyUrl({
    url: `${API_URL}/product/${cd}`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      if (!response.ok) {
        Util.log(url, resData.error.errorMsg);
        throw new Error("fetchProductDetail Something went wrong!");
      }

      dispatch({
        type: SET_PRODUCT_DETAIL,
        productDetail: resData.data.productInfo,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addCart = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/basket`,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
      const resData = await response.json();
      if (!response.ok) {
        Util.log(url, query, resData.error.errorMsg);
        return resData.error.errorMsg;
        throw new Error(`addCart Something went wrong! ${response}`);
      }
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
