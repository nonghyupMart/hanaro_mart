import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_EVENT = "SET_EVENT";
export const SET_MORE_EVENT = "SET_MORE_EVENT";
export const SET_EVENT_DETAIL = "SET_EVENT_DETAIL";

export const fetchEvent = (query) => {
  //dv-www.hanaromartapp.com/api/event?store_cd=4&status=O
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event`,
    query: query,
  });
  console.warn(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchEvent Something went wrong!");
      }

      // const resData = await response.json();
      // console.warn("fetchEvent", resData.data)
      if (query.page == undefined || query.page == 1) {
        dispatch({ type: SET_EVENT, event: resData.data });
        console.warn("SET_EVENT");
      } else if (query.page > 1 && resData.data.eventList.length > 0) {
        dispatch({ type: SET_MORE_EVENT, event: resData.data });
        console.warn("SET_MORE_EVENT");
      }
    } catch (err) {
      throw err;
    }
  };
};

export const fetchEventDetail = (query) => {
  //dv-www.hanaromartapp.com/api/event?store_cd=4&status=O
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event/${event_cd}`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchEventDetail Something went wrong!");
      }

      // console.warn("fetchEvent", resData.data.eventInfo);

      dispatch({ type: SET_EVENT_DETAIL, eventDetail: resData.data.eventInfo });
    } catch (err) {
      throw err;
    }
  };
};
