import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Util from "../../util";
import { getResponse } from "../actions/common";

export const SET_EXHIBITION = "SET_EXHIBITION";
export const SET_EXHIBITION_MORE = "SET_EXHIBITION_MORE";
export const SET_EXHIBITION_DETAIL = "SET_EXHIBITION_DETAIL";

export const fetchExhibition = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/plan`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);
      let type = SET_EXHIBITION;
      if (query.page > 1) {
        type = SET_EXHIBITION_MORE;
      } else {
        type = SET_EXHIBITION;
      }
      dispatch({ type: type, exhibition: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchExhibitionDetail = (query) => {
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/plan/${event_cd}`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);
      dispatch({
        type: SET_EXHIBITION_DETAIL,
        exhibitionDetail: resData.data.info,
      });
    } catch (err) {
      throw err;
    }
  };
};
