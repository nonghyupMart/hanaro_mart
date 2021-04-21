import queryString from "query-string";
import * as actionTypes from "./actionTypes";
import http from "../../util/axios-instance";

export const fetchLeaflet = (query) => {
  const url = queryString.stringifyUrl({
    url: `/leaflet`,
    query: query,
  });

  return async (dispatch, getState) => {
    return http
      .init(dispatch, true)
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_LEAFLET,
          leaflet: response.data,
        });
        return response.data;
      });
  };
};

export const fetchLeafletDetail = (query) => {
  const url = queryString.stringifyUrl({
    url: `/leaflet/${query.leaf_cd}`,
  });

  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_LEAFLET_DETAIL,
          leafletDetail: response.data.leafletInfo,
        });
        return response.data;
      });
  };
};

export const fetchProduct = (query) => {
  query.limit = 45;
  const url = queryString.stringifyUrl({
    url: `/product`,
    query: query,
  });
  return async (dispatch, getState) => {
    return http
      .init(dispatch, true)
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_PRODUCT;
        if (query.product_nm) {
          if (query.page > 1) type = actionTypes.SET_SEARCHED_PRODUCT_MORE;
          else type = actionTypes.SET_SEARCHED_PRODUCT;
        } else {
          if (query.page > 1) type = actionTypes.SET_PRODUCT_MORE;
          else type = actionTypes.SET_PRODUCT;
        }
        dispatch({ type, product: response.data });
        return response.data;
      });
  };
};

export const fetchProductDetail = (query) => {
  const cd = query.product_cd;
  delete query.product_cd;

  const url = queryString.stringifyUrl({
    url: `/product/${cd}`,
    query: query,
  });

  return async (dispatch, getState) => {
    return http
      .init(dispatch, true)
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_PRODUCT_DETAIL,
          productDetail: response.data.productInfo,
        });
        return response.data;
      });
  };
};

export const addCart = (query) => {
  const url = queryString.stringifyUrl({
    url: `/basket`,
  });
  const data = JSON.stringify(query);

  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .post(url, data)
      .then(async (response) => {
        return response.data;
      });
  };
};

export const setCarousel = (carousel) => {
  return {
    type: actionTypes.SET_CAROUSEL,
    carousel: carousel,
  };
};
