import queryString from "query-string";
import { API_URL } from "@constants/settings";
import * as Util from "@util";

export const SET_LEAFLET = "SET_LEAFLET";
export const SET_LEAFLET_DETAIL = "SET_LEAFLET_DETAIL";
export const SET_PRODUCT = "SET_PRODUCT";
export const SET_PRODUCT_DETAIL = "SET_PRODUCT_DETAIL";

export const fetchLeaflet = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/leaflet`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("fetchLeaflet Something went wrong!");
      }

      const resData = await response.json();
      Util.log("fetchLeaflet");
      dispatch({ type: SET_LEAFLET, leaflet: resData.data });
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

      if (!response.ok) {
        throw new Error("fetchLeafletDetail Something went wrong!");
      }

      const resData = await response.json();
      // Util.log("fetchLeaflet");
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

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("fetchProduct Something went wrong!");
      }

      const resData = await response.json();
      Util.log("fetchProduct=> ", resData.data);

      dispatch({ type: SET_PRODUCT, product: resData.data });
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

      if (!response.ok) {
        throw new Error("fetchProductDetail Something went wrong!");
      }

      const resData = await response.json();
      //   Util.log("fetchProduct=> ", resData.data);

      dispatch({
        type: SET_PRODUCT_DETAIL,
        productDetail: resData.data.productInfo,
      });
    } catch (err) {
      throw err;
    }
  };
};
