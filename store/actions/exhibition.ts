import queryString from "query-string";
import * as actionTypes from "./actionTypes";
import * as Util from "../../utils";

export const fetchExhibition = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `/plan`,
    query: query,
  });
  return async (dispatch, getState) => {
    return Util.http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_EXHIBITION;
        if (query.page > 1) {
          type = actionTypes.SET_EXHIBITION_MORE;
        } else {
          type = actionTypes.SET_EXHIBITION;
        }
        dispatch({ type: type, exhibition: response.data });
        return response.data;
      });
  };
};

export const fetchExhibitionDetail = (query) => {
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `/plan/${event_cd}`,
    query: query,
  });

  return async (dispatch, getState) => {
    return Util.http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_EXHIBITION_DETAIL,
          exhibitionDetail: response.data.info,
        });
        return response.data;
      });
  };
};
