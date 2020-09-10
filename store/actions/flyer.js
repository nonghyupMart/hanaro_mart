import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_LEAFLET = "SET_LEAFLET";
export const SET_PRODUCT = "SET_PRODUCT";

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
      //   console.warn("fetchLeaflet");
      dispatch({ type: SET_LEAFLET, leaflet: resData.data });
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
      //   console.warn("fetchProduct=> ", resData.data);

      dispatch({ type: SET_PRODUCT, product: resData.data });
    } catch (err) {
      throw err;
    }
  };
};
