import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_EVENT = "SET_EVENT";
export const SET_MORE_EVENT = "SET_MORE_EVENT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchEvent = (query) => {
  //dv-www.hanaromartapp.com/api/event?store_cd=4&status=O
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("fetchEvent Something went wrong!");
      }

      const resData = await response.json();
      // console.warn("fetchEvent", resData.data)
      if (query.offset == undefined || query.offset == 0) {
        dispatch({ type: SET_EVENT, event: resData.data });
      } else if (query.offset > 0 && resData.data.eventList.length > 0) {
        dispatch({ type: SET_MORE_EVENT, event: resData.data });
      }
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
