import queryString from "query-string";
import { API_URL } from "@constants/settings";
import * as Util from "@util";

export const SET_EVENT = "SET_EVENT";
export const SET_EVENT_MORE = "SET_EVENT_MORE";
export const SET_EVENT_DETAIL = "SET_EVENT_DETAIL";

export const fetchEvent = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event`,
    query: query,
  });
  Util.log(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        Util.log(url, resData.error.errorMsg);
        throw new Error("fetchEvent Something went wrong!");
      }

      let type = SET_EVENT;
      if (query.page > 1) {
        type = SET_EVENT_MORE;
      } else {
        type = SET_EVENT;
      }
      dispatch({ type: type, event: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchEventDetail = (query) => {
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event/${event_cd}`,
    query: query,
  });
  Util.log(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        Util.log(url, resData.error.errorMsg);
        throw new Error("fetchEventDetail Something went wrong!");
      }

      dispatch({ type: SET_EVENT_DETAIL, eventDetail: resData.data.eventInfo });
    } catch (err) {
      throw err;
    }
  };
};
export const clearEventDetail = () => {
  return { type: SET_EVENT_DETAIL, eventDetail: null };
};

export const updateEventDetail = (eventDetail) => {
  return {
    type: SET_EVENT_DETAIL,
    eventDetail: eventDetail,
  };
};

export const applyEvent = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event`,
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
        throw new Error(`applyEvent Something went wrong! ${response}`);
      }
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const applyStamp = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/stamp`,
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
        throw new Error(`applyStamp Something went wrong! ${response}`);
      }
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};


export const exchangeStamp = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/stamp-trade`,
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
        throw new Error(`exchangeStamp Something went wrong! ${response}`);
      }
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
